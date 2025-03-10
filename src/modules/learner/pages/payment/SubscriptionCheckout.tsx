// import React, { useState } from "react";
// import WrappedSelectedPlanSummary from "../../components/payment/SelectedPlanSummary";
// import useFetch from "../../../../hooks/useFetch";
// import useUnAuthorizedFetch from "../../../../hooks/useUnAuthorizedFetch";

// interface SubscriptionPlan {
//   id: string;
//   title: string;
//   duration: number;
//   price: number;
// }

// const SubscriptionCheckout = () => {
//   const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
//     null
//   );

//   const {
//     data: plans,
//     loading,
//     error,
//   } = useUnAuthorizedFetch<SubscriptionPlan[]>("/api/no-auth/plans");

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(price);
//   };

//   const calculateMonthlyPrice = (price: number, duration: number) => {
//     return formatPrice(price / duration);
//   };

//   const handleSubscribe = (plan: SubscriptionPlan) => {
//     setSelectedPlan(plan);
//     // Here you would integrate with your payment processor
//     console.log("Processing subscription for:", plan);
//   };

//   if (loading) {
//   }

//   if (error) {
//   }

//   if (!plans || plans.length <= 0) {
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Choose Your Subscription Plan
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Select the perfect plan for your needs and get started today
//           </p>
//         </div>

//         {/* Subscription Plans */}
//         <div className="grid md:grid-cols-3 gap-8 mb-12">
//           {plans &&
//             plans.map((plan) => (
//               <div
//                 key={plan.id}
//                 className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
//                   selectedPlan?.id === plan.id ? "ring-2 ring-blue-500" : ""
//                 }`}
//               >
//                 {/* {plan.id === "pro" && (
//                 <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
//                   Popular
//                 </div>
//               )} */}

//                 <div className="p-8">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                     {plan.title}
//                   </h3>

//                   <div className="mb-6">
//                     <div className="flex items-baseline">
//                       <span className="text-4xl font-bold text-gray-900">
//                         {formatPrice(plan.price)}
//                       </span>
//                       <span className="ml-2 text-gray-500">
//                         /{plan.duration}{" "}
//                         {plan.duration === 1 ? "month" : "months"}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-500 mt-2">
//                       {calculateMonthlyPrice(plan.price, plan.duration)} per
//                       month
//                     </p>
//                   </div>

//                   {/* Features */}
//                   <ul className="mb-8 space-y-4">
//                     <li className="flex items-center text-gray-600">
//                       <svg
//                         className="w-5 h-5 text-blue-500 mr-2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       Access to all features
//                     </li>
//                     <li className="flex items-center text-gray-600">
//                       <svg
//                         className="w-5 h-5 text-blue-500 mr-2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       Priority support
//                     </li>
//                     <li className="flex items-center text-gray-600">
//                       <svg
//                         className="w-5 h-5 text-blue-500 mr-2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       {plan.duration >= 6
//                         ? "Bonus content included"
//                         : "Basic content access"}
//                     </li>
//                   </ul>

//                   <button
//                     onClick={() => handleSubscribe(plan)}
//                     className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
//                       selectedPlan?.id === plan.id
//                         ? "bg-blue-600 text-white hover:bg-blue-700"
//                         : "bg-blue-100 text-blue-600 hover:bg-blue-200"
//                     }`}
//                   >
//                     {selectedPlan?.id === plan.id
//                       ? "Selected"
//                       : "Subscribe Now"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {/* Selected Plan Summary */}
//         {/* {selectedPlan && (
//           <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//               Order Summary
//             </h2>
//             <div className="space-y-4">
//               <div className="flex justify-between border-b pb-4">
//                 <span className="text-gray-600">Selected Plan</span>
//                 <span className="font-medium text-gray-900">
//                   {selectedPlan.title}
//                 </span>
//               </div>
//               <div className="flex justify-between border-b pb-4">
//                 <span className="text-gray-600">Duration</span>
//                 <span className="font-medium text-gray-900">
//                   {selectedPlan.duration}{" "}
//                   {selectedPlan.duration === 1 ? "month" : "months"}
//                 </span>
//               </div>
//               <div className="flex justify-between pt-2">
//                 <span className="text-gray-600">Total Amount</span>
//                 <span className="text-xl font-bold text-blue-600">
//                   {formatPrice(selectedPlan.price)}
//                 </span>
//               </div>
//             </div>
//             <button
//               className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
//               onClick={() => console.log("Proceeding to payment...")}
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         )} */}
//         {selectedPlan && WrappedSelectedPlanSummary(selectedPlan)}
//       </div>
//     </div>
//   );
// };

// export default SubscriptionCheckout;
