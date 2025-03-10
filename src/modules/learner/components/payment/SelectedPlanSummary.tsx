// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import api from "../../../../shared/utils/api";
// import { config } from "../../../../shared/configs/config";
// import { SubscriptionPlan } from "../../../../shared/types/SubscriptionPlan";
// import { showToast } from "../../../../shared/utils/toastUtils";
// import { useNavigate } from "react-router-dom";

// // Load Stripe
// const stripePromise = loadStripe(config.VITE_STRIPE_PK);
// interface SelectedPlanSummaryProps {
//   selectedPlan: SubscriptionPlan;
// }

// const SelectedPlanSummary: React.FC<SelectedPlanSummaryProps> = ({
//   selectedPlan,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");
//   const navigate = useNavigate();

//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       try {
//         const response = await api.post("/api/payment/create-payment-intent", {
//           planId: selectedPlan.id,
//           type: "subscription",
//         });
//         setClientSecret(response.data.data.client_secret);
//       } catch (error) {
//         console.error("Failed to create payment intent:", error);
//       }
//     };

//     if (selectedPlan) {
//       createPaymentIntent();
//     }
//   }, [selectedPlan]);

//   const handleCheckout = async () => {
//     setLoading(true);
//     try {
//       if (!stripe || !elements) {
//         console.error("Stripe.js has not loaded yet.");
//         setLoading(false);
//         return;
//       }

//       const user = JSON.parse(localStorage.getItem("data") ?? "{}");

//       const { name, email, id } = user;

//       const cardElement = elements.getElement(CardElement);
//       if (!cardElement) return;

//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: cardElement,
//             billing_details: {
//               name,
//               email,
//             },
//           },
//         }
//       );

//       if (error) {
//         console.error(error.message);
//       } else {
//         console.log("Payment successful:", paymentIntent);
//         // Save purchase details to the backend
//         const response = await api.post("/api/payment/subscription-history", {
//           userId: id, // Replace with actual user ID
//           planId: selectedPlan.id,
//           paymentIntentId: paymentIntent.id,
//           amount: paymentIntent.amount,
//           status: "active",
//           purchaseDate: new Date(),
//         });

//         if (response && response.status === 200) {
//           showToast.success("The payment success");
//           navigate(`/learner/subscription-success/${response.data.data.id}`);
//         } else {
//           showToast.error("The payment failed!, retry again");
//         }
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">
//         Order Summary
//       </h2>
//       <div className="space-y-4">
//         <div className="flex justify-between border-b pb-4">
//           <span className="text-gray-600">Selected Plan</span>
//           <span className="font-medium text-gray-900">
//             {selectedPlan.price}
//           </span>
//         </div>
//         <div className="flex justify-between border-b pb-4">
//           <span className="text-gray-600">Duration</span>
//           <span className="font-medium text-gray-900">
//             {selectedPlan.duration}{" "}
//             {selectedPlan.duration === 1 ? "month" : "months"}
//           </span>
//         </div>
//         <div className="flex justify-between pt-2">
//           <span className="text-gray-600">Total Amount</span>
//           <span className="text-xl font-bold text-blue-600">
//             {new Intl.NumberFormat("en-US", {
//               style: "currency",
//               currency: "USD",
//             }).format(selectedPlan.price)}
//           </span>
//         </div>
//       </div>
//       <div className="mt-6">
//         <CardElement className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//       </div>
//       <button
//         className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
//         onClick={handleCheckout}
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Proceed to Payment"}
//       </button>
//     </div>
//   );
// };

// const WrappedSelectedPlanSummary = (selectedPlan: SubscriptionPlan) => (
//   <Elements stripe={stripePromise}>
//     <SelectedPlanSummary selectedPlan={selectedPlan} />
//   </Elements>
// );

// export default WrappedSelectedPlanSummary;
