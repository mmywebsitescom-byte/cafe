import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Heart, ArrowRight } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useMenu } from '../../context/MenuContext';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const FavoritesDrawer: React.FC = () => {
  const { isDrawerOpen, setIsDrawerOpen, favorites, toggleFavorite, clearFavorites } =
    useFavorites();
  const { menuItems, setSelectedItem } = useMenu();

  const favoriteItems = menuItems.filter((item) => favorites.includes(item.id));

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0C0907]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#241B16] border-l border-[#C6A15B]/20 text-[#F8F3EC] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#C6A15B]/15 flex items-center justify-between bg-[#17120F]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/30 flex items-center justify-center text-[#D8BC82]">
                    <Heart className="w-4 h-4 fill-[#C6A15B]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg tracking-wide text-[#F8F3EC]">Saved Favorites</h2>
                    <p className="text-xs text-[#A99B8C]">
                      {favoriteItems.length} {favoriteItems.length === 1 ? 'dish' : 'dishes'} bookmarked
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-[#A99B8C] hover:text-[#F8F3EC] rounded-full hover:bg-white/[0.05] transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {favoriteItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-[#C6A15B]/20 flex items-center justify-center text-[#A99B8C]">
                      <Heart className="w-7 h-7 stroke-1" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg text-[#F8F3EC]">No favorites yet</h3>
                      <p className="text-sm text-[#A99B8C] max-w-xs">
                        Tap the heart icon on any café dish or drink to save it for your next visit.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Link to="/menu" className="flex items-center gap-2">
                        Explore Menu <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  favoriteItems.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-4 p-3.5 bg-[#17120F]/60 border border-[#C6A15B]/15 rounded-sm hover:border-[#C6A15B]/40 transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-sm border border-white/[0.06] shrink-0"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'
                            }`}
                          />
                          <span className="text-[11px] uppercase tracking-wider text-[#A99B8C] truncate">
                            {item.category}
                          </span>
                        </div>
                        <h4
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDrawerOpen(false);
                          }}
                          className="font-serif text-sm text-[#F8F3EC] group-hover:text-[#D8BC82] truncate cursor-pointer transition-colors"
                        >
                          {item.name}
                        </h4>
                        <p className="text-xs font-semibold text-[#C6A15B] mt-0.5">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(item.id)}
                        className="text-[#A99B8C]/50 hover:text-rose-400 p-2 rounded-sm hover:bg-white/[0.04] transition-colors"
                        title="Remove from favorites"
                        aria-label={`Remove ${item.name} from favorites`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {favoriteItems.length > 0 && (
                <div className="p-6 border-t border-[#C6A15B]/15 bg-[#17120F] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#A99B8C]">
                    <span>Demo Selection</span>
                    <button
                      type="button"
                      onClick={clearFavorites}
                      className="text-[#A99B8C] hover:text-rose-400 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <Link
                    to="/menu"
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-full inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-sm bg-[#C6A15B] text-[#17120F] font-semibold hover:bg-[#D8BC82] py-3 text-sm"
                  >
                    View in Full Menu
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
