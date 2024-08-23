"use client";
import React, { useEffect, useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";

export default function AwaitingInspection() {
  const { pastAppointments } = useAdminData();
  const [appointmentsAwaitingInspection, setAppointmentsAwaitingInspection] =
    useState([]);

  useEffect(() => {
    const filteredAppointments = pastAppointments.filter(
      (pastApp) => pastApp.status === "Awaiting Inspection",
    );
    setAppointmentsAwaitingInspection(filteredAppointments);
  }, [pastAppointments]);

  console.log(appointmentsAwaitingInspection);
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-bold">Awaiting Inspection</h3>
      <div className="flex flex-col items-center lg:bg-darkblue/50 rounded-3xl">
        pastAppointments
      </div>
    </div>
  );
}
