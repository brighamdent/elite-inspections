"use client";
import React, { useEffect, useState } from "react";
import { dayFormatting, monthFormatting } from "@/utils/dateUtils";
import convertTo12Hour from "@/utils/convertTo12Hour";
import { useAdminData } from "@/context/AdminDataContext";
import ViewAppointmentModal from "../ViewAppointmentModal";

export default function SelectedDayAppointments() {
  const [selectedDayAppointments, setSelectedDayAppointments] = useState<
    AppointmentType[]
  >([]);
  const { date, pastAppointments, currentMonthAppointments } = useAdminData();

  useEffect(() => {
    const fetchTodaysAppointments = () => {
      const newArr = currentMonthAppointments.filter(
        (curr) =>
          curr.date ===
          `${date.year}-${monthFormatting(date.month)}-${dayFormatting(date.day)}`,
      );
      setSelectedDayAppointments(newArr);
    };
    fetchTodaysAppointments();
  }, [currentMonthAppointments, date, pastAppointments]);

  return (
    <div className="w-full md:w-auto lg:bg-darkblue/50 p-4 rounded-3xl lg:flex-shrink lg:min-w-auto lg:max-w-full h-full">
      <p>
        Appointments for {date.month}/{date.day}/{date.year}
      </p>
      {selectedDayAppointments.length ? (
        <div>
          {selectedDayAppointments.map((a, index) => (
            <ViewAppointmentModal a={a} index={index} key={index} />
          ))}
        </div>
      ) : (
        <div className="bg-royalblue/50 lg:flex-shrink w-full lg:w-auto 2xl:min-w-80 lg:min-w-[150px] lg:max-w-80 rounded-3xl p-4 mb-4 mt-4 text-left xl:p-6">
          <div>
            <p>No Appointments to Show</p>
          </div>
        </div>
      )}
    </div>
  );
}
