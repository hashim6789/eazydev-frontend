// import React, { useState, useEffect } from "react";
// import api from "../../../../shared/utils/api"; // Adjust the import path as necessary
// import { SubscriptionHistory } from "../../../../shared/types/SubscriptionHistory";
// import { SubscriptionPlan } from "../../../../shared/types/SubscriptionPlan";
// import useFetch from "../../../../hooks/useFetch";
// import LoadingComponent from "../../../mentor/components/LoadingComponent";
// import ErrorComponent from "../../../mentor/components/ErrorComponent";
// import NoContentComponent from "../../../mentor/components/NoContentComponent";
// import useUnAuthorizedFetch from "../../../../hooks/useUnAuthorizedFetch";

// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(price);
// };

// const calculateMonthlyPrice = (price: number, duration: number) => {
//   return formatPrice(price / duration);
// };

// const Subscriptions: React.FC = () => {
//   const {
//     data: histories,
//     error: historyError,
//     loading: historyLoading,
//   } = useFetch<SubscriptionHistory[]>(`/api/subscription-history`);
//   // const {
//   //   data: plans,
//   //   error: planError,
//   //   loading: planLoading,
//   // } = useUnAuthorizedFetch<SubscriptionPlan[]>(`/api/no-auth/plans`);

//   if (historyLoading)
//     return <LoadingComponent item="Subscription Histories" theme="blue" />;
//   if (historyError)
//     return <ErrorComponent item="Subscription Histories" theme="blue" />;

//   if (histories && histories.length === 0)
//     return <NoContentComponent item="Subscription Histories" theme="blue" />;
//   if (histories)
//     return (
//       <div className="space-y-6">
//         <h2 className="text-xl font-semibold">Subscriptions</h2>
//         <div className="space-y-4">
//           {histories.map((history) => (
//             <div key={history.id} className="border rounded-lg p-4">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="font-medium">Plan ID: {history.planId}</h3>
//                   <p className="text-sm text-gray-600">
//                     Active until{" "}
//                     {new Date(history.endDate).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <span className="font-semibold text-blue-600">
//                   ${history.paymentIntentId}
//                 </span>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
//                   Manage Subscription
//                 </button>
//                 <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div className="mt-6">
//             {/* <h3 className="font-medium mb-4">Available Plans</h3> */}
//             {/* <div className="grid md:grid-cols-2 gap-4">
//               {plans &&
//                 plans.map((plan) => (
//                   <div
//                     key={plan.id}
//                     className="border rounded-lg p-4 hover:shadow-md transition-shadow"
//                   >
//                     <h4 className="font-medium mb-2">Plan ID: {plan.id}</h4>
//                     <p className="text-sm text-gray-600 mb-4">
//                       Duration: {plan.duration}{" "}
//                       {plan.duration === 1 ? "month" : "months"}
//                     </p>
//                     <p className="text-sm text-gray-600 mb-4">
//                       Total Price: {formatPrice(plan.price)}
//                     </p>
//                     <p className="text-sm text-gray-600 mb-4">
//                       Monthly Price:{" "}
//                       {calculateMonthlyPrice(plan.price, plan.duration)}
//                     </p>
//                     <button className="w-full bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition-colors">
//                       View Details
//                     </button>
//                   </div>
//                 ))}
//             </div> */}
//           </div>
//         </div>
//       </div>
//     );
// };

// export default Subscriptions;
