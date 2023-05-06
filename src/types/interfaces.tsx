import { ReactNode } from 'react';

// Common interfaces
export interface IChildren {
  children: ReactNode;
}

// Heading interface
export interface IHeading {
  children: ReactNode;
  level: 1 | 2 | 3 | 4;
  imageUrl: string;
}

// Food interfaces
export interface FoodItem {
  _id?: string;
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
}

export interface FoodState {
  isLoading: boolean;
  foods: FoodItem[] | [];
}

// Cart interfaces
export interface CartItem {
  _id?: string;
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

// Checkout interfaces
export interface CheckoutState {
  shippingAddress: {
    email: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    saveAddress: boolean;
  };
  paymentMethod: {
    cardName: string;
    cardNumber: string;
    expDate: string;
    cvv: string;
    saveCard: boolean;
  };
}

// Order interfaces

export interface Order {
  _id?: string;
  email: string;
  address: string;
  city: string;
  zipCode: number;
  country: string;
  cardName: string;
  cardNumber: number;
  cvv: string;
  items: CartItem[];
  totalAmount: number;
  status?: string;
  createdAt?: Date;
}

// OrderState interfaces
export interface OrderState {
  isLoading: boolean;
  items: Order[] | [];
}

// Auth interfaces
export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  role?: 'USER' | 'ADMIN';
}

export interface SignUpUserProp {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginUserProp {
  email: string;
  password: string;
}

export interface ChangeOrderStatus {
  id: string;
  status: string;
}

export interface SpinnerProps {
  size?: number;
  thickness?: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}
