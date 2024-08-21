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
  ];
  const [availableTimes, setAvailableTimes] = useState(avalability);

  useEffect(() => {
    const unavailableTimesSet = new Set<string>();

    unavailableTimes.forEach((time) => {
      let [hour, minute] = time.split(":").map(Number);

      // Add times for 3 hours before, current hour, and 3 hours after
      for (let i = -3; i <= 3; i++) {
        const adjustedHour = hour + i;
        if (adjustedHour >= 0 && adjustedHour < 24) {
          // Ensure the hour is within 0-23
          const formattedTime = `${String(adjustedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
          unavailableTimesSet.add(formattedTime);
        }
      }
    });

    // Filter available times to exclude those in unavailableTimesSet
    const newTimes = avalability.filter(
      (time) => !unavailableTimesSet.has(time),
    );
    setAvailableTimes(newTimes);
  }, [unavailableTimes]);

  const handleClick = (time: string) => {
    setSelectedTime(time);
  };
  return (
    <div className=" pt-4 pb-4 md:pb-0 flex flex-col items-center max-h-96 overflow-scroll">
      <p className="text-md mb-2">
        {date.dayOfWeek}, {date.monthName} {date.day}, {date.year}
      </p>
      <div className="max-h-72 overflow-auto pr-4 pl-4 flex flex-col items-center">
        {availableTimes.map((time, i) => (
          <button
            className={`bg-royalblue md:bg-darkblue p-4 w-80  md:w-64 h-12 rounded-2xl flex flex-col items-center justify-center m-1 ${time == selectedTime ? "bg-teal md:bg-teal" : ""}`}
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
