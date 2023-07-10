import axios from 'axios';
import { ChangeOrderStatus, Order } from '../types/interfaces';

const BASE_URL = 'https://restaurant-app-server-chi.vercel.app/';

// Function to create a new order
export const createOrderHandler = async (checkoutData: Order) => {
  try {
    const response = await axios.post(`${BASE_URL}order`, checkoutData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'x-refresh-token': localStorage.getItem('refreshToken'),
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }
  }
};

// Function to get orders for the current user
export const getOrdersHandler = async () => {
  try {
    const response = await axios.get(`${BASE_URL}order/user/email`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'x-refresh-token': localStorage.getItem('refreshToken'),
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }
  }
};

// Function to get all orders
export const getAllOrdersHandler = async () => {
  try {
    const response = await axios.get(`${BASE_URL}order`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'x-refresh-token': localStorage.getItem('refreshToken'),
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }
  }
};

// Function to change the status of an order
export const changeOrderStatusHandler = async ({
  id,
  status,
}: ChangeOrderStatus) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}order/${id}/status`,
      { status },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'x-refresh-token': localStorage.getItem('refreshToken'),
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }
  }
};
