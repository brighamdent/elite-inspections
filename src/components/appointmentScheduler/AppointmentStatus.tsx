"use client";
import React from "react";
import { useAppointment } from "@/context/AppointmentContext";

export default function AppointmentStatus() {
  const { currentStage } = useAppointment();
  const appointmentStages = [
    {
      stageNumber: 1,
      stageName: "Schedule Time",
    },
    {
      stageNumber: 2,
      stageName: "Contact Details",
    },
    {
      stageNumber: 3,
      stageName: "Select Service",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      {appointmentStages.map((stage, index) => (
        <div
          className={` flex items-center p-2 font-bold text-royalblue md:text-darkblue ${currentStage === stage.stageNumber && "text-teal md:text-teal"} `}
          key={index}
        >
          <div
            className={` bg-royalblue md:bg-darkblue text-white h-8 w-8 rounded-3xl flex items-center justify-center mr-2 ${currentStage === stage.stageNumber && "bg-teal md:bg-teal"}`}
          >
            {stage.stageNumber}
          </div>
          <h3 className="mr-2">{stage.stageName}</h3>
          {stage.stageNumber != 3 && (
            <div className="gg-arrow-long-right hidden md:block "></div>
          )}
        </div>
      ))}
    </div>
  );
}
