import React from 'react';
import { Heart, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import { Food } from '../../types/food';
import { Modal } from '../ui/Modal';
import { formatPrice } from '../../utils/formatPrice';
import { useFavorites } from '../../context/FavoritesContext';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';

interface FoodDetailsModalProps {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FoodDetailsModal: React.FC<FoodDetailsModalProps> = ({ food, isOpen, onClose }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!food) return null;

  const favorited = isFavorite(food.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="flex flex-col md:flex-row">
        {/* Visual Showcase (Left) */}
        <div className="md:w-1/2 relative bg-[#17120F] min-h-[260px] md:min-h-[380px] overflow-hidden">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover brightness-[0.95]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241B16] via-transparent to-transparent md:hidden" />

          {/* Veg/Non-Veg Tag */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[#17120F]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.15]">
            <span
              className={`w-2 h-2 rounded-full ${
                food.isVeg ? 'bg-emerald-400' : 'bg-rose-500'
              }`}
            />
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#E9DED0]">
              {food.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
          </div>

          {/* Popular Tag */}
          {food.isPopular && (
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 bg-[#C6A15B] text-[#17120F] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-md">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>Café Favorite</span>
            </div>
          )}
        </div>

        {/* Details & Action Content (Right) */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#241B16]">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-[#C6A15B]">
                {food.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F8F3EC] mt-1 leading-snug">
                {food.name}
              </h3>
            </div>

            <div className="text-2xl font-serif font-bold text-[#D8BC82]">
              {formatPrice(food.price)}
            </div>

            <div className="h-[1px] bg-white/[0.08]" />

            <p className="text-sm text-[#E9DED0]/85 font-light leading-relaxed">
              {food.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#A99B8C]">
                <CheckCircle className="w-4 h-4 text-[#C6A15B]" />
                <span>Freshly prepared per order with authentic herbs</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#A99B8C]">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                <span>Purnima Foods culinary quality guarantee</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(food.id)}
              className={`flex-1 py-3 px-4 rounded-sm border flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                favorited
                  ? 'bg-[#C6A15B]/15 border-[#C6A15B] text-[#D8BC82]'
                  : 'bg-white/[0.04] border-[#C6A15B]/25 text-[#F8F3EC] hover:border-[#C6A15B]'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  favorited ? 'text-[#C6A15B] fill-[#C6A15B]' : 'text-[#A99B8C]'
                }`}
              />
              <span>{favorited ? 'Saved in Favorites' : 'Save to Favorites'}</span>
            </motion.button>

            <Button
              variant="secondary"
              size="md"
              onClick={onClose}
              className="text-xs uppercase tracking-wider"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
