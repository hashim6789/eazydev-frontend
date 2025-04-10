import axios from "axios";
import { config } from "./env.config";

const axiosInstance = axios.create({
  baseURL: `${config.API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
