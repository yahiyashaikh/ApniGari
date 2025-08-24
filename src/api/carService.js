// src/api/carService.js
import API from "./api";

// ✅ Create Car
export const createCar = async (carData) => {
  const response = await API.post("/cars", carData);
  return response.data;
};

// ✅ Get Cars with filters
export const getCars = async (filters = {}) => {
  const response = await API.get("/cars", { params: filters });
  return response.data;
};
