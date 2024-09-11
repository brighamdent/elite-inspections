"use client";
import React, { useEffect, useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import UploadInspectionModalWrapper from "./UploadInspectionModalWrapper";

export default function AwaitingInspection() {
  const { pastAppointments } = useAdminData();
  const [appointmentsAwaitingInspection, setAppointmentsAwaitingInspection] =
    useState<AppointmentType[]>([]);

  useEffect(() => {
    const filteredAppointments = pastAppointments.filter(
      (pastApp) => pastApp.status === "Awaiting Inspection",
    );
    setAppointmentsAwaitingInspection(filteredAppointments);
  }, [pastAppointments]);

  console.log(appointmentsAwaitingInspection);

  return (
    <div className="flex flex-col items-center h-full">
      <h3 className="font-bold">Awaiting Inspection</h3>
      <div className="flex flex-col items-center lg:bg-darkblue/50 rounded-3xl p-4 h-full overflow-y-scroll">
        {appointmentsAwaitingInspection.length > 0 ? (
          appointmentsAwaitingInspection.map((app, index) => (
            <div
              className="rounded-3xl bg-royalblue/50 w-80 p-4 m-2 flex items-center"
              key={index}
            >
              <UploadInspectionModalWrapper appointment={app} />
              <div className="text-left ml-2">
                <p className="text-sm">
                  {app.contact.first_name} {app.contact.last_name}
                </p>
                <p className="text-sm">{app.property.address}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl bg-royalblue/50 w-80 p-4 m-2 flex items-center min-h-20">
            <p>No appointments awaiting inspection at this time</p>
          </div>
        )}
      </div>
    </div>
  );
}
