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
import { useAdminData } from "@/context/AdminDataContext";

export default function EditTime({
  appointmentId,
  time,
  initialDate,
  setPage,
}: {
  appointmentId: number;
  time: string;
  initialDate: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);
  const [currMonthApp, setCurrMonthApps] = useState<CalanderAppointmentType[]>(
    [],
  );
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<DateData>({
    month: null,
    day: null,
    year: null,
    dayOfWeek: null,
    monthName: null,
  });
  const [selectedTime, setSelectedTime] = useState(time);
  const formattedDate = `${date.year}-${date.month}-${date.day} ${selectedTime}`;
  const { currentMonthAppointments, setCurrentMonthAppointments } =
    useAdminData();

  useEffect(() => {
    const fetchCurrMonthApps = async () => {
      try {
        const response = await fetch(
          `/api/appointments?year=${date.year}&month=${date.month}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch available times");
        }

        const data = await response.json();
        setCurrMonthApps(data); // Assuming `data` is an array of times
      } catch (error) {
        console.error("Error fetching available times:", error);
      }
    };
    fetchCurrMonthApps();
  }, [date]);

  useEffect(() => {
    const getUnavailableTimes = (day: number | null) => {
      const times = currMonthApp
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
  }, [currMonthApp]);

  const updateTime = () => {
    console.log(currentMonthAppointments);
    setCurrentMonthAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.appointment_id == appointmentId
          ? {
              ...appointment,
              date: `${date.year}-${date.month}-${date.day}`,
              time: selectedTime,
            }
          : appointment,
      ),
    );
  };

  useEffect(() => {
    console.log("currApp changed");
    console.log(currentMonthAppointments);
  }, [currentMonthAppointments]);

  const handleSubmit = async () => {
    setMessage("");
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        console.log(formattedDate, appointmentId);
        const token = await user.getIdToken();
        const response = await fetch("/api/updateAppTime", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            formattedDate,
            appointmentId,
          }),
        });
        if (response.ok) {
          setPage("home");
          updateTime();
        }
      } else {
        console.error("No user is currently signed in.");
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center w-screen md:w-full p-4">
        <h2 className="w-full md:w-auto">Edit Date and/or Time</h2>
        <button
          type="button"
          className="bg-teal group hover:bg-darkblue rounded-3xl items-center justify-between p-1 ml-6 transition-colors hidden md:flex"
          onClick={handleSubmit}
        >
          <p className="font-extrabold ml-2 mr-2">Update</p>
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
          currentMonthAppointments={currMonthApp}
          setDate={setDate}
          setSelectedTime={setSelectedTime}
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
            <p className="font-extrabold text-2xl">Update</p>
            <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors absolute right-1">
              <FontAwesomeIcon className="h-8 w-8" icon={faArrowRight} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
