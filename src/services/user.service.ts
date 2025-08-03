// services/userService.ts
import { api } from "../configs";
import { User } from "../types";
import { ResponseMessages } from "../constants";
import { HttpStatusCode } from "axios";

interface FetchUsersParams {
  role: string;
  status: string;
  search: string;
  page: number;
  limit: number;
}

interface FetchUsersResponse {
  users: User[];
  totalPages: number;
}

export const fetchUsers = async ({
  role,
  status,
  search,
  page,
  limit,
}: FetchUsersParams): Promise<FetchUsersResponse> => {
  try {
    const response = await api.get(
      `/users?role=${role}&status=${status}&search=${search}&page=${page}&limit=${limit}`
    );

    const result = response.data;
    return {
      users: result.body,
      totalPages: result.last_page,
    };
  } catch (error) {
    console.error(ResponseMessages.ERROR.ERROR_OCCURRED, error);
    throw error;
  }
};

export const toggleUserBlockStatus = async (
  userId: string,
  change: boolean
): Promise<"blocked" | "unblocked" | null> => {
  const endpoint = `/users/${userId}/block`;
  const response = await api.patch(endpoint, { change });

  if (response.status === HttpStatusCode.Ok) {
    return response.data ? "blocked" : "unblocked";
  }

  return null;
};
