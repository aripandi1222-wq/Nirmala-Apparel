import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, ukuran: string, warna: string, qty?: number) => void;
  updateQty: (cartId: string, delta: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalWeightGram: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const CART_STORAGE_KEY = 'nirmala_shopping_cart_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  const addToCart = (product: Product, ukuran: string, warna: string, qty = 1) => {
    const cartId = `${product.id}-${ukuran}-${warna}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].qty + qty;
        next[existingIndex] = {
          ...next[existingIndex],
          qty: Math.min(newQty, product.stok),
        };
        return next;
      } else {
        const newItem: CartItem = {
          cartId,
          productId: product.id,
          nama: product.nama,
          harga: product.harga,
          ukuran,
          warna,
          qty: Math.min(qty, product.stok),
          foto: product.foto[0] || '/images/hero_fashion_banner_1791376129821.jpg',
          berat: product.berat,
          stok: product.stok,
        };
        return [...prev, newItem];
      }
    });

    showToast(`✓ "${product.nama}" (${ukuran}, ${warna}) berhasil dimasukkan ke keranjang`);
  };

  const updateQty = (cartId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.qty + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              qty: Math.min(nextQty, item.stok),
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('Item berhasil dihapus dari keranjang');
  };

  const clearCart = () => {
    setCart([]);
    showToast('Keranjang belanja telah dikosongkan');
  };

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.harga * item.qty, 0);
  const totalWeightGram = cart.reduce((acc, item) => acc + item.berat * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        totalWeightGram,
        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
