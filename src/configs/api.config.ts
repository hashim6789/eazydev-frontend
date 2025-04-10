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

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

// Create an Axios instance
export const api: AxiosInstance = axios.create({
  baseURL: `${config.API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    config.headers = config.headers || {};

    const token = getCookie("accessToken");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    console.log("🚀 ~ originalRequest:", originalRequest);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${config.API_BASE_URL}/api/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = refreshResponse.data;

        document.cookie = `Authorization=${accessToken}; HttpOnly; Secure; SameSite=Strict; path=/`;

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // If refresh fails, reject the error to propagate it
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 401) {
      // Explicitly reject error for unhandled 401
      return Promise.reject(error);
    }

    if (error.response?.status === 403) {
      // Handle 403 status code
      document.cookie =
        "Authorization=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      console.log("error found: User Blocked");
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!["mentor", "admin"].includes(user)) {
        window.location.href = `/login`;
      } else {
        window.location.href = `/${user}/login`;
      }
    }

    // Ensure all other errors are passed back
    return Promise.reject(error);
  }
);
