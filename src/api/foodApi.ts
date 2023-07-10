import axios from "axios";
import { FoodItem } from "../types/interfaces";

const BASE_URL = "https://restaurant-app-server-chi.vercel.app/";

// Function to create a food item
export const createFood = async (food: FoodItem) => {
  try {
    const response = await axios.post(`${BASE_URL}food`, food, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message ?? "An error occurred"
        : "An error occurred"
    );
  }
};

// Function to get all food items
export const getFoods = async () => {
  try {
    const response = await axios.get(`${BASE_URL}food`);
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message ?? "An error occurred"
        : "An error occurred"
    );
  }
};

// Function to delete a food item by ID
export const deleteFood = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}food/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message ?? "An error occurred"
        : "An error occurred"
    );
  }
};

// Function to update a food item by ID
export const updateFood = async (id: string, foodItem: FoodItem) => {
  try {
    const response = await axios.patch(`${BASE_URL}food/${id}`, foodItem, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message ?? "An error occurred"
        : "An error occurred"
    );
  }
};
