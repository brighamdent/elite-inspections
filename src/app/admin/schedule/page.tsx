import AppointmentCalendar from "@/components/admin/schedule/appointmentChecker/AppointmentCalendar";
import SelectedDayAppointments from "@/components/admin/schedule/appointmentChecker/SelectedDayAppointments";
import TodaysAppointments from "@/components/admin/schedule/TodaysAppointments";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

export default function page() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center lg:items-start space-y-8 lg:space-y-0 lg:flex-row justify-around lg:bg-royalblue lg:h-[700px] rounded-3xl lg:p-4 lg:m-4">
        <TodaysAppointments />
        <AppointmentCalendar />
        <SelectedDayAppointments />
      </div>
    </ProtectedRoute>
  );
}
