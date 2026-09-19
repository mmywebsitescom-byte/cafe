import React, { useState, useMemo } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { Food } from '../../types/food';
import { MenuCard } from './MenuCard';
import { CategoryTabs } from './CategoryTabs';
import { MenuSearch } from './MenuSearch';
import { FoodDetailsModal } from './FoodDetailsModal';
import { FoodCardSkeleton } from '../ui/Loading';

interface MenuSectionProps {
  initialCategory?: string;
  limit?: number;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  initialCategory = 'All',
  limit,
  showFilters = true,
  title,
  subtitle,
}) => {
  const { menuItems, loading, selectedItem, setSelectedItem } = useMenu();
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: menuItems.length };
    menuItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [menuItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    let items = menuItems;

    if (activeCategory !== 'All') {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    if (limit && limit > 0) {
      items = items.slice(0, limit);
    }

    return items;
  }, [menuItems, activeCategory, searchTerm, limit]);

  return (
    <div className="w-full space-y-10">
      {/* Optional Title header */}
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {subtitle && (
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C6A15B]">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F3EC]">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* Interactive Controls Bar: Category Tabs & Search */}
      {showFilters && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <MenuSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div className="text-xs text-[#A99B8C]">
              Showing <span className="text-[#D8BC82] font-semibold">{filteredItems.length}</span>{' '}
              {filteredItems.length === 1 ? 'dish' : 'dishes'}
            </div>
          </div>

          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categoryCounts={categoryCounts}
          />
        </div>
      )}

      {/* Grid or Empty State or Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <FoodCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-[#241B16]/50 border border-[#C6A15B]/15 rounded-sm p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.03] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B]">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-serif text-xl text-[#F8F3EC]">No dishes found</h3>
            <p className="text-xs text-[#A99B8C]">
              Try searching with another keyword or pick a different category to explore our culinary creations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setSearchTerm('');
            }}
            className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B] hover:text-[#D8BC82] underline underline-offset-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((food) => (
            <MenuCard
              key={food.id}
              food={food}
              onOpenDetails={(item: Food) => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      {/* Food Details Modal */}
      <FoodDetailsModal
        food={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
