import axios from 'axios';
import { LoginUserProp, SignUpUserProp } from '../types/interfaces';

const BASE_URL = 'https://restaurant-app-server.up.railway.app/';

// Function to create a new user
export const createUser = async (user: SignUpUserProp) => {
  try {
    const response = await axios.post(`${BASE_URL}user`, user);
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message ?? 'An error occurred'
        : 'An error occurred'
    );
  }
};

// Function to log in a user
export const loginUser = async (user: LoginUserProp) => {
  try {
    const response = await axios.post(`${BASE_URL}auth`, user);
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message ?? 'An error occurred'
        : 'An error occurred'
    );
  }
};

// Function to check if the user is authenticated
export const isAuthUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}auth`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'x-refresh-token': localStorage.getItem('refreshToken'),
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message ?? 'An error occurred'
        : 'An error occurred'
    );
  }
};
