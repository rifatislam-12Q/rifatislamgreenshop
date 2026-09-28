import React from 'react';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="mb-5">
      <h2 className="text-base font-medium text-neutral-200 mb-2.5 tracking-tight">
        Category
      </h2>
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              id={`category-chip-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-neutral-200 text-neutral-900 shadow-sm'
                  : 'bg-[#1f2025] text-neutral-400 hover:text-neutral-200 hover:bg-[#282930] border border-transparent'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
};
