"use client";
import React, { useEffect } from "react";
import { useAppointment } from "@/context/AppointmentContext";

export default function AppointmentStatus() {
  const { currentStage } = useAppointment();
  const appointmentStages = [
    {
      stageNumber: 1,
      stageName: "Schedule Time",
      stageDescription: "Select a Date and Time",
    },
    {
      stageNumber: 2,
      stageName: "Contact Details",
      stageDescription: "Please Provide Contact Details",
    },
    {
      stageNumber: 3,
      stageName: "Select Service",
      stageDescription: "Please Provide Contact Details",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStage]);

  return (
    <div className="pb-0 flex flex-col items-center ml-3 sm:ml-0">
      <div className="flex flex-row">
        {appointmentStages.map((stage, index) => (
          <div
            className={` flex items-center p-1 md:p-2 font-bold text-royalblue md:text-darkblue ${currentStage === stage.stageNumber && "text-teal md:text-teal"} `}
            key={index}
          >
            <div
              className={` bg-royalblue md:bg-darkblue text-white min-h-4 min-w-4 md:h-8 md:w-8 text-xs md:text-xl rounded-3xl flex items-center justify-center mr-1 md:mr-2 ${currentStage === stage.stageNumber && "bg-teal md:bg-teal"}`}
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
