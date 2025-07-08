import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { SubRole } from "../../../types";
import useAuth from "../../../hooks/useAuth";
import { showErrorToast } from "../../../utils";

interface GoogleLoginButtonProps {
  user: SubRole;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ user }) => {
  const { handleGoogleSignup, loading } = useAuth();

  const handleSuccess = async (response: CredentialResponse) => {
    try {
      const { credential } = response;

      if (!credential) return null;

      localStorage.setItem("authToken", credential);

      handleGoogleSignup(credential, user);
    } catch (error) {
      console.log("Google login failed:", error);
    }
  };

  const handleFailure = () => {
    showErrorToast("Login Failed");
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
