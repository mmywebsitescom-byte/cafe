import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown, Utensils, Coffee, Compass, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 bg-[#17120F]" />
      
      {/* Radial soft lighting gradients */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#241B16] rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Subtle Grid Lines for boutique architectural feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Hero Text & CTAs */}
        <div className="lg:col-span-7 space-y-7 text-left z-10">
          {/* Eyebrow Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/35 text-[#D8BC82]">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
                KHATTI CAFE • PURNIMA FOODS
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241B16] border border-[#C6A15B]/30 text-xs text-[#F8F3EC]">
              <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="text-[#D8BC82] font-semibold">Open: 10:00 AM</span>
              <span className="text-white/20">•</span>
              <span className="text-[#D8BC82] font-semibold">Close: 10:30 PM</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open Everyday
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-[#F8F3EC]">
              <span className="text-amber-400 font-bold">★ 4.7</span>
              <span className="text-[#A99B8C]">(342 Reviews)</span>
              <span className="text-white/20">•</span>
              <span className="text-[#D8BC82] font-medium">₹1–200</span>
            </div>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8F3EC] leading-[1.1]"
          >
            Where Every Bite <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#D8BC82]">Feels Like Home.</span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#E9DED0]/85 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl"
          >
            Discover delicious food, refreshing drinks and a warm café experience crafted for good conversations and memorable moments.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link to="/menu">
              <Button size="lg" className="tracking-widest uppercase text-xs font-bold">
                Explore Menu
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="tracking-widest uppercase text-xs font-medium">
                Visit Khatti
              </Button>
            </Link>
          </motion.div>

          {/* Micro stats / Trust indicator featuring Open & Close time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6 flex flex-wrap items-center gap-5 sm:gap-7 text-xs text-[#A99B8C] border-t border-white/[0.08]"
          >
            <div>
              <span className="block text-lg font-serif font-bold text-[#F8F3EC]">4.7 ★</span>
              <span>342 Google Reviews</span>
            </div>
            <div className="w-[1px] h-8 bg-white/[0.1]" />
            <div>
              <span className="block text-lg font-serif font-bold text-[#D8BC82]">10:00 AM</span>
              <span className="text-[#F8F3EC]/90 font-medium">Open Time</span>
            </div>
            <div className="w-[1px] h-8 bg-white/[0.1]" />
            <div>
              <span className="block text-lg font-serif font-bold text-[#D8BC82]">10:30 PM</span>
              <span className="text-[#F8F3EC]/90 font-medium">Close Time</span>
            </div>
            <div className="w-[1px] h-8 bg-white/[0.1]" />
            <div>
              <span className="block text-lg font-serif font-bold text-[#F8F3EC]">₹1–200</span>
              <span>Pocket Friendly</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Hero Visuals & Floating Card */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[360px] mx-auto"
          >
            {/* Main Image Frame with Gold Haired Border - Compacted Size */}
            <div className="relative rounded-sm overflow-hidden aspect-[4/4.5] border border-[#C6A15B]/30 shadow-2xl shadow-black/80">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop"
                alt="Khatti Cafe artisanal coffee atmosphere"
                className="w-full h-full object-cover brightness-[0.9] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17120F] via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Glass Experience Card */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-3 sm:-left-6 bg-[#241B16]/90 backdrop-blur-md border border-[#C6A15B]/40 p-3 sm:p-4 rounded-sm shadow-xl shadow-black/60 max-w-[230px] sm:max-w-[260px] z-20"
            >
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-ping" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D8BC82]">
                    Sector-05 VIP Market
                  </span>
                </div>
              </div>

              {/* Timing badge in floating card */}
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#D8BC82] bg-[#17120F]/60 px-2 py-1 rounded-xs border border-white/5 mb-2">
                <Clock className="w-3 h-3 text-[#C6A15B] shrink-0" />
                <span>10:00 AM – 10:30 PM (Daily)</span>
              </div>

              <ul className="space-y-1 text-[11px] sm:text-xs text-[#F8F3EC]">
                <li className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                  <span className="truncate">Khatti Special Dosa</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                  <span className="truncate">Navratan Chowmein</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                  <span className="truncate">Dine-in • Takeaway</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <a
        href="#featured-section"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-[#A99B8C] hover:text-[#D8BC82] transition-colors"
        aria-label="Scroll down to featured section"
      >
        <span className="tracking-widest uppercase text-[10px]">Discover</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-[#C6A15B]" />
        </motion.div>
      </a>
    </section>
  );
};
