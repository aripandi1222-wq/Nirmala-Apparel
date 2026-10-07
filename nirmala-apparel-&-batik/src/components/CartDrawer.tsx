import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatRupiah, generateCartWhatsAppUrl, STORE_INFO } from '../data/storeConfig';
import { CheckoutCustomer } from '../types';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onExploreProducts,
}) => {
  const { cart, updateQty, removeFromCart, clearCart, totalItems, totalPrice, totalWeightGram } =
    useCart();

  const [customer, setCustomer] = useState<CheckoutCustomer>({
    nama: '',
    telepon: '',
    kotaKecamatan: '',
    alamat: '',
    metodePembayaran: 'Transfer Bank (BCA / Mandiri / BRI)',
    catatan: '',
  });

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (!isOpen) return null;

  const handleCheckoutWA = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const waUrl = generateCartWhatsAppUrl(cart, customer, totalPrice, totalWeightGram);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-800" />
            <h2 className="text-base font-bold text-stone-900">
              Keranjang Belanja ({totalItems} item)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/70 transition-colors cursor-pointer"
            aria-label="Tutup keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            /* Empty State */
            <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-4 border border-stone-200">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-stone-800">Keranjang Masih Kosong</h3>
              <p className="text-xs text-stone-500 max-w-xs mt-1.5 leading-relaxed">
                Anda belum memilih busana. Jelajahi katalog Nirmala Apparel dan temukan koleksi favorit Anda!
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="mt-6 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Mulai Belanja &rarr;
              </button>
            </div>
          ) : (
            <>
              {/* Product list items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
                  <span>Daftar Busana Terpilih</span>
                  <button
                    onClick={clearCart}
                    className="text-stone-400 hover:text-red-600 transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Kosongkan
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex gap-3 p-3 bg-stone-50/80 rounded-xl border border-stone-200/80 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-20 bg-stone-200 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">
                          {item.nama}
                        </h4>
                        <div className="text-[11px] text-stone-500 mt-0.5 space-x-1">
                          <span>Size: <strong>{item.ukuran}</strong></span>
                          <span>·</span>
                          <span>Warna: <strong>{item.warna}</strong></span>
                        </div>
                        <div className="text-xs font-bold text-stone-900 mt-1 tabular-nums">
                          {formatRupiah(item.harga)}
                        </div>
                      </div>

                      {/* Stepper + Remove */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/60">
                        <div className="flex items-center border border-stone-300 rounded bg-white">
                          <button
                            type="button"
                            onClick={() => updateQty(item.cartId, -1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 text-xs font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-stone-900 tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.cartId, 1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 text-xs font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-stone-900 tabular-nums">
                            {formatRupiah(item.harga * item.qty)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            aria-label="Hapus item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Collapsible Customer Form for smooth WhatsApp checkout */}
              <div className="mt-4 pt-3 border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                    Data Pengiriman (Opsional / Praktis)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                    className="text-[11px] text-amber-900 font-semibold hover:underline cursor-pointer"
                  >
                    {showCheckoutForm ? 'Sembunyikan Form' : '+ Isi Alamat Sekarang'}
                  </button>
                </div>

                {showCheckoutForm && (
                  <form onSubmit={handleCheckoutWA} className="space-y-2.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 mb-1">
                        Nama Lengkap Pembeli
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Siti Rahmawati"
                        value={customer.nama}
                        onChange={(e) => setCustomer({ ...customer, nama: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-700 mb-1">
                          No. WhatsApp Aktif
                        </label>
                        <input
                          type="tel"
                          placeholder="0812xxxxxxxx"
                          value={customer.telepon}
                          onChange={(e) => setCustomer({ ...customer, telepon: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-700 mb-1">
                          Kota / Kecamatan
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: Bandung, Coblong"
                          value={customer.kotaKecamatan}
                          onChange={(e) => setCustomer({ ...customer, kotaKecamatan: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 mb-1">
                        Alamat Lengkap (Jalan, RT/RW, No Rumah)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Jl. Merdeka No. 12 RT 02 RW 05"
                        value={customer.alamat}
                        onChange={(e) => setCustomer({ ...customer, alamat: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 mb-1">
                        Rencana Metode Pembayaran
                      </label>
                      <select
                        value={customer.metodePembayaran}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            metodePembayaran: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                      >
                        <option value="Transfer Bank (BCA / Mandiri / BRI)">Transfer Bank Manual (BCA / Mandiri / BRI)</option>
                        <option value="COD (Bayar di Tempat via Kurir)">COD (Bayar di Tempat via Kurir)</option>
                        <option value="QRIS Manual">QRIS Manual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 mb-1">
                        Catatan Tambahan (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Mohon dikirim bungkus kado / request kartu ucapan"
                        value={customer.catatan}
                        onChange={(e) => setCustomer({ ...customer, catatan: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Informative Shipping & Payment Reminder */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-[11px] text-stone-600 space-y-1.5">
                <div className="flex items-center gap-1.5 font-medium text-stone-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Proses Pemesanan Aman & Terpercaya:</span>
                </div>
                <p>
                  1. Klik <strong>Checkout via WhatsApp</strong> di bawah ini.
                </p>
                <p>
                  2. Pesan terformat otomatis akan terkirim ke WhatsApp toko kami ({STORE_INFO.displayWhatsapp}).
                </p>
                <p>
                  3. Admin kami akan menghitung ongkos kirim dan memberikan rekening pembayaran resmi toko.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Bottom Sticky Action Bar */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF9F5] space-y-3">
            {/* Calculation summary */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Total Barang ({totalItems} pcs)</span>
                <span className="tabular-nums">~{totalWeightGram} gram</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Ongkos Kirim</span>
                <span className="text-emerald-700 font-medium">Dihitung Admin via WA</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                <span>Total Belanja</span>
                <span className="text-base sm:text-lg font-extrabold text-stone-900 font-sans tabular-nums">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>

            {/* Focal Big CTA Button: WhatsApp Checkout */}
            <button
              type="button"
              onClick={(e) => handleCheckoutWA(e)}
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Checkout Sekarang via WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <p className="text-[10px] text-center text-stone-500">
              Tanpa kartu kredit / payment gateway otomatis. Pembayaran manual dikonfirmasi via WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
