export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  created_at?: string;
}
