import { GalleryImage } from '../types/gallery';
import { INITIAL_GALLERY_IMAGES } from '../data/gallery';

const STORAGE_KEY = 'khatti_cafe_gallery';

export const galleryService = {
  getGalleryImages(): GalleryImage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read gallery from localStorage', e);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_IMAGES));
    } catch (e) {
      console.warn('Failed to seed gallery to localStorage', e);
    }
    return INITIAL_GALLERY_IMAGES;
  },

  addImage(imageData: Omit<GalleryImage, 'id'>): GalleryImage {
    const images = this.getGalleryImages();
    const newImage: GalleryImage = {
      ...imageData,
      id: `gal-${Date.now()}`
    };
    images.unshift(newImage);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch (e) {
      console.error('Failed to persist gallery image', e);
    }
    return newImage;
  },

  deleteImage(id: string): void {
    const images = this.getGalleryImages().filter((img) => img.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch (e) {
      console.error('Failed to delete gallery image', e);
    }
  },

  updateImageCategory(id: string, category: 'Food' | 'Cafe' | 'Moments'): void {
    const images = this.getGalleryImages();
    const target = images.find((img) => img.id === id);
    if (target) {
      target.category = category;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
      } catch (e) {
        console.error('Failed to update image category', e);
      }
    }
  },

  resetToDefault(): GalleryImage[] {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_IMAGES));
    } catch (e) {
      console.error('Failed to reset gallery', e);
    }
    return INITIAL_GALLERY_IMAGES;
  }
};
