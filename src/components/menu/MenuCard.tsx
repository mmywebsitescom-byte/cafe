import React from 'react';
import { Heart } from 'lucide-react';
import { Food } from '../../types/food';
import { formatPrice } from '../../utils/formatPrice';
import { useFavorites } from '../../context/FavoritesContext';
import { motion } from 'motion/react';

interface MenuCardProps {
  food: Food;
  onOpenDetails: (food: Food) => void;
  featured?: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({ food, onOpenDetails, featured = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(food.id);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(food.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onClick={() => onOpenDetails(food)}
      className={`group relative bg-[#241B16] border border-[#C6A15B]/20 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A15B]/70 hover:shadow-lg hover:shadow-[#C6A15B]/10 cursor-pointer select-none ${
        featured ? 'ring-1 ring-[#C6A15B]/40' : ''
      }`}
    >
      {/* Food Image Container with Veg/NonVeg Indicator & Favorite Heart */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#17120F]">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
        />

        {/* Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#241B16] via-transparent to-transparent opacity-75" />

        {/* Veg / Non-Veg Pill */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 bg-[#17120F]/90 backdrop-blur-md px-2 py-0.5 rounded-sm border border-white/[0.1]">
          <span
            className={`w-1.5 h-1.5 rounded-full ring-1 ring-black/40 ${
              food.isVeg ? 'bg-emerald-400' : 'bg-rose-500'
            }`}
          />
          <span className="text-[9px] uppercase font-semibold tracking-wider text-[#E9DED0]">
            {food.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.8 }}
          onClick={handleHeartClick}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-[#17120F]/85 backdrop-blur-md border border-[#C6A15B]/30 flex items-center justify-center transition-all hover:bg-[#C6A15B]/20"
          aria-label={favorited ? `Remove ${food.name} from favorites` : `Add ${food.name} to favorites`}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              favorited
                ? 'text-[#C6A15B] fill-[#C6A15B] scale-110'
                : 'text-[#E9DED0]/80 group-hover:text-white'
            }`}
          />
        </motion.button>

        {/* Category Pill floating at bottom of image */}
        <div className="absolute bottom-2 left-2.5">
          <span className="text-[9px] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 rounded-sm bg-[#17120F]/85 text-[#C6A15B] border border-[#C6A15B]/30">
            {food.category}
          </span>
        </div>
      </div>

      {/* Content Section - Compact Size */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-base font-bold text-[#F8F3EC] group-hover:text-[#D8BC82] transition-colors line-clamp-1">
              {food.name}
            </h3>
          </div>

          <p className="text-xs text-[#A99B8C] line-clamp-2 leading-relaxed font-light">
            {food.description}
          </p>
        </div>

        {/* Bottom Bar: Price and Quick Tap CTA */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[#A99B8C]">Price</span>
            <span className="text-base font-serif font-bold text-[#F8F3EC] group-hover:text-[#C6A15B] transition-colors">
              {formatPrice(food.price)}
            </span>
          </div>

          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#C6A15B] group-hover:underline underline-offset-4 flex items-center gap-1">
            Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
};
