"use client";
import React from "react";
import WeekDays from "./Weekdays";
import BlockTime from "./BlockTime";

export default function Availability() {
  return (
    <div className="h-full flex flex-col md:flex-row items-center">
      <BlockTime />
      <WeekDays />
    </div>
  );
}
