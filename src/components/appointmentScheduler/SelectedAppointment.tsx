import React, { useEffect } from "react";
import { useAppointment } from "@/context/AppointmentContext";
import convertTo12Hour from "@/utils/convertTo12Hour";

export default function SelectedAppointment({ edit }: { edit: boolean }) {
  const { date, selectedTime, setCurrentStage } = useAppointment();
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-start w-80 md:w-full">
        <p className="text-left md:mt-4 md:mb-2 text-xs md:text-[16px]">
          Scheduled for: {date.dayOfWeek}, {date.monthName} {date.day},{" "}
          {date.year} {selectedTime ? convertTo12Hour(selectedTime) : " "}{" "}
        </p>
        {edit && (
          <p
            className="text-xs border-b h-4 mr-2 md:mr-0 md:ml-2 mt-2 cursor-pointer self-end"
            onClick={() => setCurrentStage(1)}
          >
            Edit
          </p>
        )}
      </div>
    </div>
  );
}
