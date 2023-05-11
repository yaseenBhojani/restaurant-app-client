import { ReactNode } from 'react';

// Common interfaces
export interface IChildren {
  children: ReactNode;
}

// Interfaces related to food items
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
  foods: FoodItem[];
}

// Interfaces related to the shopping cart
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

// Interfaces related to the checkout process
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

// Interfaces related to orders
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

export interface OrderState {
  isLoading: boolean;
  items: Order[];
}

export interface ChangeOrderStatus {
  id: string;
  status: string;
}

// Interfaces related to authentication
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

// Interfaces related to UI components
export interface SpinnerProps {
  size?: number;
  thickness?: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

// Interfaces related to headings
export interface IHeading {
  children: ReactNode;
  level: 1 | 2 | 3 | 4;
  imageUrl: string;
}

export interface AdminFoodItemState {
  isLoading: boolean;
  deleteItem: null | string;
  deleteModalIsOpen: boolean;
}
