// import React, { useState, useEffect } from "react";
// import { CreditCard, BookOpen, Clock, Award } from "lucide-react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import api from "../../../../shared/utils/api";
// import { config } from "../../../../shared/configs/config";
// import { Course } from "../../../../shared/types/Course";
// import { useNavigate, useParams } from "react-router-dom";
// import useUnAuthorizedFetch from "../../../../hooks/useUnAuthorizedFetch";
// import { showToast } from "../../../../shared/utils/toastUtils";
// import useFetch from "../../../../hooks/useFetch";

// const stripePromise = loadStripe(config.VITE_STRIPE_PK);

// const CourseCheckout = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const {
//     data: course,
//     loading: courseLoading,
//     error: courseError,
//   } = useFetch<Course>(`/api/courses/${courseId}`);

//   const [loading, setLoading] = useState(false);

//   const [clientSecret, setClientSecret] = useState("");

//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       try {
//         if (course && course.price) {
//           const response = await api.post(
//             "/api/payment/create-payment-intent",
//             {
//               courseId: course.id,
//               type: "course",
//             }
//           );
//           setClientSecret(response.data.data.client_secret);
//         }
//       } catch (error) {
//         console.error("Failed to create payment intent:", error);
//       }
//     };

//     fetchClientSecret();
//   }, [course]);

//   const handleCheckout = async () => {
//     setLoading(true);
//     try {
//       if (!stripe || !elements || !course) {
//         console.error("Stripe.js has not loaded yet.");
//         setLoading(false);
//         return;
//       }

//       const user = JSON.parse(localStorage.getItem("data") ?? "{}");

//       const { name, email } = user;

//       const cardElement = elements.getElement(CardElement);
//       if (!cardElement) return;

//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: cardElement,
//             billing_details: {
//               name: name,
//               email: email,
//             },
//           },
//         }
//       );

//       if (error) {
//         console.error(error.message);
//       } else {
//         console.log("Payment successful:", paymentIntent);
//         const user = JSON.parse(localStorage.getItem("data") ?? "{}");

//         // Save purchase details to the backend
//         const response = await api.post("/api/payment/purchase-history", {
//           userId: user.id,
//           courseId: course.id,
//           paymentIntentId: paymentIntent.id,
//           amount: paymentIntent.amount,
//           status: paymentIntent.status,
//           purchaseDate: new Date(),
//         });

//         if (response && response.status === 200) {
//           showToast.success("The payment success");
//           navigate(`/learner/payment-success/${response.data.data.id}`);
//         }
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (courseLoading) return <div>Loading...</div>;
//   if (courseError || !course) return <div>Error loading course details</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="grid gap-8 md:grid-cols-2">
//           {/* Course Details Card */}
//           <div className="bg-white shadow-lg p-6 rounded-lg">
//             <div className="mb-4">
//               <h1 className="text-2xl font-bold text-gray-900">
//                 {course.title}
//               </h1>
//               <p className="text-gray-600">{course.description}</p>
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3 text-gray-600">
//                 <Clock className="w-5 h-5 text-blue-600" />
//                 <span>{course.duration} Hours</span>
//               </div>
//               <div className="flex items-center space-x-3 text-gray-600">
//                 {/* <BookOpen className="w-5 h-5 text-blue-600" /> */}
//                 {/* <span>{course.level}</span> */}
//               </div>
//               <div className="flex items-center space-x-3 text-gray-600">
//                 <Award className="w-5 h-5 text-blue-600" />
//                 <span>Certificate of Completion</span>
//               </div>
//             </div>
//           </div>

//           {/* Checkout Form Card */}
//           <div className="bg-white shadow-lg p-6 rounded-lg">
//             <div className="mb-4">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Complete Your Purchase
//               </h2>
//               <p className="text-gray-600">
//                 Secure payment processed by Stripe
//               </p>
//             </div>
//             <div className="space-y-4">
//               {/* <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   placeholder="John Doe"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div> */}
//               <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-medium text-gray-900">
//                     Total
//                   </span>
//                   <span className="text-2xl font-bold text-blue-600">
//                     ${course.price}
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <CardElement className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//               </div>
//             </div>
//             <div className="mt-6">
//               <button
//                 onClick={handleCheckout}
//                 disabled={loading}
//                 className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
//               >
//                 <CreditCard className="w-5 h-5" />
//                 <span>{loading ? "Processing..." : "Proceed to Payment"}</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const WrappedCourseCheckout = () => (
//   <Elements stripe={stripePromise}>
//     <CourseCheckout />
//   </Elements>
// );

// export default WrappedCourseCheckout;
