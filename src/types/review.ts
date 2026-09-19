export interface Review {
  id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
}
