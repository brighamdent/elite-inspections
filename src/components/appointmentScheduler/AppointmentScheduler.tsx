import React from "react";
import AppointmentStatus from "./AppointmentStatus";
import { AppointmentProvider } from "@/context/AppointmentContext";

export default function AppointmentScheduler() {
  return (
    <AppointmentProvider>
      <div className="h-[600px] w-[750px] md:bg-royalblue rounded-3xl mt-20 flex flex-col items-center">
        <AppointmentStatus />
      </div>
    </AppointmentProvider>
  );
}
