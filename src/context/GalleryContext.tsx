import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GalleryImage } from '../types/gallery';
import { galleryService } from '../services/galleryService';

interface GalleryContextType {
  galleryImages: GalleryImage[];
  addImage: (image: Omit<GalleryImage, 'id'>) => GalleryImage;
  deleteImage: (id: string) => void;
  updateImageCategory: (id: string, category: 'Food' | 'Cafe' | 'Moments') => void;
  refreshGallery: () => void;
  resetGallery: () => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const refreshGallery = useCallback(() => {
    setGalleryImages(galleryService.getGalleryImages());
  }, []);

  useEffect(() => {
    refreshGallery();
  }, [refreshGallery]);

  const addImage = (image: Omit<GalleryImage, 'id'>) => {
    const created = galleryService.addImage(image);
    refreshGallery();
    return created;
  };

  const deleteImage = (id: string) => {
    galleryService.deleteImage(id);
    refreshGallery();
  };

  const updateImageCategory = (id: string, category: 'Food' | 'Cafe' | 'Moments') => {
    galleryService.updateImageCategory(id, category);
    refreshGallery();
  };

  const resetGallery = () => {
    galleryService.resetToDefault();
    refreshGallery();
  };

  return (
    <GalleryContext.Provider
      value={{
        galleryImages,
        addImage,
        deleteImage,
        updateImageCategory,
        refreshGallery,
        resetGallery,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
