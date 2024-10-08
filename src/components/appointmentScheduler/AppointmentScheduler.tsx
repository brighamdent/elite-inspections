"use client";
import React, { useEffect } from "react";
import AppointmentStatus from "./AppointmentStatus";
import DateTimeSelector from "../dateTimeSelector/DateTimeSelector";
import ContactDetailsForm from "./ContactDetailsForm";
import { useAppointment } from "@/context/AppointmentContext";
import SelectService from "./SelectService";
import ReviewInfo from "./ReviewInfo";
import AppointmentConfirmation from "./AppointmentConfirmation";

export default function AppointmentScheduler() {
  const { currentStage } = useAppointment();
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div className="md:w-[750px] md:bg-royalblue rounded-3xl md:mt-20 md:pt-6 md:pb-6 flex flex-col items-center">
      {currentStage < 4 && <AppointmentStatus />}
      {currentStage === 1 && <DateTimeSelector />}
      {currentStage === 2 && <ContactDetailsForm />}
      {currentStage === 3 && <SelectService />}
      {currentStage === 4 && <ReviewInfo />}
      {currentStage === 5 && <AppointmentConfirmation />}
    </div>
  );
}
