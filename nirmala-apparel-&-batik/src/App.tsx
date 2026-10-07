import React, { useState, useEffect } from 'react';
import productsData from './data/products.json';
import { Product } from './types';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryIconGrid } from './components/CategoryIconGrid';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CatalogView } from './components/CatalogView';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { TestimonialSection } from './components/TestimonialSection';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { GitHubPagesExportModal } from './components/GitHubPagesExportModal';
import { Toast } from './components/Toast';
import { ArrowRight, Headphones, MessageCircle, HelpCircle } from 'lucide-react';
import { STORE_INFO } from './data/storeConfig';

export default function App() {
  const [products] = useState<Product[]>(productsData as Product[]);
  const [currentTab, setCurrentTab] = useState<'beranda' | 'katalog' | 'tentang' | 'kontak'>('beranda');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [homeCategoryFilter, setHomeCategoryFilter] = useState('Semua');

  // Featured products for home section
  const featuredProducts = products.filter((p) => p.featured || p.stok > 0).slice(0, 4);

  const handleCategoryClick = (category: string) => {
    setHomeCategoryFilter(category);
    setCurrentTab('katalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-800">
        <Toast />

        {/* Top Bar Header */}
        <Header
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          openCart={() => setIsCartOpen(true)}
          openExportModal={() => setIsExportModalOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* TAB 1: BERANDA */}
          {currentTab === 'beranda' && (
            <div className="space-y-0">
              {/* Hero Banner */}
              <HeroSection onExploreClick={() => setCurrentTab('katalog')} />

              {/* Category Grid */}
              <CategoryIconGrid
                selectedCategory={homeCategoryFilter}
                onSelectCategory={handleCategoryClick}
              />

              {/* Featured Products Section */}
              <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-amber-900 block mb-1">
                      Koleksi Pilihan
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                      Produk Unggulan Nirmala
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Model terfavorit yang paling sering dipesan pelanggan lewat WhatsApp minggu ini.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentTab('katalog')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer group"
                  >
                    <span>Lihat Semua Produk ({products.length})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* 2 columns on mobile, 4 columns on desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                  {featuredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelect={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>

                {/* Banner Mini Promosi WA */}
                <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
                  <div className="space-y-1.5 text-center md:text-left">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
                      <Headphones className="w-3.5 h-3.5" /> Konsultasi Gratis
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                      Bingung Memilih Ukuran yang Cocok?
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
                      Cukup kirimkan tinggi & berat badan Anda ke WhatsApp kami. Admin Nirmala akan merekomendasikan ukuran busana yang paling pas dan nyaman.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${STORE_INFO.whatsapp}?text=Halo%20Admin%2C%20bisa%20bantu%20rekomendasi%20size%20baju%20yang%20pas%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-2 whitespace-nowrap transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>Chat WhatsApp Admin</span>
                  </a>
                </div>
              </section>

              {/* Testimonials */}
              <TestimonialSection />

              {/* Brief About Preview on Home */}
              <section className="py-12 bg-[#FAF9F5] border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-stone-200">
                    <div className="space-y-3">
                      <span className="text-[11px] font-bold text-amber-900 uppercase tracking-widest">
                        Tentang Kami
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">
                        Karya Busana Santai Asli Pengrajin Nusantara
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        Setiap helai pakaian diproduksi dengan material berkualitas tinggi, jahitan presisi, dan perpaduan etnik modern yang anggun. Kami mengutamakan kenyamanan Anda dalam berbusana sehari-hari.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('tentang');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-stone-900 hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
                      >
                        Baca Cerita Lengkap &rarr;
                      </button>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-stone-200 aspect-[16/10]">
                      <img
                        src="/images/toko_boutique_interior_1791376241012.jpg"
                        alt="Butik Nirmala Apparel"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: KATALOG */}
          {currentTab === 'katalog' && (
            <CatalogView
              products={products}
              onSelectProduct={(p) => setSelectedProduct(p)}
              initialCategory={homeCategoryFilter}
            />
          )}

          {/* TAB 3: TENTANG */}
          {currentTab === 'tentang' && <AboutSection />}

          {/* TAB 4: KONTAK */}
          {currentTab === 'kontak' && <ContactSection />}
        </main>

        {/* Footer */}
        <Footer
          onNavClick={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          openExportModal={() => setIsExportModalOpen(true)}
        />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsAppButton />

        {/* Product Detail Modal */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenCart={() => {
            setSelectedProduct(null);
            setIsCartOpen(true);
          }}
        />

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onExploreProducts={() => {
            setIsCartOpen(false);
            setCurrentTab('katalog');
          }}
        />

        {/* GitHub Pages Architecture & Export Modal */}
        <GitHubPagesExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
        />
      </div>
    </CartProvider>
  );
}
