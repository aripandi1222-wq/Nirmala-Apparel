import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, RotateCcw, Frown } from 'lucide-react';

interface CatalogViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  initialCategory?: string;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  onSelectProduct,
  initialCategory = 'Semua',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSize, setSelectedSize] = useState('Semua');
  const [priceRange, setPriceRange] = useState<number>(300000);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Extract all categories & sizes dynamically from JSON data
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.kategori));
    return ['Semua', ...Array.from(set)];
  }, [products]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.ukuran.forEach((u) => set.add(u)));
    return ['Semua', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.nama.toLowerCase().includes(q);
          const matchDesc = p.deskripsi.toLowerCase().includes(q);
          const matchColor = p.warna.some((w) => w.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchColor) return false;
        }

        // Category
        if (selectedCategory !== 'Semua' && p.kategori !== selectedCategory) {
          return false;
        }

        // Size
        if (selectedSize !== 'Semua' && !p.ukuran.includes(selectedSize)) {
          return false;
        }

        // Price
        if (p.harga > priceRange) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.harga - b.harga;
        if (sortBy === 'price-desc') return b.harga - a.harga;
        if (sortBy === 'name') return a.nama.localeCompare(b.nama);
        return 0;
      });
  }, [products, searchQuery, selectedCategory, selectedSize, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setSelectedSize('Semua');
    setPriceRange(300000);
    setSortBy('default');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'Semua' ||
    selectedSize !== 'Semua' ||
    priceRange < 300000 ||
    sortBy !== 'default';

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Title & Search bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-amber-900 block mb-1">
              Etalase Busana
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Katalog Lengkap
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Daftar busana siap kirim. Pilih model favorit dan pesan langsung lewat chat WhatsApp.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari model, warna, bahan..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 shadow-2xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter controls Bar */}
        <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Filter toggle & Sort */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="md:hidden px-3 py-1.5 bg-stone-100 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter Tambahan</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
              >
                <option value="default">Urutkan: Rekomendasi</option>
                <option value="price-asc">Harga: Terendah &rarr; Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi &rarr; Terendah</option>
                <option value="name">Nama: A - Z</option>
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-2.5 py-1.5 text-xs text-stone-500 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reset semua filter"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Desktop & Mobile expandable filter row: Size & Max Price */}
          <div className={`${showFiltersMobile ? 'block' : 'hidden'} md:block mt-3 pt-3 border-t border-stone-100`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Size selector */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wide">
                  Ukuran:
                </span>
                {allSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-amber-900 text-white border-amber-950 font-medium'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Price slider */}
              <div className="flex items-center gap-3 justify-start md:justify-end">
                <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wide whitespace-nowrap">
                  Maks. Harga: Rp {priceRange.toLocaleString('id-ID')}
                </span>
                <input
                  type="range"
                  min="130000"
                  max="300000"
                  step="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-32 accent-stone-900 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>Menampilkan <strong>{filteredProducts.length}</strong> produk busana</span>
          {selectedCategory !== 'Semua' && (
            <span>Kategori terpilih: <strong>{selectedCategory}</strong></span>
          )}
        </div>

        {/* Product Grid: 2 columns mobile, 3-4 columns desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mx-auto mb-3">
              <Frown className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-base font-bold text-stone-800">Produk Tidak Ditemukan</h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Tidak ada produk yang cocok dengan kata kunci atau filter yang Anda pilih. Coba ubah kata kunci atau reset filter.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
