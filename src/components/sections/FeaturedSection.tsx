import React from 'react';
import { useMenu } from '../../context/MenuContext';
import { MenuCard } from '../menu/MenuCard';
import { FoodDetailsModal } from '../menu/FoodDetailsModal';
import { Food } from '../../types/food';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturedSection: React.FC = () => {
  const { menuItems, selectedItem, setSelectedItem } = useMenu();

  // Find the three signature picks
  const signatureItems = [
    menuItems.find((i) => i.id === 'food-1') || menuItems[0],
    menuItems.find((i) => i.id === 'food-2') || menuItems[1],
    menuItems.find((i) => i.id === 'food-3') || menuItems[2],
  ].filter(Boolean) as Food[];

  const heroFeatured = signatureItems[0];
  const secondaryFeatured = signatureItems.slice(1, 3);

  return (
    <section id="featured-section" className="py-20 lg:py-28 relative bg-[#17120F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with Eyebrow and Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A15B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Picks</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F3EC]">
              Made to Be Remembered.
            </h2>
            <p className="text-sm sm:text-base text-[#A99B8C] font-light">
              Carefully refined recipes that have become our regulars’ deepest cravings.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#D8BC82] hover:text-[#F8F3EC] group transition-colors self-start md:self-end"
          >
            <span>View All Creations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Compact 3-Card Signature Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {signatureItems.map((food, idx) => (
            <div key={food.id} className="flex flex-col">
              <MenuCard
                food={food}
                onOpenDetails={(item: Food) => setSelectedItem(item)}
                featured={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Demo Disclaimer notice */}
        <div className="text-center pt-4">
          <span className="text-[11px] text-[#A99B8C]/80 font-light">
            * Showcase pricing shown for demonstration. Inquire with our barista for seasonal availability.
          </span>
        </div>
      </div>

      <FoodDetailsModal
        food={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
