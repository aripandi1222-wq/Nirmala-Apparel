import React from 'react';
import { STORE_INFO } from '../data/storeConfig';
import { CheckCircle2, MapPin, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-900">
              Cerita Nirmala Apparel
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Bermula dari Kecintaan pada Kain Alami & Keanggunan Batik Lokal.
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              Nirmala Apparel didirikan di Yogyakarta berawal dari toko kecil di Jalan Tirtodipuran. Kami percaya bahwa pakaian yang nyaman tidak harus rumit atau mahal. Di iklim tropis Indonesia, bahan seperti serat linen murni dan katun prima adalah pilihan terbaik untuk menemani aktivitas harian.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              Kami bermitra langsung dengan penjahit rumahan dan perajin batik cap tradisional. Setiap lembar kain dipotong dan dijahit dengan teliti, memastikan jahitan kuat, potongan pas di badan, dan detail rapi.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-800">
              <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">100% Jahitan Sendiri</span>
                  <span className="text-stone-500 text-[11px]">Bukan barang dropship murahan</span>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-stone-200">
                <HeartHandshake className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Dukung UMKM Lokal</span>
                  <span className="text-stone-500 text-[11px]">Membantu pengrajin batik DIY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-md">
              <img
                src="/images/toko_boutique_interior_1791376241012.jpg"
                alt="Interior butik fisik Nirmala Apparel di Yogyakarta"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Butik Fisik Yogyakarta</span>
                    <span className="text-[11px] text-stone-500">Buka setiap hari 09.00 - 20.30 WIB</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Open Store
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Kenapa Harus Percaya (Trust Pillars) */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Mengapa Belanja di Nirmala Apparel?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Komitmen kami memberikan pengalaman belanja online yang jujur, aman, dan nyaman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                01
              </div>
              <h3 className="text-sm font-bold text-stone-900">Real Picture & Warna Akurat</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Seluruh foto diambil langsung dari produk fisik di studio kami dengan pencahayaan alami tanpa manipulasi warna berlebihan.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                02
              </div>
              <h3 className="text-sm font-bold text-stone-900">Pemesanan Ramah via WhatsApp</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tanpa perlu mendaftar akun rumit. Anda bisa berdiskusi langsung dengan admin tentang rekomendasi ukuran yang pas sebelum transfer.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                03
              </div>
              <h3 className="text-sm font-bold text-stone-900">Garansi Tukar Size</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Jika baju yang sampai ternyata kekecilan atau kebesaran, Anda berhak menukar ukuran maksimal 3 hari setelah paket diterima.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
