export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: string;
  fabric: string;
  color: string;
  images: string[];
  image?: string; // Fallback for some legacy data
  rating: number;
  reviews: number;
  trending?: boolean;
  description: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface TrackingEvent {
  status: 'placed' | 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  timestamp: string;
  message: string;
}

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: TrackingEvent['status'];
  createdAt: string;
  paymentMethod: string;
  trackingTimeline: TrackingEvent[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt?: string;
}
