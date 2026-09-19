import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Heart, Menu as MenuIcon, X, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { useFavorites } from '../../context/FavoritesContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favoritesCount, setIsDrawerOpen } = useFavorites();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#17120F]/90 backdrop-blur-md border-b border-[#C6A15B]/20 py-3.5 shadow-xl shadow-black/20'
            : 'bg-gradient-to-b from-[#17120F]/80 via-[#17120F]/40 to-transparent py-5 sm:py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <BrandLogo theme="dark" size="sm" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm tracking-[0.1em] transition-all uppercase relative py-1 ${
                    isActive
                      ? 'text-[#D8BC82] font-semibold'
                      : 'text-[#E9DED0]/85 hover:text-[#F8F3EC]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C6A15B]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Favorites Counter Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.04] border border-[#C6A15B]/25 hover:border-[#C6A15B] text-[#F8F3EC] flex items-center gap-1.5 transition-all group"
              title="View saved favorites"
              aria-label="Favorites"
            >
              <Heart
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  favoritesCount > 0 ? 'text-[#C6A15B] fill-[#C6A15B]' : 'text-[#A99B8C]'
                }`}
              />
              <span className="text-xs font-semibold text-[#D8BC82]">
                {favoritesCount}
              </span>
            </button>

            {/* Desktop 'View Menu' Action Button */}
            <Link
              to="/menu"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-sm bg-[#C6A15B] text-[#17120F] hover:bg-[#D8BC82] transition-all shadow-sm hover:shadow-[#C6A15B]/20"
            >
              <span>View Menu</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#E9DED0] hover:text-[#F8F3EC] rounded-sm hover:bg-white/[0.05]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C6A15B]" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#17120F]/98 backdrop-blur-xl md:hidden pt-28 px-6 pb-10 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-semibold">
                Explore Khatti Cafe
              </p>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-2xl font-serif tracking-wide py-1 flex items-center justify-between border-b border-white/[0.06] ${
                        isActive ? 'text-[#D8BC82]' : 'text-[#E9DED0]'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#C6A15B]/50" />
                  </NavLink>
                ))}
                <NavLink
                  to="/admin"
                  className="text-sm font-sans tracking-widest uppercase text-[#A99B8C] py-2 flex items-center justify-between"
                >
                  <span>Admin Panel (Demo)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#C6A15B]/15 text-[#C6A15B]">Internal</span>
                </NavLink>
              </nav>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <Link
                to="/menu"
                className="w-full inline-flex items-center justify-center font-semibold tracking-wider text-sm uppercase py-3.5 rounded-sm bg-[#C6A15B] text-[#17120F]"
              >
                Explore Full Menu
              </Link>
              <div className="text-center text-xs text-[#A99B8C]">
                Purnima Foods • Crafted with Warmth
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
