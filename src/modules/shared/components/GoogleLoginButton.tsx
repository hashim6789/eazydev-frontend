import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { SubRole } from "../../../types";
import useAuth from "../../../hooks/useAuth";

interface GoogleLoginButtonProps {
  user: SubRole;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ user }) => {
  const { handleGoogleSignup, loading, error } = useAuth();

  const handleSuccess = async (response: any) => {
    try {
      const { credential } = response;
      console.log("Google Credential:", credential);

      handleGoogleSignup(credential, user);
    } catch (error) {
      console.log("Google login failed:", error);
    }
  };

  const handleFailure = () => {
    console.log("Login Failed:", error);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        useOneTap
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default GoogleLoginButton;
