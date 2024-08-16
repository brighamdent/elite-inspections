"use client";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import TimeSelector from "./TimeSelector";
import { useAppointment } from "@/context/AppointmentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSquareCheck,
  faWarning,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function DateTimeSelector() {
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [message, setMessage] = useState("");
  const {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    currentStage,
    setCurrentStage,
  } = useAppointment();
  const formattedDate = `${date.year}-${date.month}-${date.day} ${selectedTime}`;

  const handleSubmit = () => {
    if (date.day && selectedTime) setCurrentStage(currentStage + 1);
    else {
      setMessage("Please Select a Time");
    }
  };

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
      <div className="flex items-center w-full p-4">
        <h2>Select a Date and Time</h2>
        <button
          type="button"
          className="bg-teal group hover:bg-darkblue rounded-3xl flex items-center justify-between p-1 ml-6 transition-colors"
          onClick={handleSubmit}
        >
          <p className="font-extrabold ml-2 mr-2">Next</p>
          <div className="bg-royalblue group-hover:bg-teal rounded-3xl h-6 w-6 flex items-center justify-center transition-colors">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </button>
      </div>
      {message && (
        <div className="flex items-center justify-between bg-yellow-200 text-yellow-500 border border-yellow-500 w-full rounded-md p-4 h-16 mb-5">
          <div className="flex items-center">
            <FontAwesomeIcon className="mr-4" icon={faWarning} />
            <h3>{message}</h3>
          </div>
          <FontAwesomeIcon
            className="ml-4 lg:ml-[600px]"
            onClick={() => setMessage("")}
            icon={faXmark}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row bg-royalblue rounded-3xl justify-between">
        <Calendar setDate={setDate} />
        <TimeSelector
          date={date}
          unavailableTimes={unavailableTimes}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      {/* <button */}
      {/*   type="button" */}
      {/*   onClick={handleClick} */}
      {/*   className="bg-teal rounded-3xl p-2 m-2" */}
      {/* > */}
      {/*   Make Apointment */}
      {/* </button> */}
    </div>
  );
}
