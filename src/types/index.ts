export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  title: string;
  helpfulCount: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  name: string;
  dimensions: string;
  priceModifier: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  details: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  images360?: string[]; // 360 preview image paths
  category: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  specifications: Record<string, string>;
  stock: number;
  reviews: Review[];
  tags: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  id: string; // unique ID combining productId + color + size
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  total: number;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress?: {
    fullName: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  gstNumber?: string;
}
