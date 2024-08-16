"use client";
import React from "react";
import AppointmentStatus from "./AppointmentStatus";
import { AppointmentProvider } from "@/context/AppointmentContext";
import DateTimeSelector from "../dateTimeSelector/DateTimeSelector";
import ContactDetailsForm from "./ContactDetailsForm";
import { useAppointment } from "@/context/AppointmentContext";
import SelectService from "./SelectService";

export default function AppointmentScheduler() {
  const { currentStage } = useAppointment();
  return (
    <div className="w-[750px] md:bg-royalblue rounded-3xl mt-20 pt-6 pb-6 flex flex-col items-center">
      <AppointmentStatus />
      {currentStage === 1 && <DateTimeSelector />}
      {currentStage === 2 && <ContactDetailsForm />}
      {currentStage === 3 && <SelectService />}
    </div>
  );
}
