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
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()) + 1);
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
  const [currentDate, setCurrentDate] = useState(
    new Date(selectedYear, selectedMonth - 1),
  );
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const firstDay = getDay(startOfMonth(currentDate));
  const lastDay = getDate(endOfMonth(currentDate));
  console.log(selectedMonth, selectedYear);
  console.log(format(currentDate, "MMMM"));
  return (
    <div className="bg-royalblue rounded-3xl p-6 w-[500px] flex flex-col items-center">
      <div className="flex justify-between items-center w-[81%]">
        <h3>February 2024</h3>
        <div className="flex items-center h-full text-teal">
          <FontAwesomeIcon icon={faAngleLeft} />
          <FontAwesomeIcon icon={faAngleRight} />
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
