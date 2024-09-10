import React, { useEffect, useState } from "react";
import convertTo12Hour from "@/utils/convertTo12Hour";

export default function TimeSelector({
  date,
  unavailableTimes,
  selectedTime,
  setSelectedTime,
}: TimeSelectorProps) {
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
  const [blockedTimes, setBlockedTimes] = useState<BlockedTimeType[]>([]);

  useEffect(() => {
    const fetchBlockedTimes = async () => {
      const response = await fetch("/api/blockedTimes", {
        method: "GET",
      });

      const data = await response.json();
      setBlockedTimes(data.data);
      console.log(data.data);
    };
    fetchBlockedTimes();
  }, []);

  useEffect(() => {
    // Reset availableTimes to the full availability whenever the date changes
    let updatedAvailableTimes = [...avalability];

    // Filter out unavailableTimes
    const unavailableTimesSet = new Set<string>();

    unavailableTimes.forEach((time) => {
      let [hour, minute] = time.split(":").map(Number);

      for (let i = -3; i <= 3; i++) {
        const adjustedHour = hour + i;
        if (adjustedHour >= 0 && adjustedHour < 24) {
          const formattedTime = `${String(adjustedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
          unavailableTimesSet.add(formattedTime);
        }
      }
    });

    updatedAvailableTimes = updatedAvailableTimes.filter(
      (time) => !unavailableTimesSet.has(time),
    );

    // Filter out blockedTimes based on the selected date
    if (blockedTimes.length > 0) {
      const formattedDate = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;

      const todaysBlockedTimes = blockedTimes
        .filter((time) => time.date === formattedDate)
        .map((time) => time.time);

      updatedAvailableTimes = updatedAvailableTimes.filter(
        (time) => !todaysBlockedTimes.includes(time),
      );
    }

    setAvailableTimes(updatedAvailableTimes);
  }, [date, unavailableTimes, blockedTimes]);

  const handleClick = (time: string) => {
    setSelectedTime(time);
  };
  return (
    <div className=" pt-4 pb-4 md:pb-0 flex flex-col items-center max-h-96 ">
      <p className="text-md mb-2">
        {date.dayOfWeek}, {date.monthName} {date.day}, {date.year}
      </p>
      <div className="max-h-72 overflow-auto flex flex-col items-center w-screen pr-4 pl-4 md:w-full">
        {availableTimes.map((time, i) => (
          <button
            className={`bg-royalblue md:bg-darkblue p-4 w-full  md:w-64 h-12 rounded-2xl flex flex-col items-center justify-center mt-1 mb-1 ${time == selectedTime ? "bg-teal md:bg-teal" : ""}`}
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
