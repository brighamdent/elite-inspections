"use client";
import React, { useEffect, useState } from "react";
import { dayFormatting, monthFormatting } from "@/utils/dateUtils";
import convertTo12Hour from "@/utils/convertTo12Hour";
import { useAdminData } from "@/context/AdminDataContext";

export default function SelectedDayAppointments() {
  const { currentMonthAppointments } = useAdminData();
  const [selectedDayAppointments, setSelectedDayAppointments] = useState([]);
  const { date } = useAdminData();

  useEffect(() => {
    const fetchTodaysAppointments = () => {
      const newArr = currentMonthAppointments.filter(
        (curr) =>
          curr.date ===
          `${date.year}-${monthFormatting(date.month)}-${dayFormatting(date.day)}`,
      );
      setSelectedDayAppointments(newArr);
      console.log(newArr);
    };
    fetchTodaysAppointments();
  }, [currentMonthAppointments, date]);

  return (
    <div className=" lg:bg-darkblue/50 p-4 rounded-3xl lg:flex-shrink lg:min-w-[200px] lg:max-w-full h-full">
      <p>
        Appointments for {date.month}/{date.day}/{date.year}
      </p>
      {selectedDayAppointments.length ? (
        <div>
          {selectedDayAppointments.map((a, index) => (
            <div
              className="text-left bg-royalblue/50 lg:flex-shrink w-80 lg:w-auto lg:min-w-[150px] 2xl:min-w-80 lg:max-w-80 rounded-3xl p-4 xl:p-6 m-4 "
              key={index}
            >
              <h2>{convertTo12Hour(a.time)}</h2>
              <div>
                <p>
                  {a.contact.first_name} {a.contact.last_name}
                </p>
                <p>{a.contact.phone_number}</p>
                <p>{a.property.address}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-royalblue/50 rounded-3xl p-4 m-4 lg:flex-shrink w-80 lg:w-auto lg:min-w-[150px] 2xl:min-w-80 lg:max-w-80">
          <div>
            <p>No Appointments to Show</p>
          </div>
        </div>
      )}
    </div>
  );
}