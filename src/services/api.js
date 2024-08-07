import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = (token) => {
  api.defaults.headers["Authorization"] = `${token}`;
};

export const login = async (email, password) => {
  const response = await api.post("/admin/login", { email, password });
  return response.data;
};

export const getDashboardData = async (token) => {
  setAuthToken(token);
  const response = await api.get("/admin/dashboard");
  return response.data;
};

// Order CRUD operations
export const getOrders = async (token) => {
  setAuthToken(token);
  const response = await api.get("/admin/orders");
  return response.data;
};

export const getOrderById = async (id, token) => {
  setAuthToken(token);
  const response = await api.get(`/admin/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, data, token) => {
  setAuthToken(token);
  const response = await api.patch(`/admin/orders/${id}`, data);
  return response.data;
};

// Product CRUD operations
export const getProducts = async (token) => {
  setAuthToken(token);
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id, token) => {
  setAuthToken(token);
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product, token) => {
  setAuthToken(token);
  const response = await api.post("/products", product);
  return response.data;
};

export const updateProduct = async (id, updates, token) => {
  setAuthToken(token);
  const response = await api.patch(`/products/${id}`, updates);
  return response.data;
};

export const deleteProduct = async (id, token) => {
  setAuthToken(token);
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
