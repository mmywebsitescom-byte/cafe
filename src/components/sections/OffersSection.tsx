import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const OffersSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#17120F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-sm overflow-hidden bg-[#241B16] border border-[#C6A15B]/30 shadow-xl p-6 sm:p-8 lg:p-10">
          {/* Subtle gold decorative grid / borders */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#C6A15B]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-10 -left-10 w-32 h-32 border border-[#C6A15B]/20 rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/30 text-[#D8BC82]">
                <Sparkles className="w-3 h-3" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                  Curated Chef Selection
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F8F3EC] leading-tight">
                Your Next Favorite <br />
                <span className="italic font-normal text-[#D8BC82]">Could Be Waiting.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#E9DED0]/85 font-light leading-relaxed max-w-lg">
                Experience our seasonal chef pairing: Stone-baked Paneer Butter Tikka Pizza paired with slow-steeped Arabica Velvet Cold Brew. A match of smoky crunch and silky coffee bliss.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <Link to="/menu">
                  <Button size="md" className="uppercase tracking-widest text-xs font-bold">
                    Discover Today&apos;s Special
                  </Button>
                </Link>
                <span className="text-[11px] text-[#A99B8C]">
                  * Available all day for dine-in & takeaway
                </span>
              </div>
            </div>

            {/* Right: Large Food Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-sm overflow-hidden aspect-[16/11] border border-[#C6A15B]/40 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
                  alt="Today's Special artisanal pairing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17120F]/90 via-transparent to-transparent opacity-60" />

                {/* Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#17120F]/85 backdrop-blur-md border border-[#C6A15B]/30 rounded-sm flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#C6A15B]">
                      Featured Pairing
                    </span>
                    <h4 className="font-serif text-xs font-bold text-[#F8F3EC]">
                      Pizza & Cold Brew Duet
                    </h4>
                  </div>
                  <span className="text-xs font-serif font-bold text-[#D8BC82]">
                    Chef Special
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
