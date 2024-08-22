"use client";
import { formatDate, getCurrentDate } from "@/utils/dateUtils";
import React, { useEffect, useState } from "react";

export default function TodaysAppointments() {
  const currentDate = getCurrentDate();
  // const [todaysAppointments, setTodaysAppointments] = useState();

  useEffect(() => {
    // const response = fetch()
  });

  return (
    <div className="bg-royalblue rounded-3xl w-80">
      <p className="font-bold">
        Today's Appointments {formatDate(currentDate)}
      </p>
    </div>
  );
}
