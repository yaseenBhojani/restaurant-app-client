import axios from 'axios';
import { ChangeOrderStatus, Order } from '../types/interfaces';

const BASE_URL = 'http://localhost:3333';

export const createOrderHandler = async (checkoutData: Order) => {
  try {
    const response = await axios.post(`${BASE_URL}/order`, checkoutData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'x-refresh-token': localStorage.getItem('refreshToken'),
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getOrdersHandler = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/order/user/email`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'x-refresh-token': localStorage.getItem('refreshToken'),
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAllOrdersHandler = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/order`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'x-refresh-token': localStorage.getItem('refreshToken'),
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const changeOrderStatusHandler = async ({
  id,
  status,
}: ChangeOrderStatus) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/order/${id}/status`,
      { status },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'x-refresh-token': localStorage.getItem('refreshToken'),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
