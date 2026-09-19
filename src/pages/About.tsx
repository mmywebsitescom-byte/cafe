import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Sparkles, Heart, Coffee, Flame, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { ScrollingMarquee } from '../components/common/ScrollingMarquee';
import { OwnerNoteSection } from '../components/sections/OwnerNoteSection';

export const AboutPage: React.FC = () => {
  return (
    <PageContainer>
      {/* Header */}
      <div className="pt-28 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#120E0C] to-[#17120F] text-center border-b border-[#C6A15B]/15 relative overflow-hidden">
        <ScrollReveal direction="up" distance={25} className="max-w-3xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/30 text-[#D8BC82]">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
              Heritage & Craft
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F3EC]">
            About Khatti Cafe
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-[#D8BC82]">
            A hospitality venture by Purnima Foods
          </p>
        </ScrollReveal>
      </div>

      <ScrollingMarquee speed={35} />

      {/* Story Chapter 1: The Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <ScrollReveal direction="left" distance={30} className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A15B]">
              Chapter I • The Beginning
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F8F3EC] leading-snug">
              Born from a Love for Authentic Flavors and Cozy Spaces
            </h2>
            <p className="text-xs sm:text-sm text-[#E9DED0]/85 font-light leading-relaxed">
              Khatti Cafe was established with a singular vision: to create a sanctuary where good food meets effortless warmth. Conceived under the banner of <strong>Purnima Foods</strong>, our journey began with the conviction that dining out should never feel commercialized or rushed.
            </p>
            <p className="text-xs sm:text-sm text-[#E9DED0]/85 font-light leading-relaxed">
              Instead, we built an atmosphere reminiscent of an unhurried Sunday afternoon — where aromatic spices simmer in the kitchen, artisanal coffees are brewed with patience, and tables are arranged to foster real connection.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={30} className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden aspect-[4/3] border border-[#C6A15B]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop"
                alt="Khatti Cafe barista hand-crafting espresso"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Values Bento Grid */}
        <div className="space-y-8">
          <ScrollReveal direction="up" distance={25} className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A15B]">
              Our Guiding Principles
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EC]">
              The Four Pillars of Purnima Foods
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <ScrollReveal direction="up" distance={20} delay={0.05} className="p-4 sm:p-5 bg-[#241B16] border border-[#C6A15B]/20 rounded-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#17120F] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B]">
                <Flame className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#F8F3EC]">Uncompromised Freshness</h4>
              <p className="text-xs text-[#A99B8C] leading-relaxed">
                We prepare all signature sauces, crusts, and spice blends from scratch, refusing preservatives or frozen shortcuts.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} delay={0.1} className="p-4 sm:p-5 bg-[#241B16] border border-[#C6A15B]/20 rounded-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#17120F] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B]">
                <Coffee className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#F8F3EC]">Artisanal Brewing</h4>
              <p className="text-xs text-[#A99B8C] leading-relaxed">
                From slow-steeped Arabica beans to authentic clay-pot Kulhad chai with fresh crushed cardamom and ginger.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} delay={0.15} className="p-4 sm:p-5 bg-[#241B16] border border-[#C6A15B]/20 rounded-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#17120F] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B]">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#F8F3EC]">Warm Hospitality</h4>
              <p className="text-xs text-[#A99B8C] leading-relaxed">
                Hospitality inspired by Indian culture where the guest is greeted with genuine attentiveness and delight.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} delay={0.2} className="p-4 sm:p-5 bg-[#241B16] border border-[#C6A15B]/20 rounded-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#17120F] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B]">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#F8F3EC]">Thoughtful Design</h4>
              <p className="text-xs text-[#A99B8C] leading-relaxed">
                Warm walnut finishes, cozy nooks, acoustic curation, and soft amber lighting to soothe your senses.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Owner's Highlight */}
        <ScrollReveal direction="up" distance={30}>
          <OwnerNoteSection />
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" distance={25}>
          <div className="p-6 sm:p-8 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-center space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F8F3EC]">
              Experience the Flavors in Person
            </h3>
            <p className="text-xs sm:text-sm text-[#A99B8C] max-w-lg mx-auto">
              Explore our curated menu or visit our café enclave. We look forward to welcoming you.
            </p>
            <div className="flex justify-center gap-3">
              <Link to="/menu">
                <Button size="sm" className="uppercase tracking-wider text-xs">
                  Explore Menu
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="sm" className="uppercase tracking-wider text-xs">
                  Find Our Location
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageContainer>
  );
};
