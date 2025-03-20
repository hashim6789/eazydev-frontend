import React, { useState, useEffect } from "react";
import { CreditCard, Shield, CheckCircle, ArrowLeft, Info } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { PopulatedCourse } from "../../../../types";
import { api, config } from "../../../../configs";
import { getUserProperty } from "../../../../utils/local-user.util";

const stripePromise = loadStripe(config.VITE_STRIPE_PK);

// Custom card style for better UI
const cardElementOptions = {
  // style: {
  //   base: {
  //     fontSize: "16px",
  //     color: "#424770",
  //     "::placeholder": {
  //       color: "#aab7c4",
  //     },
  //     fontFamily: "system-ui, -apple-system, sans-serif",
  //   },
  //   invalid: {
  //     color: "#9e2146",
  //     iconColor: "#9e2146",
  //   },
  // },
  hidePostalCode: true,
};

// const CourseCheckout = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const {
//     data: course,
//     loading: courseLoading,
//     error: courseError,
//   } = useFetch<PopulatedCourse>(`/api/courses/${courseId}`);

//   const [loading, setLoading] = useState<boolean>(false);
//   const [processingPayment, setProcessingPayment] = useState<boolean>(false);
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [paymentError, setPaymentError] = useState<string | null>(null);
//   const [paymentStep, setPaymentStep] = useState<
//     "details" | "processing" | "success"
//   >("details"); // details, processing, success
//   const [orderSummaryOpen, setOrderSummaryOpen] = useState<boolean>(false);

//   const stripe = useStripe();
//   const elements = useElements();

//   const name = getUserProperty("firstName") as string;
//   const email = getUserProperty("email") as string;
//   const userId = getUserProperty("id") as string;

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       try {
//         if (course && course.price) {
//           setLoading(true);
//           const response = await api.post<{
//             clientSecret: string;
//             paymentIntentId: string;
//           }>("/api/payment/create-payment-intent", {
//             courseId,
//             type: "course",
//           });
//           setClientSecret(response.data.clientSecret);
//         }
//       } catch (error) {
//         console.error("Failed to create payment intent:", error);
//         setPaymentError(
//           "Unable to initialize payment. Please try again later."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (course) {
//       fetchClientSecret();
//     }
//   }, [course]);

//   const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements || !course) {
//       setPaymentError("Payment system is not ready.  Please try again.");
//       return;
//     }

//     setProcessingPayment(true);
//     setPaymentError("");
//     setPaymentStep("processing");

//     try {
//       const cardElement = elements.getElement(CardElement);
//       console.log("Stripe instance:", stripe);
//       console.log("Elements instance:", elements);
//       console.log("CardElement:", elements.getElement(CardElement));
//       console.log("Client Secret:", clientSecret);
//       // if (!cardElement) {
//       //   console.error("CardElement is not mounted yet.");
//       //   setPaymentError(
//       //     "Payment system is not ready. Please refresh and try again."
//       //   );
//       //   return;
//       // }
//       if (!cardElement || !clientSecret) {
//         throw new Error("Card element not found");
//       }

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
//         setPaymentError(error.message || "Payment failed. Please try again.");
//         setPaymentStep("details");
//         console.log("object", cardElement);
//       } else if (paymentIntent.status === "succeeded") {
//         // Save purchase details to the backend
//         const response = await api.post("/api/payment/purchase-history", {
//           userId,
//           courseId: course.id,
//           mentorId: course.mentor.id,
//           paymentIntentId: paymentIntent.id,
//           amount: paymentIntent.amount,
//           status: paymentIntent.status,
//           purchaseDate: new Date(),
//         });

//         if (response && response.status === 200) {
//           setPaymentStep("success");
//           setTimeout(() => {
//             navigate(`/learner/payment-success/${response.data.data.id}`);
//           }, 2000);
//         } else {
//           throw new Error("Failed to record purchase");
//         }
//       } else {
//         setPaymentError("Payment processing error. Please try again.");
//         setPaymentStep("details");
//       }
//     } catch (error: any) {
//       console.error("Checkout error:", error);
//       setPaymentError(
//         error.message || "An unexpected error occurred. Please try again."
//       );
//       setPaymentStep("details");
//     } finally {
//       setProcessingPayment(false);
//     }
//   };

//   if (courseLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-600">Loading checkout...</p>
//         </div>
//       </div>
//     );
//   }

//   if (courseError || !course) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
//           <div className="text-red-500 mb-4">
//             <Info size={48} className="mx-auto" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Error Loading Course
//           </h2>
//           <p className="text-gray-600 mb-4">
//             We couldn't load the course details. Please try again later.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const renderPaymentStatus = () => {
//     switch (paymentStep) {
//       case "processing":
//         return (
//           <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Processing Payment
//             </h2>
//             <p className="text-gray-600">
//               Please wait while we process your payment. Do not refresh or close
//               this page.
//             </p>
//           </div>
//         );
//       case "success":
//         return (
//           <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
//             <div className="text-green-500 mb-4">
//               <CheckCircle size={64} className="mx-auto" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Payment Successful!
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Thank you for your purchase. You will be redirected to your course
//               momentarily.
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div className="bg-green-500 h-2 rounded-full animate-pulse"></div>
//             </div>
//           </div>
//         );
//       default:
//         return (
//           <div className="grid gap-8 lg:grid-cols-7">
//             {/* Course Details and Checkout Form (5 columns) */}
//             <div className="lg:col-span-5 space-y-6">
//               {/* Breadcrumb */}
//               <div className="mb-6">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="flex items-center text-blue-600 hover:text-blue-800"
//                 >
//                   <ArrowLeft className="w-4 h-4 mr-1" />
//                   <span>Back to course</span>
//                 </button>
//               </div>

//               {/* Main Form */}
//               <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                 <div className="p-6">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                     Checkout
//                   </h2>

//                   {/* Course Title and Image */}
//                   <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
//                     {course.thumbnail ? (
//                       <img
//                         src={course.thumbnail}
//                         alt={course.title}
//                         className="w-20 h-20 object-cover rounded-md"
//                       />
//                     ) : (
//                       <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
//                         <span className="text-gray-500">No image</span>
//                       </div>
//                     )}
//                     <div>
//                       <h3 className="font-semibold text-lg">{course.title}</h3>
//                       <p className="text-gray-600">
//                         {course.mentor.firstName || "Instructor"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Payment Form */}
//                   <form onSubmit={handleCheckout}>
//                     <div className="space-y-6">
//                       {/* Customer Info */}
//                       <div>
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           Your Information
//                         </h3>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="col-span-2 md:col-span-1">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Full Name
//                             </label>
//                             <input
//                               type="text"
//                               defaultValue={name || ""}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               disabled
//                             />
//                           </div>
//                           <div className="col-span-2 md:col-span-1">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Email
//                             </label>
//                             <input
//                               type="email"
//                               defaultValue={email || ""}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               disabled
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Payment Method */}
//                       <div>
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           Payment Method
//                         </h3>
//                         <div className="border border-gray-300 rounded-md p-4">
//                           <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Card Information
//                             </label>
//                             <div className="border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
//                               <CardElement options={cardElementOptions} />
//                             </div>
//                           </div>
//                         </div>
//                         {paymentError && (
//                           <div className="mt-2 text-sm text-red-600">
//                             {paymentError}
//                           </div>
//                         )}
//                       </div>

//                       {/* Secure Payment Note */}
//                       <div className="flex items-center space-x-2 text-sm text-gray-600">
//                         <Shield className="w-4 h-4 text-green-600" />
//                         <span>Your payment info is secure and encrypted</span>
//                       </div>

//                       {/* Order Summary Toggle on Mobile */}
//                       <button
//                         type="button"
//                         className="w-full py-3 flex justify-between items-center text-left border-t border-b border-gray-200 lg:hidden"
//                         onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
//                       >
//                         <span className="font-medium">Order Summary</span>
//                         <span className="font-bold">${course.price}</span>
//                       </button>

//                       {/* Submit Button */}
//                       <button
//                         type="submit"
//                         disabled={!stripe || loading || processingPayment}
//                         className={`w-full py-4 text-white rounded-lg flex items-center justify-center space-x-2 ${
//                           !stripe || loading || processingPayment
//                             ? "bg-blue-400 cursor-not-allowed"
//                             : "bg-blue-600 hover:bg-blue-700"
//                         }`}
//                       >
//                         <CreditCard className="w-5 h-5" />
//                         <span>
//                           {processingPayment
//                             ? "Processing..."
//                             : `Pay $${course.price}`}
//                         </span>
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary (2 columns) - Fixed on Desktop */}
//             <div
//               className={`lg:col-span-2 ${
//                 orderSummaryOpen ? "block" : "hidden lg:block"
//               }`}
//             >
//               <div className="bg-white shadow-lg rounded-lg p-6 sticky top-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Order Summary
//                 </h3>

//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Course Price</span>
//                     <span>${course.price}</span>
//                   </div>

//                   {/* {course.discount > 0 && (
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Discount</span>
//                       <span className="text-green-600">
//                         -${course.discount}
//                       </span>
//                     </div>
//                   )} */}
//                 </div>

//                 <div className="border-t border-gray-200 pt-4 mb-6">
//                   <div className="flex justify-between font-medium">
//                     <span>Total</span>
//                     {/* <span className="text-lg">
//                       ${course.price - (course.discount || 0)}
//                     </span> */}
//                     <span className="text-lg">${course.price}</span>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-gray-600">
//                       Full lifetime access to course content
//                     </span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-gray-600">
//                       Certificate of completion
//                     </span>
//                   </div>
//                   {/* <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-gray-600">
//                       30-day money-back guarantee
//                     </span>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Page Header */}
//         {paymentStep === "details" && (
//           <header className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">
//               Complete Your Purchase
//             </h1>
//             <p className="mt-2 text-lg text-gray-600">
//               You're just one step away from accessing {course.title}
//             </p>
//           </header>
//         )}

//         {/* Main Content */}
//         {renderPaymentStatus()}
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

// import React, { useEffect, useState } from "react";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import useFetch from "../../../../hooks/useFetch";
// import { PopulatedCourse } from "../../../../types";
// import { useParams } from "react-router-dom";
// import { api, config } from "../../../../configs";

// const stripePromise = loadStripe(config.VITE_STRIPE_PK); // Replace with your Stripe publishable key

const CheckoutForm = ({}: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const { courseId } = useParams();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentStep, setPaymentStep] = useState("details");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [orderSummaryOpen, setOrderSummaryOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const name = getUserProperty("firstName") as string;
  const email = getUserProperty("email") as string;
  const userId = getUserProperty("id") as string;

  const { data: course } = useFetch<PopulatedCourse>(
    `/api/courses/${courseId}`
  );

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (course && course.price) {
          // setLoading(true);
          const response = await api.post<{
            clientSecret: string;
            paymentIntentId: string;
          }>("/api/payment/create-payment-intent", {
            courseId,
            type: "course",
          });
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error("Failed to create payment intent:", error);
        setPaymentError(
          "Unable to initialize payment. Please try again later."
        );
      } finally {
        // setLoading(false);
      }
    };

    if (course) {
      fetchClientSecret();
    }
  }, [course]);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !course) {
      setPaymentError("Payment system is not ready. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setPaymentError(
        "Payment details are missing. Please refresh and try again."
      );
      return;
    }

    setProcessingPayment(true);
    setPaymentError("");

    if (!clientSecret) {
      setPaymentError(
        "no clientSecret Payment details are missing. Please refresh and try again."
      );
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "John Doe", // Replace with dynamic user info
              email: "johndoe@example.com", // Replace with dynamic user info
            },
          },
        }
      );

      if (error) {
        setPaymentError(error.message || "Payment failed. Please try again.");
        setPaymentStep("details");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment succeeded", paymentIntent);
        // Save purchase details to the backend
        const response = await api.post("/api/purchases", {
          learnerId: userId,
          courseId: course.id,
          mentorId: course.mentor.id,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
          purchaseDate: new Date(),
        });

        if (response && response.status === 201) {
          setPaymentStep("success");
          setTimeout(() => {
            navigate(`/learner/purchase-success/${response.data.id}`);
          }, 2000);
        } else {
          throw new Error("Failed to record purchase");
        } // Add logic to save the purchase or navigate to a success page
      }
    } catch (error: any) {
      setPaymentError(
        error.response.data.error ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    // <form onSubmit={handleCheckout}>
    //   <h2>Checkout for {course?.title}</h2>
    //   <p>Price: ₹{course?.price}</p>
    //   <div>
    //     <CardElement />
    //   </div>
    //   {paymentError && <p style={{ color: "red" }}>{paymentError}</p>}
    //   <button
    //     type="submit"
    //     disabled={processingPayment || !stripe || !elements}
    //   >
    //     {processingPayment ? "Processing..." : "Pay Now"}
    //   </button>
    // </form>

    <form onSubmit={handleCheckout}>
      <div className="space-y-6">
        {/* Customer Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Your Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={name || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={email || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Payment Method
          </h3>
          <div className="border border-gray-300 rounded-md p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Information
              </label>
              <div className="border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                {/* <CardElement options={cardElementOptions} /> */}
                <CardElement />
              </div>
            </div>
          </div>
          {paymentError && (
            <div className="mt-2 text-sm text-red-600">{paymentError}</div>
          )}
        </div>

        {/* Secure Payment Note */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Your payment info is secure and encrypted</span>
        </div>

        {/* Order Summary Toggle on Mobile */}
        <button
          type="button"
          className="w-full py-3 flex justify-between items-center text-left border-t border-b border-gray-200 lg:hidden"
          // onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
        >
          <span className="font-medium">Order Summary</span>
          <span className="font-bold">${course?.price}</span>
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || loading || processingPayment}
          className={`w-full py-4 text-white rounded-lg flex items-center justify-center space-x-2 ${
            !stripe || loading || processingPayment
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span>
            {processingPayment ? "Processing..." : `Pay $${course?.price}`}
          </span>
        </button>
      </div>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
      {/* <CourseCheckout /> */}
    </Elements>
  );
};

export default CheckoutPage;
