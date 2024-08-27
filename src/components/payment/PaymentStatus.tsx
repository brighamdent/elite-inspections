"use client";
import React, { useEffect } from "react";
import { usePaymentData } from "@/context/PaymentDataContext";

export default function PaymentStatus() {
  const { currentStage } = usePaymentData();
  const appointmentStages = [
    {
      stageNumber: 1,
      stageName: "Service Summary",
      stageDescription: "Review Your Service Summary",
    },
    {
      stageNumber: 2,
      stageName: "Complete Payment",
      stageDescription: "Complete Payment",
    },
    {
      stageNumber: 3,
      stageName: "View Inspection",
      stageDescription: "Thank you for your payment!",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStage]);

  return (
    <div className="pb-0 flex flex-col items-center">
      <div className="flex flex-row">
        {appointmentStages.map((stage, index) => (
          <div
            className={` flex items-center p-2 font-bold text-royalblue md:text-darkblue ${currentStage === stage.stageNumber && "text-teal md:text-teal"} `}
            key={index}
          >
            <div
              className={` bg-royalblue md:bg-darkblue text-white h-4 w-4 md:h-8 md:w-8 text-xs md:text-xl rounded-3xl flex items-center justify-center mr-1 md:mr-2 ${currentStage === stage.stageNumber && "bg-teal md:bg-teal"}`}
            >
              {stage.stageNumber}
            </div>
            <h3 className=" md:mr-2 text-xs md:text-[20px]">
              {stage.stageName}
            </h3>
            {stage.stageNumber != 3 && (
              <div className="gg-arrow-long-right hidden md:block "></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
