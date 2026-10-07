import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    nama: 'Dian Anggraini',
    kota: 'Jakarta Selatan',
    item: 'Kemeja Linen Oversized',
    ulasan: 'Bahan linennya beneran adem banget dipakai kerja kantor maupun jalan santai. Jahitan rapi, warna sage-nya persis kayak di foto katalog. Admin WA fast respon bantu ukur LD.',
    rating: 5,
  },
  {
    nama: 'Rina Kusuma',
    kota: 'Semarang',
    item: 'Blouse Batik Floral Terracotta',
    ulasan: 'Batik capnya halus, motifnya modern gak kaku. Senang nemu toko UMKM yang jujur dengan real picture. Langsung order via WhatsApp dalam 5 menit beres.',
    rating: 5,
  },
  {
    nama: 'Fitri Handayani',
    kota: 'Surabaya',
    item: 'Celana Kulot Linen Ankle',
    ulasan: 'Kulotnya jatuh bagus banget, bagian pinggang belakang ada karet jadi nyaman pas duduk lama. Next bakal repeat order warna lainnya!',
    rating: 5,
  },
];

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F5F3EF] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-900 block mb-1">
            Ulasan Pelanggan
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Dipercaya Oleh Ratusan Pembeli
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Pengalaman nyata pelanggan yang memesan langsung melalui WhatsApp Nirmala Apparel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-300" />
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{t.ulasan}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1">
                    {t.nama}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </h4>
                  <p className="text-[11px] text-stone-500">{t.kota} · {t.item}</p>
                </div>
                <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                  Verified Order
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
