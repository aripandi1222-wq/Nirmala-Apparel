import React from 'react';
import { STORE_INFO } from '../data/storeConfig';
import { ArrowRight, MessageCircle, Tag, HeartHandshake, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200/90 rounded-md text-xs font-medium text-stone-700">
              <Tag className="w-3.5 h-3.5 text-amber-700" />
              <span>Koleksi Musim Terbaru · UMKM Yogyakarta</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-[1.18] text-balance">
              Sentuhan Linen Alami & Batik Modern untuk Hari-Hari Istimewa.
            </h1>

            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Busana santai dengan potongan timeless yang ramah iklim tropis. Dirancang untuk Anda yang mengutamakan kenyamanan, kerapian jahitan, dan keaslian motif pengrajin Nusantara.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-stone-800 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Jelajahi Katalog Baju</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=Halo%20Admin%20Nirmala%20Apparel%2C%20saya%20tertarik%20dengan%20koleksi%20terbaru`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-stone-100 active:scale-[0.99] text-emerald-800 text-sm font-semibold rounded-xl border border-stone-300 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Konsultasi Size via WA</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-3 gap-3 text-stone-700">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">100% Real Picture</h4>
                  <p className="text-[11px] text-stone-500">Foto produk asli toko</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 text-center sm:text-left">
                <HeartHandshake className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Garansi Tukar Size</h4>
                  <p className="text-[11px] text-stone-500">Bisa tukar bila kekecilan</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 text-center sm:text-left">
                <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Order Tanpa Ribet</h4>
                  <p className="text-[11px] text-stone-500">Cukup chat WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-lg bg-stone-100">
              <img
                src="/images/hero_fashion_banner_1791376129821.jpg"
                alt="Koleksi busana linen dan batik Nirmala Apparel"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-5">
                <div className="text-white space-y-1">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-300">
                    Edisi Khusus Ramadhan & Kasual
                  </span>
                  <h3 className="text-lg font-serif font-bold">Koleksi Alam Khatulistiwa</h3>
                  <p className="text-xs text-stone-200">Warna-warna bumi yang menenangkan & mudah dipadupadankan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
