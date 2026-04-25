export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: string;
  fabric: string;
  color: string;
  images: string[];
  image?: string;
  rating: number;
  reviews: number;
  trending?: boolean;
  description: string;
  occasion?: string;
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

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  pin: string;
  phone: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt?: string;
  savedAddresses?: Address[];
}
