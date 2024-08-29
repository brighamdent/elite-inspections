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
import firebase from "firebase/compat/app";

export default function BlockTimeSelector({
  handleToggleModal,
}: {
  handleToggleModal: () => void;
}) {
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [currentMonthAppointments, setCurrentMonthAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<DateData>({
    month: null,
    day: null,
    year: null,
    dayOfWeek: null,
    monthName: null,
  });
  const [selectedTime, setSelectedTime] = useState("");

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
    const getUnavailableTimes = (day: number) => {
      const times = currentMonthAppointments
        .filter((appointment) => {
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

  const handleBlockDay = async () => {
    try {
      const user = firebase.auth().currentUser;
      const token = await user?.getIdToken();
      await fetch("/api/blockedDays", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: `${date.year}-${date.month}-${date.day}`,
        }),
      });
      handleToggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlockTime = async () => {};

  const handleClick = () => {
    if (!selectedTime) {
      handleBlockDay();
    } else {
      handleBlockTime();
    }
  };

  return (
    <div className="flex flex-col bg-royalblue w-[750px] p-4">
      <div className="flex items-center w-full p-4">
        <h2 className="w-full md:w-auto">Select a Date and Time</h2>
        <button
          type="button"
          className="bg-teal group hover:bg-darkblue rounded-3xl items-center justify-between p-1 ml-6 transition-colors hidden md:flex"
          onClick={handleClick}
        >
          <p className="font-extrabold ml-2 mr-2">
            {!selectedTime ? "Block Day" : "Block Time"}
          </p>
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
        <button
          type="button"
          className=" w-80 h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] items-center justify-between p-1 ml-6 transition-colors flex md:hidden"
          onClick={handleClick}
        >
          <p className="font-extrabold ml-32 mr-2 text-2xl">Next</p>
          <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors">
            <FontAwesomeIcon className="h-8 w-8" icon={faArrowRight} />
          </div>
        </button>
      </div>
    </div>
  );
}
