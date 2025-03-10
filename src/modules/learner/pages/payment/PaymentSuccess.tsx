// import useFetch from "../../../../hooks/useFetch";
// import { useNavigate, useParams } from "react-router-dom";
// import { PurchaseHistory } from "../../../../shared/types/PurchaseHistory";

// const PaymentSuccess = () => {
//   const { purchaseId } = useParams<{ purchaseId: string }>();
//   const navigate = useNavigate();

//   const {
//     data: purchase,
//     loading,
//     error,
//   } = useFetch<PurchaseHistory>(`/api/payment/history/${purchaseId}`);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatAmount = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount / 100);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error || !purchase) return <div>Error loading details</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto text-center mb-8">
//         <div className="flex justify-center mb-6">
//           {/* Check circle icon */}
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
//           Payment Successful!
//         </h1>
//         <p className="text-lg text-gray-600">
//           Thank you for your purchase. Your course access has been activated.
//         </p>
//       </div>

//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">
//             Purchase Details
//           </h2>
//         </div>
//         <div className="p-6">
//           <div className="space-y-6">
//             <div className="flex items-center justify-between border-b pb-4">
//               <div className="flex items-center space-x-3">
//                 {/* Book icon */}
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
//                     d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                   />
//                 </svg>
//                 <span className="text-gray-600">Course ID</span>
//               </div>
//               <span className="font-medium text-gray-900">
//                 {purchase.courseId}
//               </span>
//             </div>

//             <div className="flex items-center justify-between border-b pb-4">
//               <div className="flex items-center space-x-3">
//                 {/* Calendar icon */}
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
//                 <span className="text-gray-600">Purchase Date</span>
//               </div>
//               <span className="font-medium text-gray-900">
//                 {formatDate(purchase.purchaseDate)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between border-b pb-4">
//               <div className="flex items-center space-x-3">
//                 {/* Credit card icon */}
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
//                 {purchase.paymentIntentId}
//               </span>
//             </div>

//             <div className="flex items-center justify-between pt-2">
//               <div className="flex items-center space-x-3">
//                 <span className="text-gray-600 font-semibold">
//                   Total Amount
//                 </span>
//               </div>
//               <span className="text-xl font-bold text-blue-600">
//                 {formatAmount(purchase.amount)}
//               </span>
//             </div>
//           </div>

//           <div className="mt-8 space-y-4">
//             <button
//               className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
//               onClick={() => navigate("/learner/courses")}
//             >
//               Go to My Courses
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

// export default PaymentSuccess;
