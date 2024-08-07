"use client";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  getDay,
  getDate,
  getMonth,
  getYear,
  format,
} from "date-fns";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const firstDay = getDay(startOfMonth(currentDate));
  const lastDay = getDate(endOfMonth(currentDate));
  const monthFormatted = format(currentDate, "MMMM");
  const currentYear = currentDate.getFullYear();
  const currentMonthNumber = currentDate.getMonth() + 1; // Note: This returns 0-based month index (0 for January, 1 for February, etc.)
  const currentDay = currentDate.getDate();
  const [selectedDate, setSelectedDate] = useState({
    month: currentMonthNumber,
    day: currentDay,
    year: currentYear,
  });

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
    });
  };
  return (
    <div className="bg-royalblue rounded-3xl p-6  flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-4 pl-4 pr-4">
        <h3>
          {monthFormatted} {currentYear}
        </h3>
        <div className="flex items-center h-full text-teal">
          <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={prevMonth}
            className="mr-6 h-6"
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            onClick={nextMonth}
            className="h-6"
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 ">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, i) => (
          <div className="text-center text-white text-xs" key={i}>
            {day}
          </div>
        ))}
        {Array.from({ length: 42 }).map((_, i) => (
          <button
            className={`bg-darkblue rounded-3xl w-12 h-12 flex items-center justify-center ${i < firstDay ? "bg-royalblue" : ""} ${i >= lastDay + firstDay ? "hidden" : ""} ${selectedDate.day === i - firstDay + 1 ? "bg-teal" : ""}`}
            key={i}
            disabled={i < firstDay}
            onClick={() => handleDayClick(i - firstDay + 1)}
          >
            {i >= firstDay && i < lastDay + firstDay && (
              <p className="font-bold text-xl">{i - firstDay + 1}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
