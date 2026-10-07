import React, { useState } from 'react';
import { Product } from '../types';
import { formatRupiah, STORE_INFO } from '../data/storeConfig';
import { MessageCircle, Eye, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const mainImage = product.foto[0] || '/images/hero_fashion_banner_1791376129821.jpg';

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultUkuran = product.ukuran[0] || 'Standar';
    const defaultWarna = product.warna[0] || 'Default';
    const message = `Halo Admin *${STORE_INFO.nama}*, saya mau tanya & pesan langsung produk:\n- *${product.nama}*\n- Ukuran: ${defaultUkuran}\n- Warna: ${defaultWarna}\n- Harga: ${formatRupiah(product.harga)}\n\nApakah stok masih tersedia min?`;
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Product Image slot (3:4 ratio) */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={mainImage}
            alt={product.nama}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <span className="text-sm font-medium text-stone-600">{product.kategori}</span>
            <span className="text-xs text-stone-500 mt-1">{product.nama}</span>
          </div>
        )}

        {/* Subtle badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-sm uppercase ${
                product.badge === 'Stok Terbatas'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : product.badge === 'Baru'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-stone-900 text-stone-100'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick action overlay on desktop */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-stone-950/70 via-stone-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-1">
          <span className="text-xs font-medium text-white flex items-center gap-1 pl-1">
            <Eye className="w-3.5 h-3.5" /> Detail
          </span>
          <button
            type="button"
            onClick={handleDirectWhatsApp}
            title="Chat via WhatsApp"
            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-medium flex items-center gap-1 shadow-sm transition-colors"
          >
            <MessageCircle className="w-3 h-3" /> Chat WA
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata: Category & Stock notice (unboxed text) */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="uppercase tracking-wider text-[10px] font-medium text-stone-600">
              {product.kategori}
            </span>
            <span className="text-[11px]">
              {product.stok <= 5 ? (
                <span className="text-amber-700 font-medium flex items-center gap-0.5">
                  <AlertCircle className="w-3 h-3 inline" /> Sisa {product.stok}
                </span>
              ) : (
                `Stok ${product.stok}`
              )}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-stone-900 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors">
            {product.nama}
          </h3>
        </div>

        {/* Bottom row: Price & quick CTA */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-stone-500 block leading-none mb-0.5">Harga</span>
            <span className="text-sm sm:text-base font-bold text-stone-900 font-sans tabular-nums">
              {formatRupiah(product.harga)}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="text-xs font-semibold text-stone-700 group-hover:text-stone-900 hover:underline flex items-center gap-0.5"
          >
            Pilih Varian &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
