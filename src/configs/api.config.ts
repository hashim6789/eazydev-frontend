import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { config } from ".";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api: AxiosInstance = axios.create({
  baseURL: `${config.API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.get("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("🔒 Refresh token failed:", refreshError);
        const userType = JSON.parse(localStorage.getItem("user") || "null");
        await api.post("/auth/logout");
        localStorage.removeItem("user");
        window.location.href =
          userType && ["mentor", "admin"].includes(userType)
            ? `/${userType}/login`
            : "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      await api.post("/auth/logout");
      console.warn("⚠️ Access forbidden: User may be blocked.");
      const userType = JSON.parse(localStorage.getItem("user") || "null");
      localStorage.removeItem("user");
      window.location.href =
        userType && ["mentor", "admin"].includes(userType)
          ? `/${userType}/login`
          : "/login";
    }

    return Promise.reject(error);
  }
);
