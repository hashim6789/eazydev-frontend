import { UserRole } from "../../types";

export interface AuthState {
  isAuthenticated: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  user: UserRole;
  loading: boolean;
  error: string | null;
}
