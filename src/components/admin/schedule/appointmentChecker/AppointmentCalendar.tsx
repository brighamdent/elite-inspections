"use client";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, getDay, getDate, format } from "date-fns";
import { useAdminData } from "@/context/AdminDataContext";
import AppointmentModal from "../AppointmentModal";

export default function AppointmentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const firstDay = getDay(startOfMonth(currentDate));
  const lastDay = getDate(endOfMonth(currentDate));
  const monthFormatted = format(currentDate, "MMMM");
  const currentYear = currentDate.getFullYear();
  const currentMonthNumber = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const dayOfWeek = format(currentDate, "EEEE");
  const [selectedDate, setSelectedDate] = useState({
    month: currentMonthNumber,
    day: currentDay,
    year: currentYear,
    dayOfWeek,
    monthName: monthFormatted,
  });
  const [dateSet, setDateSet] = useState(new Set());
  const [dateCountMap, setDateCountMap] = useState<Map<number, number>>(
    new Map(),
  );
  const { currentMonthAppointments, setDate } = useAdminData();

  useEffect(() => {
    const parseDates = () => {
      let newSet = new Set();
      currentMonthAppointments.map((curr, i) => {
        const date = curr.date.slice(-2);
        if (!newSet.has(date)) {
          newSet.add(Number(date));
        }
      });
      setDateSet(newSet);
    };
    parseDates();
  }, [currentMonthAppointments]);

  const nextMonth = () => {
    setCurrentDate(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1),
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1),
    );
  };

  const handleDayClick = (selectedDay: number) => {
    setSelectedDate({
      month: currentMonthNumber,
      day: selectedDay,
      year: currentYear,
      dayOfWeek,
      monthName: monthFormatted,
    });
  };

  useEffect(() => {
    setSelectedDate({
      month: currentMonthNumber,
      day: selectedDate.day,
      year: currentYear,
      dayOfWeek,
      monthName: monthFormatted,
    });
  }, [currentMonthNumber]);
  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const checkForDisabled = (i: number) => {
    let boolean = false;
    if (i < firstDay) {
      boolean = true;
    }
    return boolean;
  };

  return (
    <div className=" rounded-3xl flex flex-col w-screen max-w-96 p-4 lg:max-w-[750px] lg:w-screen items-center">
      <div className="flex justify-between items-center w-full mb-4 lg:pl-4 lg:pr-4">
        <p className="text-lg lg:text-3xl">
          {monthFormatted} {currentYear}
        </p>
        <div className="flex items-center ">
          <button
            onClick={prevMonth}
            className="mr-6 h-6 lg:h-10 text-teal disabled:text-teal/10"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="h-full" />
          </button>
          <button onClick={nextMonth} className=" text-teal mr-6 h-6 lg:h-10">
            <FontAwesomeIcon icon={faAngleRight} className="h-full" />
          </button>
          <AppointmentModal />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 lg:gap-2 w-full md:w-full lg:overflow-y-scroll max-h-[600px]   ">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, i) => (
          <div
            className="text-center text-white text-[10px] xl:text-base w-10 lg:w-16 xl:w-24"
            key={i}
          >
            {day}
          </div>
        ))}
        {Array.from({ length: 42 }).map((_, i) => (
          <button
            className={`rounded-[100px] w-10 h-10 lg:w-16 lg:h-16 xl:h-24 xl:w-24 flex items-center justify-center
            ${i < firstDay ? "bg-transparent" : "bg-royalblue lg:bg-darkblue disabled:bg-royalblue/20 md:disabled:bg-darkblue/50 disabled:text-white/50"}
            ${i >= lastDay + firstDay ? "hidden" : ""}
            ${selectedDate.day === i - firstDay + 1 ? "bg-teal lg:bg-teal" : ""}`}
            key={i}
            disabled={checkForDisabled(i)}
            onClick={() => handleDayClick(i - firstDay + 1)}
          >
            {i >= firstDay && i < lastDay + firstDay && (
              <p
                className={` font-bold text-lg xl:text-xl ${dateSet.has(i - firstDay + 1) && i - firstDay + 1 !== selectedDate.day ? " border-b-2 border-teal" : "text-white"}`}
              >
                {i - firstDay + 1}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
