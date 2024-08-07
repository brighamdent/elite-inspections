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
  const [selectedMonth, setSelectedMonth] = useState();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(getYear(new Date()), getMonth(new Date())),
  );
  const firstDay = getDay(startOfMonth(currentMonth));
  const lastDay = getDate(endOfMonth(currentMonth));
  const monthFormatted = format(currentMonth, "MMMM");
  const currentYear = currentMonth.getFullYear();

  const nextMonth = () => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1),
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1),
    );
  };
  return (
    <div className="bg-royalblue rounded-3xl p-6 w-[500px] flex flex-col items-center">
      <div className="flex justify-between items-center w-[81%]">
        <h3>
          {monthFormatted} {currentYear}
        </h3>
        <div className="flex items-center h-full text-teal">
          <FontAwesomeIcon icon={faAngleLeft} onClick={prevMonth} />
          <FontAwesomeIcon icon={faAngleRight} onClick={nextMonth} />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 ">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, i) => (
          <div className="text-center text-white" key={i}>
            {day}
          </div>
        ))}
        {Array.from({ length: 42 }).map((_, i) => (
          <div
            className="bg-darkblue rounded-3xl w-12 h-12 flex items-center justify-center"
            key={i}
          >
            {i >= firstDay && i < lastDay + firstDay && (
              <p>{i - firstDay + 1}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
