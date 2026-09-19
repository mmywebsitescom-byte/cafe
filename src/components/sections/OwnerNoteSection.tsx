import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Utensils, Heart, Check, MapPin, ArrowRight, Star } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useCafe } from '../../context/CafeContext';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const OwnerNoteSection: React.FC = () => {
  const { menuItems } = useMenu();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { cafeInfo } = useCafe();

  // Find the 3 highlighted dishes
  const ownerDishes = [
    menuItems.find((m) => m.name.toLowerCase().includes('dosa')) || menuItems[0],
    menuItems.find((m) => m.name.toLowerCase().includes('chowmein')) || menuItems[1],
    menuItems.find((m) => m.name.toLowerCase().includes('sandwich')) || menuItems[2],
  ].filter(Boolean);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#1A130F] via-[#211813] to-[#17120F] border-y border-[#C6A15B]/20 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-black/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#C6A15B]/20">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/35 text-[#D8BC82]">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
                From the Owner • {cafeInfo.ownerNote?.date || 'Special Feature'}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F8F3EC] leading-tight">
              {cafeInfo.ownerNote?.tagline || `“A Memorable Dining Experience at ${cafeInfo.name}” 🥞`}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#D8BC82]">
            <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
            <span className="font-light">
              {cafeInfo.landmark || cafeInfo.address}
            </span>
          </div>
        </div>

        {/* The Owner's Authentic Story Quote */}
        <div className="p-6 sm:p-8 bg-[#17120F]/90 border border-[#C6A15B]/30 rounded-sm shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#C6A15B]/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="space-y-4 max-w-4xl">
            <p className="text-sm sm:text-base text-[#F8F3EC] font-light leading-relaxed">
              &ldquo;{cafeInfo.ownerNote?.text || `Every dish at ${cafeInfo.name} is prepared with love and the finest ingredients. Our cozy atmosphere makes every visit unforgettable. Come see why our guests love dining here!`}&rdquo;
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/[0.08] text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C6A15B] text-[#17120F] flex items-center justify-center font-serif font-bold text-sm">
                  {cafeInfo.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="font-medium text-[#F8F3EC] block">{cafeInfo.businessName || cafeInfo.name} Management</span>
                  <span className="text-[11px] text-[#A99B8C]">{cafeInfo.name} • {cafeInfo.landmark || cafeInfo.address.split(',')[0]}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#D8BC82]">
                <span className="inline-flex items-center gap-1 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#C6A15B] text-[#C6A15B]" />
                  {cafeInfo.rating || 4.8} Stars ({cafeInfo.reviewCount || 300}+ Reviews)
                </span>
                <span className="text-white/20">•</span>
                <span>{cafeInfo.priceRange || '₹100–300'} / person</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Featured Owner's Signature Hit Dishes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F8F3EC]">
              Signature Hits Mentioned By The Owner
            </h3>
            <Link
              to="/menu"
              className="text-xs uppercase tracking-wider text-[#C6A15B] hover:text-[#D8BC82] font-semibold flex items-center gap-1 group"
            >
              <span>See Full Menu</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {ownerDishes.map((food) => {
              const favorited = isFavorite(food.id);
              return (
                <div
                  key={food.id}
                  className="bg-[#241B16] border border-[#C6A15B]/30 rounded-sm overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#C6A15B] transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#17120F]">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#241B16] via-transparent to-transparent opacity-80" />

                    {/* Vegetarian Indicator */}
                    <div className="absolute top-3 left-3 bg-[#17120F]/90 backdrop-blur-sm px-2 py-1 rounded-xs flex items-center gap-1.5 border border-white/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] uppercase tracking-wider text-[#F8F3EC] font-medium">
                        {food.category}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(food.id);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        favorited
                          ? 'bg-[#C6A15B] text-[#17120F] shadow-md'
                          : 'bg-[#17120F]/70 text-[#F8F3EC] hover:bg-[#C6A15B] hover:text-[#17120F]'
                      }`}
                      aria-label="Add to favorites"
                    >
                      <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#F8F3EC] group-hover:text-[#D8BC82] transition-colors">
                          {food.name}
                        </h4>
                        <span className="font-serif font-bold text-base text-[#D8BC82] shrink-0">
                          ₹{food.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#A99B8C] font-light leading-relaxed line-clamp-2">
                        {food.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="text-[11px] text-[#C6A15B] font-medium">
                        ⭐ Owner&apos;s Recommendation
                      </span>
                      <Link to="/menu">
                        <span className="text-xs uppercase font-semibold tracking-wider text-[#F8F3EC] hover:text-[#D8BC82]">
                          Order Now →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
