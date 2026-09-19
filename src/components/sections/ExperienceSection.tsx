import React, { useState } from 'react';
import { ArrowUpRight, Utensils, Coffee, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExperienceSection: React.FC = () => {
  const [activePanel, setActivePanel] = useState<number>(0);

  const panels = [
    {
      id: 'food',
      num: '01',
      title: 'FOOD',
      subtitle: 'Artisanal & Handcrafted',
      description: 'From sizzling gourmet burgers and hand-tossed pizzas to fragrant kulhad chai, every plate is crafted with uncompromised freshness and bold flavors.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
      link: '/menu',
      linkText: 'Explore Menu',
      icon: <Utensils className="w-5 h-5 text-[#C6A15B]" />,
    },
    {
      id: 'ambience',
      num: '02',
      title: 'AMBIENCE',
      subtitle: 'Boutique & Tranquil',
      description: 'Intimate lighting, warm walnut accents, acoustic playlists, and generous seating invite you to read, work, or unwind for hours on end.',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop',
      link: '/gallery',
      linkText: 'View Gallery',
      icon: <Coffee className="w-5 h-5 text-[#C6A15B]" />,
    },
    {
      id: 'moments',
      num: '03',
      title: 'MOMENTS',
      subtitle: 'Hospitality & Connection',
      description: 'Birthday celebrations, quiet morning routines, or late-night coffee laughs — Khatti Cafe is where memories gently take root.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      link: '/contact',
      linkText: 'Join Us',
      icon: <HeartHandshake className="w-5 h-5 text-[#C6A15B]" />,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#17120F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A15B]">
            The Sensory Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F3EC]">
            More Than Just a Café.
          </h2>
          <p className="text-sm sm:text-base text-[#A99B8C] font-light">
            Hover over each pillar to immerse yourself in the three pillars of Khatti hospitality.
          </p>
        </div>

        {/* Three Large Interactive Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {panels.map((panel, idx) => (
            <div
              key={panel.id}
              onMouseEnter={() => setActivePanel(idx)}
              className={`relative rounded-sm overflow-hidden border transition-all duration-500 min-h-[290px] sm:min-h-[320px] flex flex-col justify-between p-5 sm:p-6 group cursor-pointer ${
                activePanel === idx
                  ? 'border-[#C6A15B] shadow-xl shadow-[#C6A15B]/15 scale-[1.01]'
                  : 'border-white/[0.08] hover:border-[#C6A15B]/50'
              }`}
            >
              {/* Background Image with Dark Mood Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.4] group-hover:brightness-[0.35]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17120F] via-[#17120F]/60 to-transparent" />
              </div>

              {/* Top Bar: Number & Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-[#D8BC82]/80">
                  {panel.num}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#17120F]/80 backdrop-blur-md border border-[#C6A15B]/30 flex items-center justify-center">
                  {panel.icon}
                </div>
              </div>

              {/* Bottom Content: Title, Subtitle, Description & Link */}
              <div className="relative z-10 space-y-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C6A15B] block">
                    {panel.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#F8F3EC] group-hover:text-[#D8BC82] transition-colors mt-0.5">
                    {panel.title}
                  </h3>
                </div>

                <p className="text-xs text-[#E9DED0]/80 font-light leading-relaxed line-clamp-2">
                  {panel.description}
                </p>

                <div className="pt-1">
                  <Link
                    to={panel.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6A15B] group-hover:text-[#D8BC82] transition-colors"
                  >
                    <span>{panel.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
