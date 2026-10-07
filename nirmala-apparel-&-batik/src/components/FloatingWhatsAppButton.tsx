import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STORE_INFO } from '../data/storeConfig';

export const FloatingWhatsAppButton: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Friendly Chat Tooltip */}
      {!tooltipDismissed && (
        <div className="bg-white border border-stone-200 text-stone-800 text-xs px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 max-w-[210px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="leading-tight">
            <span className="font-bold text-stone-900 block text-[11px]">Ada Pertanyaan?</span>
            <span className="text-[11px] text-stone-600">Admin siap bantu cek size & stok di WA!</span>
          </div>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-stone-400 hover:text-stone-600 p-0.5"
            aria-label="Tutup petunjuk"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${STORE_INFO.whatsapp}?text=Halo%20Admin%20${encodeURIComponent(
          STORE_INFO.nama
        )}%2C%20saya%20mau%20tanya%20seputar%20produk`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Admin Toko"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-xl transition-all duration-200 cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white stroke-none group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
