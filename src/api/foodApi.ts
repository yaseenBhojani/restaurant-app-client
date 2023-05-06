import axios from 'axios';
import { FoodItem } from '../types/interfaces';

const BASE_URL = 'http://localhost:3333';

export const createFood = async (food: FoodItem) => {
  try {
    const response = await axios.post(`${BASE_URL}/food`, food, {
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

export const getFoods = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/food`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
