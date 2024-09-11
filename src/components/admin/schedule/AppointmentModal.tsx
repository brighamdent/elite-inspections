import AppointmentScheduler from "@/components/appointmentScheduler/AppointmentScheduler";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function AppointmentModal() {
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(!modal);
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="bg-teal rounded-3xl p-2 font-bold min-w-10 min-h-10 md:w-auto flex items-center justify-center "
      >
        <p className="hidden mr-2 lg:block">Schedule Appointment</p>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {modal && (
        <>
          <div
            onClick={handleClick}
            className="fixed left-0 top-0 z-50 h-full w-full bg-black/10 backdrop-blur-sm"
          />
          <div className=" max-h-[80vh] md:max-h-fit overflow-y-scroll md:overflow-y-auto fixed bg-darkblue rounded-3xl md:bg-transparent left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center">
            <AppointmentProvider>
              <AppointmentScheduler />
            </AppointmentProvider>
          </div>
        </>
      )}
    </div>
  );
}
