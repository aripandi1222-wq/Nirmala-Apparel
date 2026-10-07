import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeConfig';
import { MapPin, Phone, Clock, Instagram, Copy, Check, MessageCircle, ExternalLink, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useCart();
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(label);
    showToast(`✓ Nomor rekening ${label} berhasil disalin ke clipboard`);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[11px] uppercase tracking-widest font-bold text-amber-900 block mb-1">
            Hubungi Kami
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Kontak Toko & Lokasi Fisik
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Kami siap melayani pertanyaan seputar ketersediaan produk, ukuran, dan estimasi ongkos kirim.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Details & Bank Accounts */}
          <div className="lg:col-span-6 space-y-6">
            {/* Info Cards */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-5">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Informasi Toko
              </h2>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg text-stone-700 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Alamat Toko Fisik</h3>
                    <p className="text-stone-600 leading-relaxed mt-0.5">{STORE_INFO.alamat}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg text-stone-700 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">WhatsApp Pelayanan</h3>
                    <p className="text-stone-600 mt-0.5 font-medium">{STORE_INFO.displayWhatsapp}</p>
                    <a
                      href={`https://wa.me/${STORE_INFO.whatsapp}?text=Halo%20Admin%20Nirmala%2C%20mau%20tanya%20info%20toko`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold hover:underline mt-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Buka Chat WhatsApp Sekarang &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg text-stone-700 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Jam Operasional</h3>
                    <p className="text-stone-600 mt-0.5">{STORE_INFO.jamOperasional}</p>
                    <p className="text-[11px] text-stone-500 italic mt-0.5">
                      (Pesan WA di luar jam operasional tetap diterima dan akan dibalas pertama kali keesokan pagi)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg text-stone-700 shrink-0 mt-0.5">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Media Sosial</h3>
                    <p className="text-stone-600 mt-0.5">{STORE_INFO.instagram}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Bank Accounts for Manual Transfer */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-stone-800" />
                <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Rekening Resmi Pembayaran Manual
                </h2>
              </div>
              <p className="text-xs text-stone-500">
                Semua pembayaran pesanan ditransfer hanya ke rekening atas nama toko berikut:
              </p>

              <div className="space-y-2.5 pt-1">
                {STORE_INFO.rekeningBank.map((rek, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-300">
                          {rek.bank}
                        </span>
                        <span className="text-xs font-bold text-stone-900 tracking-wider tabular-nums">
                          {rek.nomor}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 block mt-0.5">
                        a.n. {rek.atasNama}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(rek.nomor.replace(/-/g, ''), rek.bank)}
                      className="px-2.5 py-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      title="Salin Nomor Rekening"
                    >
                      {copiedBank === rek.bank ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Embed & Location Visual */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Peta Lokasi Butik
              </h2>
              <a
                href="https://maps.google.com/?q=Jl.+Tirtodipuran+Yogyakarta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-900 font-semibold hover:underline flex items-center gap-1"
              >
                Buka di Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded interactive map */}
            <div className="w-full h-[320px] rounded-xl overflow-hidden border border-stone-200 bg-stone-100 relative">
              <iframe
                title="Peta Nirmala Apparel Yogyakarta"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15811.23354460777!2d110.3621415!3d-7.8202535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57a1b02b0c39%3A0x6b24cb4d2f093150!2sJl.+Tirtodipuran%2C+Mantrijeron%2C+Kota+Yogyakarta%2C+Daerah+Istimewa+Yogyakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
              <p className="font-semibold text-stone-800">Petunjuk Arah:</p>
              <p>
                Terletak di kawasan budaya dan kafe Tirtodipuran Yogyakarta (sekitar 7 menit dari Malioboro & Keraton). Parkir mobil dan motor tersedia luas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
