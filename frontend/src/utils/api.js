import axios from "axios";

console.log("VITE_API_URL =", process.env.VITE_API_URL);

const api = axios.create({ baseURL: process.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("oceon_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("oceon_token");
      localStorage.removeItem("oceon_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default api;
