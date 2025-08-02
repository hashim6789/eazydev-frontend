// services/adminService.ts
import { api } from "../configs";
import { AdminAnalyzeResponseType } from "../types/chart";

export const fetchAdminDashboardData =
  async (): Promise<AdminAnalyzeResponseType> => {
    const response = await api.get<AdminAnalyzeResponseType>("/analysis/admin");
    return response.data;
  };
