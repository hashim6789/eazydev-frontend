// import { FormEvent } from "react";

// //subclasses
// interface ValidationError {
//   [key: string]: string[];
// }

// interface ForgotPasswordModalProps {
//   forgotPasswordEmail: string;
//   setForgotPasswordEmail: (email: string) => void;
//   forgotPasswordModal: boolean;
//   setForgotPasswordModal: (modal: boolean) => void;
//   loading: boolean;
//   error: string | null;
//   forgotErrors: ValidationError;
//   handleForgotPasswordSubmit: (e: FormEvent) => Promise<void>;
// }

// const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
//   forgotPasswordEmail,
//   setForgotPasswordEmail,
//   forgotPasswordModal,
//   setForgotPasswordModal,
//   loading,
//   error,
//   forgotErrors: errors,
//   handleForgotPasswordSubmit,
// }) => {
//   if (!forgotPasswordModal) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//         <h2 className="text-2xl font-semibold text-blue-600 text-center mb-4">
//           Forgot Password
//         </h2>
//         <p className="text-gray-600 text-center mb-6">
//           Enter your email to reset your password.
//         </p>

//         <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={forgotPasswordEmail}
//               onChange={(e) => setForgotPasswordEmail(e.target.value)}
//             />
//           </div>

//           {error && <p className="text-sm text-red-600 text-center">{error}</p>}

//           {errors.email && (
//             <div className="text-sm text-red-700">
//               {errors.email.map((message, index) => (
//                 <p key={`${index}`} className="text-sm text-red-700">
//                   {message}
//                 </p>
//               ))}
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Send Reset Link"}
//           </button>
//         </form>

//         <button
//           onClick={() => setForgotPasswordModal(false)}
//           className="mt-4 w-full py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordModal;
