export interface Food {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isPopular: boolean;
  isFeatured: boolean;
}

export type MenuCategory = 
  | 'All'
  | 'South Indian'
  | 'Fast Food'
  | 'Pizza'
  | 'Chinese'
  | 'Main Course'
  | 'Snacks'
  | 'Tea & Coffee'
  | 'Beverages'
  | 'Desserts';
