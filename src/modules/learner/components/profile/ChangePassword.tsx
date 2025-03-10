// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import api from "../../../../shared/utils/api";
// import { showToast } from "../../../../shared/utils/toastUtils";

// const verifyPasswordSchema = z.object({
//   currentPassword: z
//     .string()
//     .min(6, "Current password must be at least 6 characters"),
// });

// const changePasswordSchema = z
//   .object({
//     newPassword: z
//       .string()
//       .min(6, "New password must be at least 6 characters"),
//     confirmPassword: z
//       .string()
//       .min(6, "Confirm password must be at least 6 characters"),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"], // path of error
//   });

// type VerifyPasswordFormData = z.infer<typeof verifyPasswordSchema>;
// type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// interface ChangePasswordProps {}

// const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
//   const [isVerified, setIsVerified] = useState(false);

//   const {
//     register: registerVerifyPassword,
//     handleSubmit: handleSubmitVerifyPassword,
//     formState: { errors: errorsVerifyPassword },
//   } = useForm<VerifyPasswordFormData>({
//     resolver: zodResolver(verifyPasswordSchema),
//   });

//   const {
//     register: registerChangePassword,
//     handleSubmit: handleSubmitChangePassword,
//     formState: { errors: errorsChangePassword },
//     setValue: setValueChangePassword,
//   } = useForm<ChangePasswordFormData>({
//     resolver: zodResolver(changePasswordSchema),
//   });

//   const verifyCurrentPassword = async (data: VerifyPasswordFormData) => {
//     // Simulate an API request for password verification
//     try {
//       const response = await api.post(
//         "/api/profile/learner/verify-password",
//         data
//       );
//       if (response.status === 200 && response.data) {
//         console.log(response);
//         showToast.success(response.data.message);
//         setIsVerified(true);
//       }
//     } catch (error: any) {
//       showToast.error(error.message);
//       console.error(error);
//     }
//   };

//   const changePassword = async (data: ChangePasswordFormData) => {
//     // Submit new password

//     try {
//       const response = await api.post(
//         "/api/profile/learner/change-password",
//         data
//       );
//       if (response.status === 200 && response.data) {
//         console.log(response);
//         showToast.success(response.data.message);
//         setIsVerified(false);
//         setValueChangePassword("newPassword", "");
//         setValueChangePassword("confirmPassword", "");
//       }
//     } catch (error: any) {
//       showToast.error(error.message);
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div className="border rounded-lg p-4 mt-6">
//         <div className="text-xl font-semibold mb-4">Change Password</div>

//         {!isVerified ? (
//           <form
//             onSubmit={handleSubmitVerifyPassword(verifyCurrentPassword)}
//             className="grid gap-4"
//           >
//             <div className="grid gap-2">
//               <label className="text-sm font-medium">Current Password</label>
//               <input
//                 {...registerVerifyPassword("currentPassword")}
//                 className="border p-2 rounded-md"
//                 type="password"
//                 placeholder="Enter current password"
//               />
//               {errorsVerifyPassword.currentPassword && (
//                 <p className="text-red-500 text-sm">
//                   {errorsVerifyPassword.currentPassword.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-4"
//             >
//               Verify Password
//             </button>
//           </form>
//         ) : (
//           <form
//             onSubmit={handleSubmitChangePassword(changePassword)}
//             className="grid gap-4"
//           >
//             <div className="grid gap-2">
//               <label className="text-sm font-medium">New Password</label>
//               <input
//                 {...registerChangePassword("newPassword")}
//                 className="border p-2 rounded-md"
//                 type="password"
//                 placeholder="Enter new password"
//               />
//               {errorsChangePassword.newPassword && (
//                 <p className="text-red-500 text-sm">
//                   {errorsChangePassword.newPassword.message}
//                 </p>
//               )}
//             </div>
//             <div className="grid gap-2">
//               <label className="text-sm font-medium">Confirm Password</label>
//               <input
//                 {...registerChangePassword("confirmPassword")}
//                 className="border p-2 rounded-md"
//                 type="password"
//                 placeholder="Confirm new password"
//               />
//               {errorsChangePassword.confirmPassword && (
//                 <p className="text-red-500 text-sm">
//                   {errorsChangePassword.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-4"
//             >
//               Update Password
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;
