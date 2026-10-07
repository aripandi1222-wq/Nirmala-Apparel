import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatRupiah, generateDirectWhatsAppUrl } from '../data/storeConfig';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, MessageCircle, Truck, ShieldCheck, Ruler, Scale } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenCart,
}) => {
  const { addToCart } = useCart();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedUkuran, setSelectedUkuran] = useState<string>('');
  const [selectedWarna, setSelectedWarna] = useState<string>('');
  const [qty, setQty] = useState(1);
  const [activeTabInfo, setActiveTabInfo] = useState<'deskripsi' | 'ukuran' | 'pengiriman'>('deskripsi');

  useEffect(() => {
    if (product) {
      setSelectedPhotoIndex(0);
      setSelectedUkuran(product.ukuran[0] || 'All Size');
      setSelectedWarna(product.warna[0] || 'Default');
      setQty(1);
      setActiveTabInfo('deskripsi');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const currentPhoto = product.foto[selectedPhotoIndex] || product.foto[0];

  const handleAddToCart = () => {
    addToCart(product, selectedUkuran, selectedWarna, qty);
  };

  const handleBuyWhatsApp = () => {
    const waUrl = generateDirectWhatsAppUrl(product, selectedUkuran, selectedWarna, qty);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[100dvh] sm:max-h-[92vh] bg-white sm:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 shadow-sm border border-stone-200 transition-colors cursor-pointer"
          aria-label="Tutup popup produk"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 bg-stone-100 flex flex-col justify-between shrink-0">
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full max-h-[46vh] md:max-h-full overflow-hidden">
            <img
              src={currentPhoto}
              alt={product.nama}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-stone-900 text-white text-[11px] font-semibold tracking-wider px-2.5 py-1 uppercase rounded-sm shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails if multiple images */}
          {product.foto.length > 1 && (
            <div className="p-2 sm:p-3 bg-white border-t border-stone-200 flex gap-2 overflow-x-auto">
              {product.foto.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative w-14 h-16 rounded border overflow-hidden shrink-0 cursor-pointer ${
                    selectedPhotoIndex === idx
                      ? 'border-stone-900 ring-2 ring-stone-900/30'
                      : 'border-stone-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.nama} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Contiguous Purchase Module */}
        <div className="md:w-1/2 flex flex-col overflow-y-auto max-h-[58vh] md:max-h-full p-4 sm:p-6 lg:p-7">
          {/* Top metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-widest text-[11px] font-semibold text-stone-600">
              {product.kategori}
            </span>
            <span aria-hidden="true">·</span>
            <span>Tersedia {product.stok} pcs</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Scale className="w-3 h-3" /> {product.berat}g
            </span>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight">
            {product.nama}
          </h1>

          {/* Price */}
          <div className="mt-2.5 flex items-baseline gap-3">
            <span className="text-2xl font-extrabold text-stone-900 font-sans tabular-nums">
              {formatRupiah(product.harga)}
            </span>
            <span className="text-xs text-stone-500 font-medium">Harga pas (Belum ongkir)</span>
          </div>

          {/* Variant Selector 1: Ukuran */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
              <span>PILIH UKURAN:</span>
              <span className="text-stone-500 font-normal">{selectedUkuran}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.ukuran.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedUkuran(sz)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    selectedUkuran === sz
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-white text-stone-800 border-stone-300 hover:border-stone-500'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Variant Selector 2: Warna */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
              <span>PILIH WARNA:</span>
              <span className="text-stone-500 font-normal">{selectedWarna}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.warna.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setSelectedWarna(col)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    selectedWarna === col
                      ? 'bg-amber-900 text-white border-amber-950 shadow-xs'
                      : 'bg-stone-50 text-stone-800 border-stone-300 hover:border-stone-500'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-800">JUMLAH (QTY):</span>
            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer font-bold text-sm"
              >
                -
              </button>
              <span className="w-10 text-center text-sm font-semibold text-stone-900 tabular-nums">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.stok, q + 1))}
                className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer font-bold text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Action CTAs: Add to Cart & Buy via WhatsApp */}
          <div className="mt-6 flex flex-col gap-2.5">
            {/* Primary Buy CTA: Direct to WhatsApp */}
            <button
              type="button"
              onClick={handleBuyWhatsApp}
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Pesan Langsung via WhatsApp ({formatRupiah(product.harga * qty)})</span>
            </button>

            {/* Secondary CTA: Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 active:scale-[0.99] text-stone-900 font-semibold text-sm rounded-xl border border-stone-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-stone-700" />
              <span>Tambah ke Keranjang Belanja</span>
            </button>
          </div>

          {/* Informational Tabs: Deskripsi, Panduan Ukuran, Pengiriman */}
          <div className="mt-6 pt-4 border-t border-stone-200 flex-1">
            <div className="flex border-b border-stone-200 text-xs font-medium text-stone-500 mb-3">
              <button
                onClick={() => setActiveTabInfo('deskripsi')}
                className={`pb-2 mr-4 cursor-pointer transition-colors ${
                  activeTabInfo === 'deskripsi'
                    ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                    : 'hover:text-stone-800'
                }`}
              >
                Deskripsi
              </button>
              <button
                onClick={() => setActiveTabInfo('ukuran')}
                className={`pb-2 mr-4 cursor-pointer transition-colors ${
                  activeTabInfo === 'ukuran'
                    ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                    : 'hover:text-stone-800'
                }`}
              >
                Panduan Size
              </button>
              <button
                onClick={() => setActiveTabInfo('pengiriman')}
                className={`pb-2 cursor-pointer transition-colors ${
                  activeTabInfo === 'pengiriman'
                    ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                    : 'hover:text-stone-800'
                }`}
              >
                Info Pengiriman
              </button>
            </div>

            {activeTabInfo === 'deskripsi' && (
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-2">
                <p>{product.deskripsi}</p>
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 mt-2 text-stone-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs">Foto 100% Real Picture (produk asli toko sendiri)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="text-xs">Bisa konsultasi ukuran dengan admin via chat WhatsApp</span>
                  </div>
                </div>
              </div>
            )}

            {activeTabInfo === 'ukuran' && (
              <div className="text-xs text-stone-600 space-y-2">
                <p className="font-semibold text-stone-800">Tabel Estimasi Lingkar Dada (LD) & Panjang:</p>
                <div className="overflow-x-auto border border-stone-200 rounded-lg">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-stone-100 text-stone-700">
                      <tr>
                        <th className="p-2">Ukuran</th>
                        <th className="p-2">Lingkar Dada</th>
                        <th className="p-2">Panjang Baju</th>
                        <th className="p-2">BB Rekomendasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      <tr>
                        <td className="p-2 font-semibold">S / M</td>
                        <td className="p-2">96 - 100 cm</td>
                        <td className="p-2">68 cm</td>
                        <td className="p-2">45 - 55 kg</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">L / XL</td>
                        <td className="p-2">104 - 110 cm</td>
                        <td className="p-2">72 cm</td>
                        <td className="p-2">56 - 72 kg</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">All Size Loose</td>
                        <td className="p-2">115 - 120 cm</td>
                        <td className="p-2">74 cm</td>
                        <td className="p-2">Fit to 80 kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-stone-500 italic">
                  *Toleransi jahitan manual 1-2 cm. Jangan ragu tanyakan ke admin jika bingung.
                </p>
              </div>
            )}

            {activeTabInfo === 'pengiriman' && (
              <div className="text-xs text-stone-600 space-y-2">
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-800">Pengiriman dari Kota Yogyakarta</p>
                    <p className="text-[11px] text-stone-500">
                      Pilihan kurir: JNE Regular/YES, J&T Express, dan SiCepat. Pesanan sebelum 15.00 WIB dikirim di hari yang sama.
                    </p>
                  </div>
                </div>
                <div className="bg-amber-50/70 border border-amber-200 p-2.5 rounded-lg text-amber-900 text-[11px]">
                  <strong>Catatan Ongkir:</strong> Ongkos kirim dihitung manual oleh admin via WhatsApp setelah Anda mengirim rincian alamat tujuan.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
