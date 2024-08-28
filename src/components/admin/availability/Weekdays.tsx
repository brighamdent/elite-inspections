import React from "react";

export default function WeekDays() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="flex flex-col items-center h-full">
      <h3 className="font-bold">Weekday Availability</h3>
      <div className="flex flex-col items-center lg:bg-darkblue/50 rounded-3xl p-4 h-full overflow-y-scroll">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className=" p-2 m-2 rounded-3xl w-80 bg-royalblue/50 h-20 flex items-center justify-center"
          >
            <span className="text-2xl font-bold">{day}</span>
            {/* Add any additional content here, like checkboxes for availability */}
          </div>
        ))}
      </div>
    </div>
  );
}
