export interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images?: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface CartItem extends Product {
  quantity: number
}

export type OrderItem = {
  amount_discount: number,
  amount_subtotal: number,
  amount_tax: number,
  amount_total: number,
  currency: string,
  description: string,
  id: string,
  quantity: number,
  image: string,
  price: any,
}

export interface Orders {
  amount: number,
  amountShipping: number,
  id: string,
  images: string[],
  items: OrderItem[]
  timestamp: number,
}

export type ProductData = {
  limit: number,
  products: Product[],
  skip: number,
  total: number
}

export type Sortings = 'priceLoToHi' | 'priceHiToLo' | 'rating';