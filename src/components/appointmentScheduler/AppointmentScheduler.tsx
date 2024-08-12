import React from "react";
import AppointmentStatus from "./AppointmentStatus";
import { AppointmentProvider } from "@/context/AppointmentContext";
import DateTimeSelector from "../dateTimeSelector/DateTimeSelector";

export default function AppointmentScheduler() {
  return (
    <AppointmentProvider>
      <div className=" h-[550px] w-[750px] md:bg-royalblue rounded-3xl mt-20 pt-2 pb-2 flex flex-col items-center">
        <AppointmentStatus />
        <DateTimeSelector />
      </div>
    </AppointmentProvider>
  );
}
