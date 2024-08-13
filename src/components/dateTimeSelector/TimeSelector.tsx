import React, { useEffect, useState } from "react";
import convertTo12Hour from "@/utils/convertTo12Hour";

export default function TimeSelector({
  date,
  unavailableTimes,
  selectedTime,
  setSelectedTime,
}) {
  const avalability = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const [availableTimes, setAvailableTimes] = useState(avalability);

  useEffect(() => {
    console.log(unavailableTimes);
    const unavailableTimesSet = new Set(
      unavailableTimes.map((item) => item.time),
    );
    const newtimes = avalability.filter(
      (time, i) => !unavailableTimesSet.has(time),
    );
    setAvailableTimes(newtimes);
  }, [unavailableTimes]);

  const handleClick = (time: string) => {
    setSelectedTime(time);
  };
  return (
    <div className="bg-royalblue pt-4 flex flex-col items-center h-96 overflow-scroll">
      <p className="text-md mb-2">
        {date.dayOfWeek}, {date.monthName} {date.day}, {date.year}
      </p>
      <div className="h-72 overflow-auto pr-4 pl-4 flex flex-col items-center">
        {availableTimes.map((time, i) => (
          <button
            className={` bg-darkblue p-4 w-64 h-12 rounded-2xl flex flex-col items-center justify-center m-1 ${time == selectedTime ? "bg-teal" : ""}`}
            key={i}
            onClick={() => handleClick(time)}
          >
            <h3 className="font-bold">{convertTo12Hour(time)}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
