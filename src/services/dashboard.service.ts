// services/adminService.ts
import { api } from "../configs";
import {
  AdminAnalyzeResponseType,
  MentorAnalyzeResponseType,
} from "../types/chart";

export const fetchAdminDashboardData =
  async (): Promise<AdminAnalyzeResponseType> => {
    const response = await api.get<AdminAnalyzeResponseType>("/analysis/admin");
    return response.data;
  };

export const fetchMentorDashboardData =
  async (): Promise<MentorAnalyzeResponseType> => {
    const response = await await api.get<MentorAnalyzeResponseType>(
      `/analysis/mentors`
    );
    return response.data;
  };
