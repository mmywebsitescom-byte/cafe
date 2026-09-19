export interface CafeInfo {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  landmark?: string;
  plusCode?: string;
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
  services?: string[];
  ownerNote?: {
    date: string;
    text: string;
    tagline: string;
  };
  googleMapsUrl?: string;
  googleMapsEmbedUrl?: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
}
