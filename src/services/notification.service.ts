import { api } from "../configs";
import { Notification } from "../types";

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await api.get<Notification[]>(`/notify`);
  return response.data;
};
