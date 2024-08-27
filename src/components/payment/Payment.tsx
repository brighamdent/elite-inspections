"use client";
import { usePaymentData } from "@/context/PaymentDataContext";
import React from "react";
import PaymentStatus from "./PaymentStatus";

export default function Payment() {
  const { userData, currentStage } = usePaymentData();
  return (
    <div className="flex flex-col items-center">
      {userData && userData.status == "Awaiting Payment" ? (
        <div className="md:w-[800px] md:bg-royalblue rounded-3xl md:mt-20 pt-6 pb-6 flex flex-col items-center">
          {currentStage < 4 && <PaymentStatus />}
        </div>
      ) : (
        <div>No user Found</div>
      )}
    </div>
  );
}
