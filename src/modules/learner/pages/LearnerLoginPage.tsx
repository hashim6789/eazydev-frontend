// import { Eye, EyeOff } from "lucide-react";

// //imported shared utilities
// import loginImage from "../../../assets/img/wall_paper_03.jpg";
// import GoogleLoginButton from "../../../shared/GoogleLoginButton";

// //imported child components
// import ForgotPasswordModal from "../components/LearnerForgotPassword";

// // Imported the custom hooks
// import useLearnerAuth from "../hooks/useLearnerAuth";
// import { useNavigate } from "react-router-dom";

// const LearnerLoginPage: React.FC = () => {
//   const navigate = useNavigate();

//   const {
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
//   } = useLearnerAuth();

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Left side - Image Section */}
//       <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 overflow-hidden">
//         <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
//           <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
//           <p className="text-lg">Your journey starts here.</p>
//         </div>
//         <div className="px-20 py-40">
//           <img
//             src={loginImage}
//             alt="Learner"
//             className="object-fit w-full h-full rounded-3xl opacity-100"
//           />
//         </div>
//       </div>

//       {/* Right side - Form Section */}
//       <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
//         <div className="max-w-md w-full mx-auto">
//           <button
//             type="button"
//             onClick={() => navigate("/mentor/login")}
//             className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
//           >
//             Mentor
//           </button>
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-semibold mb-2 text-blue-600">
//               {isLogin ? "Learner Login" : "Learner Signup"}
//             </h1>
//             <p className="text-gray-600">
//               {isLogin
//                 ? "Access your learner dashboard."
//                 : "Create a new account."}
//             </p>
//           </div>
//           <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
//                 isLogin ? "bg-blue-600 text-white" : "text-gray-600"
//               }`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
//                 !isLogin ? "bg-blue-600 text-white" : "text-gray-600"
//               }`}
//             >
//               Register
//             </button>
//           </div>
//           {loading && (
//             <div className="text-center py-4">
//               <p className="text-blue-600">Processing...</p>
//             </div>
//           )}
//           {error && !loading && (
//             <div className="text-center py-4">
//               <p className="text-red-600">{error}</p>
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {!isLogin && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter your first name"
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                   {errors.firstName && (
//                     <div className="text-sm text-red-700">
//                       {errors.firstName.map((message, index) => (
//                         <p key={`${index}`} className="text-sm text-red-700">
//                           {message}
//                         </p>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name (optional)
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter your last name"
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                   {errors.lastName && (
//                     <div className="text-sm text-red-700">
//                       {errors.lastName.map((message, index) => (
//                         <p key={`${index}`} className="text-sm text-red-700">
//                           {message}
//                         </p>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {errors.email && (
//                 <div className="text-sm text-red-700">
//                   {errors.email.map((message, index) => (
//                     <p key={`${index}`} className="text-sm text-red-700">
//                       {message}
//                     </p>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <div className="text-sm text-red-700">
//                   {errors.password.map((message, index) => (
//                     <p key={`${index}`} className="text-sm text-red-700">
//                       {message}
//                     </p>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {!isLogin && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Confirm your password"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 {errors.confirmPassword && (
//                   <div className="text-sm text-red-700">
//                     {errors.confirmPassword.map((message, index) => (
//                       <p key={`${index}`} className="text-sm text-red-700">
//                         {message}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//               disabled={loading}
//             >
//               {isLogin ? "Login" : "Sign up"}
//             </button>
//           </form>
//           <div className="mt-6">
//             <GoogleLoginButton user="learner" />
//           </div>{" "}
//         </div>
//         <div className="text-center mt-4">
//           <button
//             type="button"
//             className="text-blue-600 font-medium hover:underline"
//             onClick={() => setForgotPasswordModal(true)}
//           >
//             Forgot Password?
//           </button>
//         </div>
//       </div>

//       {/* Forgot Password Modal Component */}
//       {forgotPasswordModal && (
//         <ForgotPasswordModal
//           forgotPasswordEmail={forgotPasswordEmail}
//           setForgotPasswordEmail={setForgotPasswordEmail}
//           forgotPasswordModal={forgotPasswordModal}
//           setForgotPasswordModal={setForgotPasswordModal}
//           handleForgotPasswordSubmit={handleForgotPasswordSubmit}
//           loading={loading}
//           error={error}
//           forgotErrors={forgotErrors}
//         />
//       )}
//     </div>
//   );
// };

// export default LearnerLoginPage;
