"use client";
import { usePaymentData } from "@/context/PaymentDataContext";
import React from "react";
import PaymentStatus from "./PaymentStatus";
import ServiceSummary from "./ServiceSummary";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function Payment() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );
  const { userData, currentStage } = usePaymentData();
  return (
    <div className="flex flex-col items-center">
      {userData && userData.status == "Awaiting Payment" ? (
        <div className="md:w-[800px] md:bg-royalblue rounded-3xl md:mt-20 pt-6 pb-6 flex flex-col items-center">
          {currentStage < 4 && <PaymentStatus />}
          {currentStage === 1 && <ServiceSummary />}
          {currentStage === 2 && (
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          )}
        </div>
      ) : (
        <div>No user Found</div>
      )}
    </div>
  );
}
