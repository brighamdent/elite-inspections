import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PersonalDetails from "./PersonalDetails";
import PropertyDetails from "./PropertyDetails";
import SelectedAppointment from "./SelectedAppointment";

export default function AppointmentConfirmation() {
  return (
    <div className="flex flex-col items-center w-full md:pr-9 md:pl-9">
      <div className="flex items-center md:self-start">
        <h2>Appointment Confirmed</h2>
        <div className="bg-teal rounded-3xl h-10 w-10 ml-2 flex items-center justify-center ">
          <FontAwesomeIcon icon={faCheck} className="h-6" />
        </div>
      </div>
      <h3 className=" md:self-start text-center md:text-left md:mr-20 mt-2">
        Your apointment has been confirmed! We sent you an email with all of the
        details.{" "}
      </h3>
      <SelectedAppointment edit={false} />
      <PersonalDetails edit={false} />
      <PropertyDetails edit={false} />
      <p className="md:text-left">
        If you need to change any of your appointment details please give us a
        call at 555-555-555 or email us at businessemail@gmail.com
      </p>
    </div>
  );
}
