import React, { useEffect } from "react";
import { useAppointment } from "@/context/AppointmentContext";
import convertTo12Hour from "@/utils/convertTo12Hour";

export default function AppointmentTime({
  edit,
  appointment,
  editFunction,
}: {
  edit: boolean;
  appointment: AppointmentType;
  editFunction: () => void;
}) {
  const dateString = appointment.date;
  const date = new Date(dateString);

  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate() + 1;
  const year = date.getFullYear();
  return (
    <div className="w-screen md:w-full pr-4 pl-4 md:pr-0 md:pl-0">
      <div className="flex items-center justify-start w-full md:w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start w-full md:w-auto">
          <p className="text-left md:mt-4 mb-1 md:mr-2">Scheduled for: </p>
          <p className="bg-royalblue/50 pt-4 pb-4 w-full md:w-auto rounded-3xl">
            {dayOfWeek}, {monthName} {day}, {year}{" "}
            {appointment.time ? convertTo12Hour(appointment.time) : " "}{" "}
          </p>
        </div>
        {edit && (
          <p
            className="text-xs border-b h-4  md:mr-0 ml-2 md:mb-4 cursor-pointer self-end"
            onClick={editFunction}
          >
            Edit
          </p>
        )}
      </div>
    </div>
  );
}
