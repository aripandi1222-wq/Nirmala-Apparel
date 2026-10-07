export interface Product {
  id: string;
  nama: string;
  harga: number;
  kategori: string;
  ukuran: string[];
  warna: string[];
  deskripsi: string;
  berat: number; // in grams
  foto: string[];
  stok: number;
  badge?: string;
  featured?: boolean;
}

export interface CartItem {
  cartId: string; // unique item instance id: `${productId}-${ukuran}-${warna}`
  productId: string;
  nama: string;
  harga: number;
  ukuran: string;
  warna: string;
  qty: number;
  foto: string;
  berat: number;
  stok: number;
}

export interface CheckoutCustomer {
  nama: string;
  telepon: string;
  alamat: string;
  kotaKecamatan: string;
  metodePembayaran: 'Transfer Bank (BCA / Mandiri / BRI)' | 'COD (Bayar di Tempat via Kurir)' | 'QRIS Manual';
  catatan?: string;
}

export interface StoreInfo {
  nama: string;
  tagline: string;
  deskripsi: string;
  whatsapp: string; // e.g. "6281234567890" without + or dashes
  displayWhatsapp: string;
  alamat: string;
  jamOperasional: string;
  instagram: string;
  rekeningBank: {
    bank: string;
    nomor: string;
    atasNama: string;
  }[];
}
