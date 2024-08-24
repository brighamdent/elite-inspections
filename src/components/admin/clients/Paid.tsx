"use client";
import React, { useEffect, useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Paid() {
  const { pastAppointments } = useAdminData();
  const [appointmentsPaid, setAppointmentsPaid] = useState<AppointmentType[]>(
    [],
  );

  useEffect(() => {
    const filteredAppointments = pastAppointments.filter(
      (pastApp) => pastApp.status === "Paid",
    );
    setAppointmentsPaid(filteredAppointments);
  }, [pastAppointments]);

  console.log(appointmentsPaid);

  return (
    <div className="flex flex-col items-center h-full">
      <h3 className="font-bold">Paid</h3>
      <div className="flex flex-col items-center lg:bg-darkblue/50 rounded-3xl p-4 h-full">
        {appointmentsPaid.length > 0 ? (
          appointmentsPaid.map((app, index) => (
            <div
              className="rounded-3xl bg-royalblue/50 w-80 p-4 m-2 flex items-center"
              key={index}
            >
              <FontAwesomeIcon icon={faUser} />
              <div className="text-left ml-2">
                <p className="text-sm">
                  {app.contact.first_name} {app.contact.last_name}
                </p>
                <p className="text-sm">{app.property.address}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl bg-royalblue/50 w-80 p-4 m-2 flex items-center">
            <p>No appointments paid at this time</p>
          </div>
        )}
      </div>
    </div>
  );
}
