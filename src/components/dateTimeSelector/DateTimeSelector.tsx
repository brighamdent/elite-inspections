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
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);
  const [currentMonthAppointments, setCurrentMonthAppointments] = useState<
    CalanderAppointmentType[]
  >([]);
  const [message, setMessage] = useState("");
  const {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    currentStage,
    setCurrentStage,
  } = useAppointment();
  // const formattedDate = `${date.year}-${date.month}-${date.day} ${selectedTime}`;

  const handleSubmit = () => {
    if (date.day && selectedTime) setCurrentStage(currentStage + 1);
    else {
      setMessage("Please Select a Time");
    }
  };

  useEffect(() => {
    const fetchCurrentMonthAppointments = async () => {
      try {
        const response = await fetch(
          `/api/appointments?year=${date.year}&month=${date.month}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch available times");
        }

        const data = await response.json();
        setCurrentMonthAppointments(data); // Assuming `data` is an array of times
      } catch (error) {
        console.error("Error fetching available times:", error);
      }
    };
    fetchCurrentMonthAppointments();
  }, [date]);

  useEffect(() => {
    const getUnavailableTimes = (day: number | null) => {
      const times = currentMonthAppointments
        .filter((appointment: CalanderAppointmentType) => {
          const appointmentDay = parseInt(
            appointment.scheduled_time.slice(8, 10),
            10,
          );
          return appointmentDay === day;
        })
        .map((appointment) => appointment.scheduled_time.slice(11, 16)); // Extracting time part (HH:MM)

      setUnavailableTimes(times);
    };

    getUnavailableTimes(date.day);
  }, [currentMonthAppointments]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center w-screen md:w-full p-4">
        <h2 className="w-full md:w-auto">Select a Date and Time</h2>
        <button
          type="button"
          className="bg-teal group hover:bg-darkblue rounded-3xl items-center justify-between p-1 ml-6 transition-colors hidden md:flex"
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
            className="ml-4"
            onClick={() => setMessage("")}
            icon={faXmark}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row md:bg-royalblue rounded-3xl justify-between">
        <Calendar
          currentMonthAppointments={currentMonthAppointments}
          setDate={setDate}
        />
        <TimeSelector
          date={date}
          unavailableTimes={unavailableTimes}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <div className="pr-4 pl-4 w-full md:hidden">
          <button
            type="button"
            className="w-full h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] justify-center items-center p-1 transition-colors flex md:hidden relative"
            onClick={handleSubmit}
          >
            <p className="font-extrabold text-2xl">Next</p>
            <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors absolute right-1">
              <FontAwesomeIcon className="h-8 w-8" icon={faArrowRight} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
