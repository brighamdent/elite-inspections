import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PersonalDetails from "./PersonalDetails";
import PropertyDetails from "./PropertyDetails";
import SelectedAppointment from "./SelectedAppointment";

export default function AppointmentConfirmation() {
  return (
    <div className="flex flex-col w-full pr-9 pl-9">
      <div className="flex items-center self-start">
        <h2>Appointment Confirmed</h2>
        <div className="bg-teal rounded-3xl h-10 w-10 ml-2 flex items-center justify-center ">
          <FontAwesomeIcon icon={faCheck} className="h-6" />
        </div>
      </div>
      <h3 className="self-start text-left mr-20 mt-2">
        Your apointment has been confirmed! We sent you an email with all of the
        details.{" "}
      </h3>
      <SelectedAppointment edit={false} />
      <PersonalDetails edit={false} />
      <PropertyDetails edit={false} />
      <p className="text-left">
        If you need to change any of your appointment details please give us a
        call at 555-555-555 or email us at businessemail@gmail.com
      </p>
    </div>
  );
}
