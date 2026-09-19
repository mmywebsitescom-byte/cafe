import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useCafe } from '../../context/CafeContext';

export const AboutSection: React.FC = () => {
  const { cafeInfo } = useCafe();

  const features = [
    {
      num: '01',
      title: 'Freshly Prepared',
      description: 'Zero frozen shortcuts. Every crust, spice blend, and sauce is prepared fresh each morning.',
    },
    {
      num: '02',
      title: 'Comfortable Atmosphere',
      description: 'Soft amber lighting, natural wood, and plush seating curated for quiet productivity or joyful chatter.',
    },
    {
      num: '03',
      title: 'Made for Good Moments',
      description: 'Hospitality rooted in genuine warmth where every guest is welcomed like family.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#241B16] relative overflow-hidden border-y border-[#C6A15B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Cinematic Vertical Café Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden aspect-[3/4] border border-[#C6A15B]/30 shadow-2xl shadow-black/80 group">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
                alt={`${cafeInfo.name} interior and coffee counter`}
                className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17120F]/90 via-transparent to-transparent" />
              
              {/* Bottom Inscription on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#17120F]/80 backdrop-blur-md border border-white/[0.1] rounded-sm">
                <p className="font-serif italic text-sm text-[#F8F3EC]">
                  &ldquo;A haven where time slows down and genuine conversation takes center stage.&rdquo;
                </p>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] block mt-1">
                  {cafeInfo.businessName || cafeInfo.name} Philosophy
                </span>
              </div>
            </div>

            {/* Corner Decorative Accent Frame */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r-2 border-b-2 border-[#C6A15B]/40 pointer-events-none hidden sm:block" />
          </div>

          {/* Right: Editorial Story & Feature List */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A15B]">
                <span>The {cafeInfo.name} Experience</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F3EC] leading-[1.15]">
                Good Food. <br />
                Warm Conversations. <br />
                <span className="italic font-normal text-[#D8BC82]">Memorable Moments.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#E9DED0]/85 font-light leading-relaxed max-w-xl pt-2">
                {cafeInfo.name} {cafeInfo.businessName ? `– ${cafeInfo.businessName}` : ''} is designed around the simple joy of enjoying good food in a welcoming atmosphere.
                From artisanal teas and gourmet coffees to handcrafted dishes and delicacies, every recipe reflects our deep passion for culinary craftsmanship.
              </p>
            </div>

            {/* Numbered Feature List */}
            <div className="space-y-6 pt-2">
              {features.map((item) => (
                <div key={item.num} className="flex items-start gap-5 group">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C6A15B]/50 group-hover:text-[#D8BC82] transition-colors shrink-0">
                    {item.num}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#F8F3EC] group-hover:text-[#D8BC82] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A99B8C] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="pt-4 flex items-center gap-4">
              <Link to="/about">
                <Button size="md" className="uppercase tracking-widest text-xs">
                  Discover Our Story
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="md" className="uppercase tracking-widest text-xs">
                  Plan Your Visit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

