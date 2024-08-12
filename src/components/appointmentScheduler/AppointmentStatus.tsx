"use client";
import React from "react";
import { useAppointment } from "@/context/AppointmentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div className="p-6 flex flex-col items-center">
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
      <div className="flex items-center w-full p-2">
        <h2>{appointmentStages[currentStage - 1].stageDescription}</h2>
        <button
          type="button"
          className="bg-teal rounded-3xl flex items-center justify-between p-1 ml-6"
        >
          <p className="font-extrabold ml-2 mr-2">
            {currentStage !== 3 ? "Next" : "Review Info"}
          </p>
          <div className="bg-royalblue rounded-3xl h-6 w-6 flex items-center justify-center">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </button>
      </div>
    </div>
  );
}