import { useAppointment } from "@/context/AppointmentContext";
import React from "react";

export default function PersonalDetails({ edit }) {
  const { contactDetails, setCurrentStage } = useAppointment();
  return (
    <div>
      <div className="flex w-full items-center justify-start">
        <p className=" text-left mb-1">Personal Details:</p>
        {edit && (
          <p
            className="text-xs border-b h-4 ml-2 mb-1 cursor-pointer"
            onClick={() => setCurrentStage(2)}
          >
            Edit
          </p>
        )}
      </div>
      <div className="bg-darkblue rounded-3xl w-full p-5 text-left mb-4 ">
        <p>
          Name: {contactDetails.firstName} {contactDetails.lastName}
        </p>
        <p>Phone Number: {contactDetails.phoneNumber}</p>
        <p>Email: {contactDetails.emailAddress}</p>
      </div>
    </div>
  );
}
