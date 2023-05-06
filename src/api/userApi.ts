import axios from 'axios';
import { LoginUserProp, SignUpUserProp } from '../types/interfaces';

const BASE_URL = 'http://localhost:3333';

export const createUser = async (user: SignUpUserProp) => {
  try {
    const response = await axios.post(`${BASE_URL}/user`, user);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (user: LoginUserProp) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, user);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const isAuthUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth`, {
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
