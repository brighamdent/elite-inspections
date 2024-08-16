import React, { useEffect } from "react";
import { useAppointment } from "@/context/AppointmentContext";
import convertTo12Hour from "@/utils/convertTo12Hour";

export default function SelectedAppointment({ edit }) {
  const { date, selectedTime, setCurrentStage } = useAppointment();
  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <div>
      <div className="flex w-full items-center justify-start">
        <p className="text-left mt-4 mb-2">
          Scheduled for: {date.dayOfWeek}, {date.monthName} {date.day},{" "}
          {date.year} {selectedTime ? convertTo12Hour(selectedTime) : " "}{" "}
        </p>
        {edit && (
          <p
            className="text-xs border-b h-4 ml-2 mt-2 cursor-pointer"
            onClick={() => setCurrentStage(1)}
          >
            Edit
          </p>
        )}
      </div>
    </div>
  );
}
