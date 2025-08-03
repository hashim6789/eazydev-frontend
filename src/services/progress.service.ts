import { api } from "../configs";
import { PaginatedData, ProgressLearning } from "../types";

export const getProgressList = async (
  page: number,
  limit: number
): Promise<PaginatedData<ProgressLearning>> => {
  const response = await api.get<PaginatedData<ProgressLearning>>(
    `/progresses?page=${page}&limit=${limit}`
  );

  if (response.status === 200) {
    return response.data;
  }

  throw new Error("progress list fetch failed");
};
