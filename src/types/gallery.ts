export interface GalleryImage {
  id: string;
  image: string;
  category: 'Food' | 'Cafe' | 'Moments';
  caption?: string;
}
