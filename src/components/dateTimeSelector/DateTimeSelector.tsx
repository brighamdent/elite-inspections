"use client";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import TimeSelector from "./TimeSelector";

export default function DateTimeSelector() {
  const [date, setDate] = useState({
    month: null,
    day: null,
    year: null,
  });
  const [selectedTime, setSelectedTime] = useState();
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
      } else {
        setMessage("Error scheduling appointment");
      }
    } catch (error) {
      setMessage("Error scheduling appointment");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row bg-royalblue rounded-3xl p-6">
        <Calendar setDate={setDate} />
        <TimeSelector
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
