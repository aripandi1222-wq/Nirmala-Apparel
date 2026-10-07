import React from 'react';
import { STORE_INFO } from '../data/storeConfig';
import { MapPin, Phone, Clock, Instagram, MessageCircle, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'beranda' | 'katalog' | 'tentang' | 'kontak') => void;
  openExportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, openExportModal }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-16 sm:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo.jpg"
                alt="Logo Nirmala Apparel"
                className="w-8 h-8 rounded-full object-cover border border-stone-700"
              />
              <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                {STORE_INFO.nama}
              </h3>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {STORE_INFO.tagline}. Karya busana kasual berbahan serat alami dan batik cap nusantara, diproduksi langsung bersama pengrajin lokal Yogyakarta.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>Transaksi Aman & Transparan via WhatsApp</span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavClick('beranda')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beranda Toko
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('katalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Katalog Busana Lengkap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('tentang')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tentang & Kisah Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('kontak')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kontak, Jam Buka & Lokasi
                </button>
              </li>
              <li>
                <button
                  onClick={openExportModal}
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium cursor-pointer"
                >
                  Panduan Deploy GitHub Pages
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak & Operasional */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Layanan Pelanggan
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>WhatsApp: {STORE_INFO.displayWhatsapp}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>{STORE_INFO.jamOperasional}</span>
              </div>
              <div className="flex items-start gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span>Instagram: {STORE_INFO.instagram}</span>
              </div>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=Halo%20Admin%20Nirmala%2C%20mau%20tanya%20info%20katalog`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-xs font-medium transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Chat CS Toko
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Alamat & Rekening Toko */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Butik Fisik
            </h4>
            <div className="text-xs text-stone-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{STORE_INFO.alamat}</span>
              </div>
              <div className="p-2.5 bg-stone-800/80 rounded-lg border border-stone-700/60 text-[11px] text-stone-300">
                <span className="block font-semibold text-white">Metode Bayar Resmi:</span>
                <span>Transfer BCA, Mandiri, BRI & COD Kurir</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} {STORE_INFO.nama}. Seluruh Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center gap-1 text-[11px]">
            Dibuat untuk UMKM Indonesia dengan <Heart className="w-3 h-3 text-red-500 fill-red-500" /> & Bangga Buatan Lokal.
          </p>
        </div>
      </div>
    </footer>
  );
};
