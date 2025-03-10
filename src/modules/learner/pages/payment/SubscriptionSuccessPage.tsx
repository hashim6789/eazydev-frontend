// import useFetch from "../../../../hooks/useFetch";
// import { useNavigate, useParams } from "react-router-dom";

// interface SubscriptionHistory {
//   id: string;
//   userId: string;
//   planId: string;
//   paymentIntentId: string;
//   startDate: number;
//   endDate: number;
//   status: "active" | "expired";
// }

// const SubscriptionSuccess = () => {
//   const { subscriptionId } = useParams<{ subscriptionId: string }>();
//   const navigate = useNavigate();

//   const {
//     data: subscription,
//     loading,
//     error,
//   } = useFetch<SubscriptionHistory>(
//     `/api/payment/subscription-history/${subscriptionId}`
//   );

//   const formatDate = (timestamp: number) => {
//     const date = new Date(timestamp);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getSubscriptionDuration = (start: number, end: number) => {
//     const months = Math.round((end - start) / (30 * 24 * 60 * 60 * 1000));
//     return `${months} ${months === 1 ? "month" : "months"}`;
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error || !subscription)
//     return <div>Error loading subscription details</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto text-center mb-8">
//         <div className="flex justify-center mb-6">
//           <svg
//             className="w-20 h-20 text-green-500"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Subscription Activated!
//         </h1>
//         <p className="text-lg text-gray-600">
//           Thank you for subscribing. Your subscription is now{" "}
//           {subscription.status}.
//         </p>
//       </div>

//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">
//             Subscription Details
//           </h2>
//         </div>
//         <div className="p-6">
//           <div className="space-y-6">
//             <div className="flex items-center justify-between border-b pb-4">
//               <div className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//                 <span className="text-gray-600">Plan ID</span>
//               </div>
//               <span className="font-medium text-gray-900">
//                 {subscription.planId}
//               </span>
//             </div>

//             <div className="flex items-center justify-between border-b pb-4">
//               <div className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <span className="text-gray-600">Start Date</span>
//               </div>
//               <span className="font-medium text-gray-900">
//                 {formatDate(subscription.startDate)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between border-b pb-4">
//               <div className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <span className="text-gray-600">End Date</span>
//               </div>
//               <span className="font-medium text-gray-900">
//                 {formatDate(subscription.endDate)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between border-b pb-4">
//               <div className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span className="text-gray-600">Duration</span>
//               </div>
//               <span className="font-medium text-gray-900">
//                 {getSubscriptionDuration(
//                   subscription.startDate,
//                   subscription.endDate
//                 )}
//               </span>
//             </div>

//             <div className="flex items-center justify-between border-b pb-4">
//               <div className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
//                   />
//                 </svg>
//                 <span className="text-gray-600">Payment ID</span>
//               </div>
//               <span className="font-medium text-gray-900 text-sm">
//                 {subscription.paymentIntentId}
//               </span>
//             </div>

//             <div className="flex items-center justify-between pt-2">
//               <div className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span className="text-gray-600 font-semibold">Status</span>
//               </div>
//               <span
//                 className={`text-lg font-bold ${
//                   subscription.status === "active"
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {subscription.status.charAt(0).toUpperCase() +
//                   subscription.status.slice(1)}
//               </span>
//             </div>
//           </div>

//           <div className="mt-8 space-y-4">
//             <button
//               className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
//               onClick={() => navigate("/learner/courses")}
//             >
//               Go To Courses
//             </button>

//             <button
//               className="w-full py-2 px-4 border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors duration-200"
//               onClick={() => window.print()}
//             >
//               Download Receipt
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionSuccess;
