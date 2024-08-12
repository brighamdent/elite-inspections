import AppointmentScheduler from "@/components/appointmentScheduler/AppointmentScheduler";
import DateTimeSelector from "@/components/dateTimeSelector/DateTimeSelector";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center w-full">
      <AppointmentScheduler />
      {/* <DateTimeSelector /> */}
    </div>
  );
}
