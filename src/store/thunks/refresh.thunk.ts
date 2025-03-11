import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshAuth } from "../persistor";
import { RootState } from "..";
import { initialState, setAuthState, setError, setLoading } from "../slice";

// Async thunk to handle auth refresh
export const fetchAndSetAuthState = createAsyncThunk(
  "auth/refreshAuth",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { isAuthenticated } = state.auth;

    try {
      dispatch(setLoading(true));
      const user = await refreshAuth(isAuthenticated);
      console.log(user);

      if (user) {
        dispatch(
          setAuthState({
            isAuthenticated: true,
            isVerified: user.isVerified,
            isBlocked: !user.isBlocked,
            user: user.role,
            loading: false,
            error: null,
          })
        );
      } else {
        // If no user returned, reset to initial state
        dispatch(setAuthState({ ...initialState, loading: false }));
      }
    } catch (error) {
      dispatch(setError("Failed to refresh authentication"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
