import React from 'react';
import { ArrowRight, Coffee } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#17120F] to-[#120E0C] text-center relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/30 flex items-center justify-center text-[#D8BC82]">
          <Coffee className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F3EC]">
          Join Us for Your Next Coffee & Conversation
        </h2>

        <p className="text-sm sm:text-base text-[#A99B8C] font-light max-w-xl mx-auto leading-relaxed">
          Step into our warm space, taste our freshly baked creations, and discover why Khatti Cafe is more than a café — it’s a feeling of home.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link to="/menu">
            <Button size="lg" className="uppercase tracking-widest text-xs font-bold" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Explore Full Menu
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="uppercase tracking-widest text-xs font-medium">
              View Location & Hours
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
