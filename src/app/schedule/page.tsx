import AppointmentScheduler from "@/components/appointmentScheduler/AppointmentScheduler";
import DateTimeSelector from "@/components/dateTimeSelector/DateTimeSelector";
import { AppointmentProvider } from "@/context/AppointmentContext";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center w-full">
      <AppointmentProvider>
        <AppointmentScheduler />
      </AppointmentProvider>
    </div>
  );
}
