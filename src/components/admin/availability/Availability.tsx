"use client";
import React from "react";
import WeekDays from "./Weekdays";
import BlockTime from "./BlockTime";
import BlockTimeList from "./BlockedTimeList";

export default function Availability() {
  return (
    <div className="flex flex-col items-center lg:flex-row justify-center space-x-6 lg:bg-royalblue lg:h-[700px] rounded-3xl lg:p-4 lg:m-4 overflow-x-auto">
      <BlockTimeList />
      <BlockTime />
      <WeekDays />
    </div>
  );
}
