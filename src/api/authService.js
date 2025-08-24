import api from "./api";

export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

export const loginUser = async (userData) => {
  return await api.post("/auth/login", userData);
};
