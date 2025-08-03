import React, { useState, useEffect } from "react";
import { CreditCard, Shield } from "lucide-react";
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
import { api, ENV } from "../../../../configs";
import { getUserProperty } from "../../../../utils/local-user.util";
import { getAxiosErrorMessage } from "../../../../utils";

const stripePromise = loadStripe(ENV.VITE_STRIPE_PK);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { courseId } = useParams();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [, setPaymentStep] = useState("details");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading] = useState<boolean>(false);

  // const [orderSummaryOpen, setOrderSummaryOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const name = getUserProperty("firstName") as string;
  const email = getUserProperty("email") as string;
  const userId = getUserProperty("id") as string;

  const { data: course } = useFetch<PopulatedCourse>(`/courses/${courseId}`);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (course && course.price) {
          // setLoading(true);
          const response = await api.post<{
            clientSecret: string;
            paymentIntentId: string;
          }>("/payment/create-payment-intent", {
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
        const response = await api.post("/purchases", {
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
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error);
      setPaymentError(message);
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
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
