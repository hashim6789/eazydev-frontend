import { useEffect, useState } from "react";
import { api, config } from "../configs";
import { HttpStatusCode } from "../constants";
import { getAxiosErrorMessage } from "../utils";

export const useAuthState = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isVerified: false,
    isBlocked: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const response = await api.get(`${config.API_BASE_URL}/refresh/user`, {
          withCredentials: true,
        });

        if (response.status === HttpStatusCode.OK) {
          setAuthState({
            ...response.data,
            loading: false,
            error: null,
          });
        }
      } catch (error: unknown) {
        setAuthState({
          isAuthenticated: false,
          isVerified: false,
          isBlocked: false,
          user: null,
          loading: false,
          error: getAxiosErrorMessage(error, "Failed to fetch auth state"),
        });
      }
    };

    fetchAuthState();
  }, []);

  return authState;
};
