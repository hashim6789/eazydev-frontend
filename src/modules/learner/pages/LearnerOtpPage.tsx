// import React from "react";

// //imported build-in ui components
// import { Timer, ArrowRight } from "lucide-react";

// //imported custom hooks
// import useOtp from "../../../hooks/useOtp";

// //imported build-in hooks
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store";

// interface OTPInputProps {
//   //   onComplete?: (otp: string) => void;
// }

// const LearnerOtpPage: React.FC<OTPInputProps> = () =>
//   // { onComplete }
//   {
//     const {
//       otp,
//       timer,
//       inputRefs,
//       handleChange,
//       handleKeyDown,
//       handlePaste,
//       resendOtp,
//       handleVerify,
//     } = useOtp();

//     const { error } = useSelector((state: RootState) => state.auth);

//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="w-full max-w-md mx-4 bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
//           <p className="text-center text-gray-500 mb-6">
//             Enter the 6-digit code sent to your device
//           </p>
//           {error && (
//             <p className="text-red-500 text-center flex items-center justify-center h-full">
//               {error}
//             </p>
//           )}

//           <div className="flex justify-center gap-2 mb-6">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(ref) => {
//                   if (ref) inputRefs.current[index] = ref;
//                 }}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(e, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 onPaste={index === 0 ? handlePaste : undefined}
//                 className="w-12 h-12 text-center text-2xl border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
//               />
//             ))}
//           </div>

//           <div className="flex flex-col items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Timer className="w-5 h-5 text-gray-500" />
//               <span className="text-gray-600">
//                 {Math.floor(timer / 60)}:
//                 {(timer % 60).toString().padStart(2, "0")}
//               </span>
//             </div>

//             <button
//               onClick={resendOtp}
//               disabled={timer > 0}
//               className={`w-full max-w-xs py-2 px-4 rounded-lg font-semibold text-white
//             ${timer > 0 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}
//             transition-colors`}
//             >
//               {timer > 0 ? "Wait to resend" : "Resend OTP"}
//             </button>

//             <button
//               onClick={async () => handleVerify("learner")}
//               className={`w-full max-w-xs py-2 px-4 rounded-lg font-semibold text-white
//             ${
//               !otp.every((digit) => digit !== "")
//                 ? "bg-gray-400"
//                 : "bg-blue-500 hover:bg-blue-600"
//             }
//             transition-colors`}
//               disabled={!otp.every((digit) => digit !== "")}
//             >
//               Verify <ArrowRight className="ml-2 w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default LearnerOtpPage;
