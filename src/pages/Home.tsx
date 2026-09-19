import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { HeroSection } from '../components/hero/HeroSection';
import { FeaturedSection } from '../components/sections/FeaturedSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { MenuSection } from '../components/menu/MenuSection';
import { AboutSection } from '../components/sections/AboutSection';
import { OffersSection } from '../components/sections/OffersSection';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { ReviewSection } from '../components/reviews/ReviewSection';
import { LocationSection } from '../components/sections/LocationSection';
import { CTASection } from '../components/sections/CTASection';
import { OwnerNoteSection } from '../components/sections/OwnerNoteSection';
import { ScrollingMarquee } from '../components/common/ScrollingMarquee';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { useGallery } from '../context/GalleryContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { galleryImages } = useGallery();

  return (
    <PageContainer>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* Scrolling Marquee Ticker 1 */}
      <ScrollingMarquee />

      {/* 2. Signature Picks (Featured Food Cards) */}
      <div id="featured-section">
        <ScrollReveal direction="up" distance={35}>
          <FeaturedSection />
        </ScrollReveal>
      </div>

      {/* Owner's Recommendation & Real Highlights */}
      <ScrollReveal direction="up" distance={35}>
        <OwnerNoteSection />
      </ScrollReveal>

      {/* 3. Signature Experience (Food, Ambience, Moments 3 Interactive Panels) */}
      <ScrollReveal direction="up" distance={40} delay={0.1}>
        <ExperienceSection />
      </ScrollReveal>

      {/* 4. Menu Preview Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#17120F] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal direction="up" distance={25}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/[0.08]">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A15B]">
                  Culinary Highlights
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F3EC]">
                  Explore the Café Menu
                </h2>
              </div>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#D8BC82] hover:text-[#F8F3EC] group transition-colors self-start md:self-end"
              >
                <span>Explore Complete Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={30} delay={0.15}>
            <MenuSection limit={6} showFilters={true} />
          </ScrollReveal>
        </div>
      </section>

      {/* Scrolling Marquee Ticker 2 - Reversed direction for kinetic contrast */}
      <ScrollingMarquee
        reverse
        items={[
          'Sector 5 VIP Market Rourkela',
          'Dine-in & Quick Takeaway',
          'Crispy Thin-Crust Pizzas',
          'Stone-Ground Spices',
          'Cardamom Infused Chai',
          'Cozy Outdoor & Indoor Vibe',
          'Purnima Foods Quality',
        ]}
      />

      {/* 5. About Section (Cinematic Split Layout) */}
      <ScrollReveal direction="up" distance={35}>
        <AboutSection />
      </ScrollReveal>

      {/* 6. Special Offer Showcase */}
      <ScrollReveal direction="up" distance={30}>
        <OffersSection />
      </ScrollReveal>

      {/* 7. Gallery Preview Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#1B1410] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal direction="up" distance={25}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/[0.08]">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A15B]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Visual Atmosphere</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F3EC]">
                  Moments at Khatti
                </h2>
              </div>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#D8BC82] hover:text-[#F8F3EC] group transition-colors self-start md:self-end"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={30} delay={0.15}>
            <GalleryGrid images={galleryImages.slice(0, 6)} showCategoryFilter={false} />
          </ScrollReveal>
        </div>
      </section>

      {/* 8. Reviews & Feedback CTA Section */}
      <ScrollReveal direction="up" distance={35}>
        <ReviewSection />
      </ScrollReveal>

      {/* 9. Location & Contact Section */}
      <ScrollReveal direction="up" distance={35}>
        <LocationSection />
      </ScrollReveal>

      {/* 10. Final Warm CTA */}
      <ScrollReveal direction="up" distance={30}>
        <CTASection />
      </ScrollReveal>
    </PageContainer>
  );
};
