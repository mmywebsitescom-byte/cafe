import React, { useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { GalleryImage } from '../../types/gallery';
import { GalleryLightbox } from './GalleryLightbox';
import { motion } from 'motion/react';

interface GalleryGridProps {
  images: GalleryImage[];
  showCategoryFilter?: boolean;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ images, showCategoryFilter = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Food' | 'Cafe' | 'Moments'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  // Layout classes for dynamic editorial masonry feel
  const getSpanClasses = (index: number) => {
    // pattern: 0: tall/large, 1: normal, 2: wide, 3: normal, 4: normal, 5: wide
    const mod = index % 6;
    if (mod === 0) return 'md:col-span-2 md:row-span-2 aspect-[4/4] sm:aspect-[4/3] md:aspect-auto';
    if (mod === 2) return 'md:col-span-2 aspect-[16/9]';
    if (mod === 5) return 'md:col-span-2 aspect-[16/9]';
    return 'aspect-[4/3]';
  };

  return (
    <div className="w-full space-y-8">
      {/* Category Filter Pills */}
      {showCategoryFilter && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {(['All', 'Food', 'Cafe', 'Moments'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#C6A15B] text-[#17120F] shadow-md shadow-[#C6A15B]/20'
                  : 'bg-[#241B16] text-[#A99B8C] border border-[#C6A15B]/15 hover:border-[#C6A15B]/40 hover:text-[#F8F3EC]'
              }`}
            >
              {cat === 'All' ? 'Full Archive' : cat}
            </button>
          ))}
        </div>
      )}

      {/* Editorial Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center p-12 text-[#A99B8C] bg-[#241B16]/40 border border-[#C6A15B]/15 rounded-sm">
          No photos available in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
          {filteredImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: 'easeOut' }}
              onClick={() => setLightboxIndex(index)}
              className={`group relative rounded-sm overflow-hidden bg-[#241B16] border border-[#C6A15B]/20 cursor-pointer shadow-md transition-all duration-500 hover:border-[#C6A15B] hover:shadow-lg hover:shadow-[#C6A15B]/15 ${getSpanClasses(
                index
              )}`}
            >
              <img
                src={img.image}
                alt={img.caption || 'Khatti Cafe moment'}
                loading="lazy"
                className="w-full h-full object-cover brightness-[0.9] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
              />

              {/* Hover Dark Overlay with VIEW badge and caption */}
              <div className="absolute inset-0 bg-[#17120F]/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 sm:p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#D8BC82] bg-white/[0.06] px-2 py-0.5 rounded-sm border border-[#C6A15B]/25">
                    {img.category}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#C6A15B] text-[#17120F] flex items-center justify-center transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-0.5">
                  {img.caption && (
                    <p className="text-xs font-serif italic text-[#F8F3EC] line-clamp-2">
                      &ldquo;{img.caption}&rdquo;
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#C6A15B] font-semibold">
                    <span>View photo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
