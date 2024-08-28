import React, { useRef, useState } from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { usePaymentData } from "@/context/PaymentDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userData } = usePaymentData();
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const CARDS_ELEMENT_OPTIONS = {
    showIcon: true,
    style: {
      base: {
        color: "white",
        fontSize: window.innerWidth < 768 ? "20px" : "24px",
        fontFamily: '"Inter", sans-serif',
        "::placeholder": {
          color: "#aab7c4",
        },
        iconColor: "#666EE8",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement) as any;

    if (!error) {
      try {
        const response = await fetch("/api/completePayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceId: userData?.service_details_id,
            appointmentId: userData?.appointment_id,
          }),
        });

        const data = await response.json();

        const { error: stripeError } = await stripe.confirmCardPayment(
          data.clientSecret,
          {
            payment_method: {
              card: cardNumberElement,
              billing_details: { name: nameRef.current?.value },
            },
          },
        );

        if (stripeError) {
          setError(
            stripeError.message || "There was an error processing your payment",
          );
          setLoading(false);
          return;
        }
        if (data.success) {
          console.log("Successful payment");
          console.log(response);
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
        setError("There was an error processing your payment");
      }
    } else {
      console.log(error.message);
      setError("There was an error processing your payment");
    }
    setLoading(false);
  };
  return (
    <div className="w-full md:w-11/12 flex flex-col items-center">
      <h2 className="text-xl md:text-[24px] md:self-start p-4">
        Please Complete Payment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-darkblue w-80 md:w-full rounded-3xl p-4 flex flex-col items-center"
      >
        <div className="md:self-start md:pl-4 flex flex-col items-center md:items-start bg-royalblue/50 md:bg-darkblue w-80 rounded-3xl p-2">
          <label className="text-sm md:text-[16px] pb-2 md:pt-2">
            Amount to Pay
          </label>
          <h1>${userData?.service_details.quote_amount}</h1>
        </div>
        <div className="flex items-start flex-col gap-x-2 w-80 md:w-full">
          <label className="text-sm md:text-[16px] m-3 md:m-0 p-2 pl-4">
            Name on Card
          </label>
          <input
            ref={nameRef}
            className=" pl-6 text-[20px] md:text-[24px] w-full bg-royalblue/50 rounded-3xl h-12 flex flex-col justify-center p-4"
          />
        </div>
        <div className="flex items-start flex-col gap-x-2 w-80 md:w-full">
          <label className="text-sm md:text-[16px] m-3 md:m-0 p-2 pl-4">
            Card Number
          </label>
          <div className=" w-full bg-royalblue/50 rounded-3xl h-12 flex flex-col justify-center p-4">
            <CardNumberElement options={CARDS_ELEMENT_OPTIONS} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center w-80 md:w-full">
          <div className="flex items-start flex-col gap-x-2 w-80 md:w-full">
            <label className="text-sm md:text-[16px] m-3 md:m-0 p-2 pl-4">
              Expiration Date
            </label>
            <div className=" w-full bg-royalblue/50 rounded-3xl h-12 flex flex-col justify-center p-4">
              <CardExpiryElement options={CARDS_ELEMENT_OPTIONS} />
            </div>
          </div>
          <div className="flex items-start flex-col gap-x-2 w-80 md:w-full md:pl-4">
            <label className="text-sm md:text-[16px] m-3 md:m-0 p-2 pl-4">
              CVC
            </label>
            <div className=" w-full bg-royalblue/50 rounded-3xl h-12 flex flex-col justify-center p-4">
              <CardCvcElement options={CARDS_ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`w-80 md:w-full h-16 mt-4 md:h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] items-center justify-between p-1 transition-colors flex ${loading ? "opacity-60" : ""}`}
          disabled={loading}
        >
          <p
            className={` font-extrabold  mr-2 md:text-2xl text-[20px] ${loading ? "ml-20" : "ml-4"} `}
          >
            {loading ? "Confirming..." : "Complete Payment and View Inspection"}
          </p>
          <div
            className={` bg-royalblue group-hover:bg-teal rounded-[100px] min-h-12 min-w-12 flex items-center justify-center transition-colors`}
          >
            {loading ? (
              <div className="loader border-5 border-t-5 h-8 w-8  " />
            ) : (
              <FontAwesomeIcon className="h-8 w-8" icon={faArrowUp} />
            )}
          </div>
        </button>
      </form>
    </div>
  );
}
