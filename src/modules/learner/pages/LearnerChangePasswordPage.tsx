// import { Eye, EyeOff } from "lucide-react";

// //imported custom hooks
// import useChangePassword from "../hooks/useChangePassword";

// //imported build-in hooks
// import { useNavigate } from "react-router-dom";

// const LearnerChangePasswordPage: React.FC = () => {
//   const {
//     newPassword,
//     setNewPassword,
//     confirmPassword,
//     setConfirmPassword,
//     showPassword,
//     setShowPassword,
//     errors,
//     handleSubmit,
//     loading,
//     isValid,
//     errorMessage,
//   } = useChangePassword();

//   const navigate = useNavigate();

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Left side - Image Section */}
//       <div className="hidden lg:flex lg:w-1/2 relative bg-blue-700 overflow-hidden">
//         <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
//           <h2 className="text-4xl font-bold mb-4">Reset Your Password</h2>
//           <p className="text-lg">Secure your account with a new password.</p>
//         </div>
//       </div>

//       {/* Right side - Form Section */}
//       <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
//         <div className="max-w-md w-full mx-auto text-center">
//           {isValid ? (
//             <>
//               <h1 className="text-2xl font-semibold mb-2 text-blue-500">
//                 Change Password
//               </h1>
//               <p className="text-gray-600 mb-6">
//                 Set a new password for your account.
//               </p>

//               {loading && (
//                 <div className="text-center py-4">
//                   <p className="text-blue-600">Processing...</p>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* New Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     New Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="newPassword"
//                       placeholder="Enter new password"
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                     >
//                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                     </button>
//                   </div>
//                   {errors.password && (
//                     <div className="text-sm text-blue-700">
//                       {errors.password.map((message, index) => (
//                         <p key={index} className="text-sm text-blue-700">
//                           {message}
//                         </p>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Confirm Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm new password"
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                   {errors.confirmPassword && (
//                     <div className="text-sm text-blue-700">
//                       {errors.confirmPassword.map((message, index) => (
//                         <p key={index} className="text-sm text-blue-700">
//                           {message}
//                         </p>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                   disabled={loading}
//                 >
//                   Reset Password
//                 </button>
//               </form>
//             </>
//           ) : (
//             <div className="text-center py-20">
//               <h2 className="text-2xl font-bold text-red-600">Error</h2>
//               <p className="text-gray-600 mt-4">{errorMessage}</p>
//               <a
//                 onClick={() => navigate("/")}
//                 className="text-blue-600 mt-4 inline-block cursor-pointer"
//               >
//                 Go back to homepage
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LearnerChangePasswordPage;
