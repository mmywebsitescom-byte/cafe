import React from 'react';

export const MENU_CATEGORIES = [
  'All',
  'Fast Food',
  'Pizza',
  'Chinese',
  'Main Course',
  'Snacks',
  'Tea & Coffee',
  'Beverages',
  'Desserts',
] as const;

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-2">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
        {MENU_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts ? categoryCounts[category] : undefined;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 select-none cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#C6A15B] text-[#17120F] shadow-md shadow-[#C6A15B]/20 scale-105'
                  : 'bg-[#241B16] text-[#A99B8C] border border-[#C6A15B]/15 hover:border-[#C6A15B]/40 hover:text-[#F8F3EC]'
              }`}
            >
              <span>{category}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-[#17120F]/20 text-[#17120F]'
                      : 'bg-white/[0.06] text-[#A99B8C]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
