// src/api/bikeService.js
import API from "./api";

// ✅ Create Bike
export const createBike = async (bikeData) => {
  const response = await API.post("/bikes", bikeData);
  return response.data;
};

// ✅ Get Bikes with filters
export const getBikes = async (filters = {}) => {
  const response = await API.get("/bikes", { params: filters });
  return response.data;
};
