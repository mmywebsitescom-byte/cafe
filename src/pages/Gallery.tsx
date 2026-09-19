import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { useGallery } from '../context/GalleryContext';
import { useCafe } from '../context/CafeContext';
import { Camera } from 'lucide-react';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { ScrollingMarquee } from '../components/common/ScrollingMarquee';

export const GalleryPage: React.FC = () => {
  const { galleryImages } = useGallery();
  const { cafeInfo } = useCafe();

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#120E0C] to-[#17120F] text-center border-b border-[#C6A15B]/15 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />

        <ScrollReveal direction="up" distance={25} className="max-w-3xl mx-auto space-y-3.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/30 text-[#D8BC82]">
            <Camera className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
              The Visual Archive
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F3EC]">
            {cafeInfo.name} Gallery
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-[#D8BC82]">
            &ldquo;Frames of flavor, light, and togetherness.&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-[#A99B8C] font-light max-w-xl mx-auto leading-relaxed">
            Take a visual tour through our ambient corners, sizzling plates, and the comforting spirit that fills {cafeInfo.name} every day.
          </p>
        </ScrollReveal>
      </div>

      <ScrollingMarquee speed={30} />

      {/* Main Gallery Grid with Category Filters & Fullscreen Lightbox */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <GalleryGrid images={galleryImages} showCategoryFilter={true} />
      </div>
    </PageContainer>
  );
};
