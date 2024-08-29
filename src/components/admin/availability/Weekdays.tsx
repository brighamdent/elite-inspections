import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";

interface DaysOfWeekType {
  id: number;
  day_name: string;
  available: boolean;
}

export default function WeekDays() {
  const [daysOfWeek, setDaysOfWeek] = useState<DaysOfWeekType[] | null>([]);
  useEffect(() => {
    const fetchWeekDays = async () => {
      try {
        const response = await fetch("/api/weekdayAvailability");
        const data = await response.json();
        setDaysOfWeek(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeekDays();
  }, []);

  const handleClick = async (id: number) => {
    try {
      const user = firebase.auth().currentUser;
      const token = await user?.getIdToken();
      await fetch("/api/updateWeekdayAvailability", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
        }),
      });
      setDaysOfWeek(
        daysOfWeek!.map((day) =>
          day.id === id ? { ...day, available: !day.available } : day,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center h-full">
      <h3 className="font-bold">Weekday Availability</h3>
      <div className="flex flex-col items-center lg:bg-darkblue/50 rounded-3xl p-4 h-full overflow-y-scroll">
        {daysOfWeek?.map((day) => (
          <button
            key={day.id}
            onClick={() => handleClick(day.id)}
            className={`  p-2 m-2 rounded-3xl w-80 h-20 flex items-center justify-center ${day.available ? "bg-teal" : "bg-royalblue opacity-50"}`}
          >
            <span className="text-2xl font-bold">{day.day_name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}