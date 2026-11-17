import React from 'react';
import { Heart, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { SortOption, QuickFilter } from '../types';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  favoriteCount?: number;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  quickFilter?: QuickFilter;
  onQuickFilterChange?: (filter: QuickFilter) => void;
  totalResults?: number;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  favoriteCount = 0,
  sortBy = 'featured',
  onSortChange,
  quickFilter = 'all',
  onQuickFilterChange,
  totalResults,
}) => {
  return (
    <section className="mb-5 space-y-3">
      {/* Row 1: Category Buttons & Result Count */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-neutral-300 tracking-tight">
          ক্যাটাগরি সমূহ (Categories)
        </h2>
        {typeof totalResults === 'number' && (
          <span className="text-xs text-neutral-400 tabular-nums whitespace-nowrap">
            {totalResults}টি পণ্য
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              id={`category-chip-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
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
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'Wishlist'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40 border border-rose-400/40'
                : 'bg-[#181920] text-rose-400 hover:text-rose-300 hover:bg-[#22242f] border border-rose-500/30'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>পছন্দের তালিকা ({favoriteCount})</span>
          </button>
        )}
      </div>

      {/* Row 2: Quick Filter & Sort Toolbar */}
      {(onQuickFilterChange || onSortChange) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-[#22232c]">
          {onQuickFilterChange && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              <span className="text-[11px] text-neutral-500 flex items-center gap-1 shrink-0 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>ফিল্টার:</span>
              </span>
              {(
                [
                  { id: 'all', label: 'সব' },
                  { id: 'organic', label: '১০০% অর্গানিক' },
                  { id: 'handmade', label: 'হ্যান্ডমেড' },
                  { id: 'under-500', label: '৳৫০০-এর নিচে' },
                ] as { id: QuickFilter; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onQuickFilterChange(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    quickFilter === item.id
                      ? 'bg-[#252734] text-emerald-400 border border-emerald-500/40'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#1a1b22] border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {onSortChange && (
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <label
                htmlFor="product-sort-select"
                className="text-[11px] text-neutral-400 flex items-center gap-1 whitespace-nowrap"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>সাজান:</span>
              </label>
              <select
                id="product-sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="px-3 py-1.5 bg-[#181920] border border-[#2b2d3a] hover:border-emerald-500/40 rounded-lg text-xs font-semibold text-neutral-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="featured">জনপ্রিয় (Featured)</option>
                <option value="price-asc">দাম: কম থেকে বেশি</option>
                <option value="price-desc">দাম: বেশি থেকে কম</option>
                <option value="rating">সেরা রেটিং (Top Rated)</option>
                <option value="newest">নতুন সংযোজন</option>
              </select>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
