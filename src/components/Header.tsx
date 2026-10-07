import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X, BookOpen, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/storeConfig';

interface HeaderProps {
  currentTab: 'beranda' | 'katalog' | 'tentang' | 'kontak';
  setCurrentTab: (tab: 'beranda' | 'katalog' | 'tentang' | 'kontak') => void;
  openCart: () => void;
  openExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  openCart,
  openExportModal,
}) => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'beranda' | 'katalog' | 'tentang' | 'kontak') => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with logo */}
        <button
          onClick={() => handleNavClick('beranda')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-md flex items-center gap-2.5"
        >
          <img
            src="/images/logo.jpg"
            alt="Logo Nirmala Apparel"
            className="w-9 h-9 rounded-full object-cover border border-stone-300 shadow-xs"
          />
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
            Nirmala Apparel
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('beranda')}
            className={`transition-colors py-1 cursor-pointer hover:text-stone-900 ${
              currentTab === 'beranda'
                ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                : 'hover:border-b-2 hover:border-stone-300'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => handleNavClick('katalog')}
            className={`transition-colors py-1 cursor-pointer hover:text-stone-900 ${
              currentTab === 'katalog'
                ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                : 'hover:border-b-2 hover:border-stone-300'
            }`}
          >
            Katalog Produk
          </button>
          <button
            onClick={() => handleNavClick('tentang')}
            className={`transition-colors py-1 cursor-pointer hover:text-stone-900 ${
              currentTab === 'tentang'
                ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                : 'hover:border-b-2 hover:border-stone-300'
            }`}
          >
            Tentang Toko
          </button>
          <button
            onClick={() => handleNavClick('kontak')}
            className={`transition-colors py-1 cursor-pointer hover:text-stone-900 ${
              currentTab === 'kontak'
                ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                : 'hover:border-b-2 hover:border-stone-300'
            }`}
          >
            Kontak & Lokasi
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* GitHub Pages Deploy Guide button */}
          <button
            onClick={openExportModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            title="Lihat file statis & panduan deploy GitHub Pages"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Info GitHub Pages</span>
          </button>

          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center p-2 rounded-lg text-stone-800 hover:bg-stone-200/70 active:scale-95 transition-all cursor-pointer"
            aria-label={`Keranjang belanja: ${totalItems} item`}
          >
            <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[11px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/70 cursor-pointer"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF9F5] px-4 py-3 space-y-2 animate-in fade-in duration-150">
          <button
            onClick={() => handleNavClick('beranda')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'beranda' ? 'bg-stone-200/80 text-stone-900 font-semibold' : 'text-stone-700'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => handleNavClick('katalog')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'katalog' ? 'bg-stone-200/80 text-stone-900 font-semibold' : 'text-stone-700'
            }`}
          >
            Katalog Produk
          </button>
          <button
            onClick={() => handleNavClick('tentang')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'tentang' ? 'bg-stone-200/80 text-stone-900 font-semibold' : 'text-stone-700'
            }`}
          >
            Tentang Toko
          </button>
          <button
            onClick={() => handleNavClick('kontak')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'kontak' ? 'bg-stone-200/80 text-stone-900 font-semibold' : 'text-stone-700'
            }`}
          >
            Kontak & Lokasi
          </button>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openExportModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-stone-700 bg-stone-100 border border-stone-300 rounded-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>Panduan & File GitHub Pages</span>
            </button>
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=Halo%20Admin%20Nirmala%2C%20mau%20tanya-tanya%20produk`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp Langsung</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
