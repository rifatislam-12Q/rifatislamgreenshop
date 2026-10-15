import React from 'react';
import { Heart } from 'lucide-react';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  favoriteCount?: number;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  favoriteCount = 0,
}) => {
  return (
    <section className="mb-5">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-sm font-bold text-neutral-300 tracking-tight flex items-center gap-2">
          <span>ক্যাটাগরি সমূহ (Categories)</span>
        </h2>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              id={`category-chip-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 border border-emerald-400/40'
                  : 'bg-[#181920] text-neutral-400 hover:text-white hover:bg-[#22242f] border border-[#2b2d3a]'
              }`}
            >
              {category}
            </button>
          );
        })}

        {/* Wishlist / Favorites Filter Button */}
        {favoriteCount > 0 && (
          <button
            onClick={() => onSelectCategory('Wishlist')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'Wishlist'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40 border border-rose-400/40'
                : 'bg-[#181920] text-rose-400 hover:text-rose-300 hover:bg-[#22242f] border border-rose-500/30'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>পছন্দের তালিকা</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 font-mono">
              {favoriteCount}
            </span>
          </button>
        )}
      </div>
    </section>
  );
};
