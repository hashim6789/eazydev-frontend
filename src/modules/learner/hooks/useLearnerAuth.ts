// import { FormEvent, useState } from "react";

// // Imported custom hooks
// import useAuth from "../../../hooks/useAuth";
// import useFormErrors from "../../../hooks/useFormErrors";

// // Imported DTOs for validating the credentials
// import { AuthLoginCredentials } from "../../../DTOS/AuthLoginCredentials";
// import { AuthSignupCredentials } from "../../../DTOS/AuthSignupCredentials";
// import { ForgotCredentials } from "../../../DTOS/ForgotCredentials";
// import { User } from "../../../shared/types/User";

// const useLearnerAuth = () => {
//   const { loading, error, handleLogin, handleSignup, handleForgotPassword } =
//     useAuth();
//   const { errors, validateCredentials } = useFormErrors<AuthLoginCredentials>();
//   const {
//     errors: forgotErrors,
//     validateCredentials: validateForgotCredentials,
//   } = useFormErrors<ForgotCredentials>();

//   // Form state
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [isLogin, setIsLogin] = useState<boolean>(true);
//   const [role] = useState<User>("learner");

//   // Forgot password state
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");
//   const [forgotPasswordModal, setForgotPasswordModal] =
//     useState<boolean>(false);

//   // Handle form submission for login and signup
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (isLogin) {
//       const loginCredentials = new AuthLoginCredentials();
//       loginCredentials.email = email.trim();
//       loginCredentials.password = password.trim();
//       loginCredentials.role = role;

//       const isValid = await validateCredentials(loginCredentials);
//       if (!isValid) return;

//       handleLogin(loginCredentials);
//     } else {
//       const signupCredentials = new AuthSignupCredentials();
//       signupCredentials.email = email.trim();
//       signupCredentials.password = password.trim();
//       signupCredentials.confirmPassword = confirmPassword.trim();
//       signupCredentials.firstName = firstName.trim();
//       signupCredentials.lastName = lastName.trim();
//       signupCredentials.role = role;

//       const isValid = await validateCredentials(signupCredentials);
//       if (!isValid) return;

//       handleSignup(signupCredentials);
//     }
//   };

//   // Handle forgot password request
//   const handleForgotPasswordSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const forgotCredentials = new ForgotCredentials();
//     forgotCredentials.email = forgotPasswordEmail;
//     forgotCredentials.role = role;

//     const isValid = await validateForgotCredentials(forgotCredentials);
//     if (!isValid) {
//       return;
//     }
//     handleForgotPassword(forgotCredentials);
//   };

//   return {
//     loading,
//     error,
//     email,
//     setEmail,
//     password,
//     setPassword,
//     confirmPassword,
//     setConfirmPassword,
//     firstName,
//     setFirstName,
//     lastName,
//     setLastName,
//     showPassword,
//     setShowPassword,
//     isLogin,
//     setIsLogin,
//     errors,
//     handleSubmit,
//     forgotPasswordEmail,
//     setForgotPasswordEmail,
//     forgotPasswordModal,
//     setForgotPasswordModal,
//     handleForgotPasswordSubmit,
//     forgotErrors,
//   };
// };

// export default useLearnerAuth;
