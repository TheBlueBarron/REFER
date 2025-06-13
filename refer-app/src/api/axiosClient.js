import axios from "axios";

const axiosClient = axios.create({
  // Read base URL from environment to allow configurable backends
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000/api",
  withCredentials: false, // set to true if using cookies
});

// Optional: Add auth token automatically to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or from context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
