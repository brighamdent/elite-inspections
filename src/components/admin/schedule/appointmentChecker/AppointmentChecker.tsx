"use client";
import React, { useState } from "react";
import AppointmentCalendar from "./AppointmentCalendar";
import SelectedDayAppointments from "./SelectedDayAppointments";
import { useAdminData } from "@/context/AdminDataContext";

export default function AppointmentChecker() {
  return (
    <div className="flex flex-col lg:h-full ">
      <p className="font-bold lg:hidden">See other Appointments</p>
      <AppointmentCalendar />
      <SelectedDayAppointments />
    </div>
  );
}
