"use client";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import TimeSelector from "./TimeSelector";

export default function DateTimeSelector() {
  const [date, setDate] = useState({
    month: null,
    day: null,
    year: null,
    dayOfWeek: null,
    monthName: null,
  });
  const [selectedTime, setSelectedTime] = useState();
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [message, setMessage] = useState("");
  const formattedDate = `${date.year}-${date.month}-${date.day} ${selectedTime}`;

  const handleClick = async (e) => {
    console.log(formattedDate);
    e.preventDefault();
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formattedDate }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage(result.message);
        setSelectedTime("");
      } else {
        setMessage("Error scheduling appointment");
      }
    } catch (error) {
      setMessage("Error scheduling appointment");
    }
  };

  useEffect(() => {
    const fetchUnavailableTimes = async () => {
      try {
        const day = `${date.year}-${date.month}-${date.day}`;
        const response = await fetch(`/api/appointments?date=${day}`);
        if (!response.ok) {
          throw new Error("Failed to fetch available times");
        }

        const data = await response.json();
        setUnavailableTimes(data); // Assuming `data` is an array of times
      } catch (error) {
        console.error("Error fetching available times:", error);
      }
    };
    fetchUnavailableTimes();
  }, [date]);

  useEffect(() => {
    console.log(unavailableTimes);
  }, [unavailableTimes]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row bg-royalblue rounded-3xl p-6">
        <Calendar setDate={setDate} />
        <TimeSelector
          date={date}
          unavailableTimes={unavailableTimes}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="bg-teal rounded-3xl p-2 m-2"
      >
        Make Apointment
      </button>
    </div>
  );
}
