import { useEffect, useState } from "react";
import { api, config } from "../configs";

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
        const response = await api.get(
          `${config.API_BASE_URL}/api/refresh/user`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setAuthState({
            ...response.data,
            loading: false,
            error: null,
          });
        }
      } catch (error: any) {
        setAuthState({
          isAuthenticated: false,
          isVerified: false,
          isBlocked: false,
          user: null,
          loading: false,
          error: error.response?.data?.message || "Failed to fetch auth state",
        });
      }
    };

    fetchAuthState();
  }, []);

  return authState;
};

// const App = () => {
//   const authState = useAuthState();

//   if (authState.loading) {
//     return <p>Loading...</p>;
//   }

//   if (!authState.isAuthenticated) {
//     return <p>You are not logged in. Please log in to continue.</p>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {authState.user}</h1>
//       {authState.isVerified ? <p>Your account is verified.</p> : <p>Please verify your account.</p>}
//     </div>
//   );
// };

// export default App;
