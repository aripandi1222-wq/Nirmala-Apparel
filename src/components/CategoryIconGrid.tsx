import React from 'react';
import { Shirt, LayoutGrid, Scissors, Layers, Tag } from 'lucide-react';

interface CategoryIconGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CATEGORIES = [
  { id: 'Semua', label: 'Semua Koleksi', icon: LayoutGrid, desc: 'Lihat seluruh busana' },
  { id: 'Atasan', label: 'Atasan & Kemeja', icon: Shirt, desc: 'Linen, blouse, kimono' },
  { id: 'Dress', label: 'Dress & Gamis', icon: Tag, desc: 'Maxi dress & midi flowy' },
  { id: 'Batik', label: 'Batik Modern', icon: Scissors, desc: 'Cap pengrajin lokal' },
  { id: 'Bawahan', label: 'Bawahan & Kulot', icon: Layers, desc: 'Kulot linen & rok lilit' },
];

export const CategoryIconGrid: React.FC<CategoryIconGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-8 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
              Kategori Pilihan
            </h2>
            <p className="text-xs text-stone-500">Pilih kategori untuk memfilter model busana</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-stone-900/20'
                    : 'bg-stone-50/70 hover:bg-stone-100 text-stone-800 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-stone-800 text-amber-300' : 'bg-white text-stone-700 border border-stone-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                    {cat.label}
                  </h3>
                  <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {cat.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
