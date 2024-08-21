import { useAppointment } from "@/context/AppointmentContext";
import React from "react";

export default function PersonalDetails({ edit }) {
  const { contactDetails, setCurrentStage } = useAppointment();
  return (
    <div>
      <div className="flex w-full items-center md:justify-start justify-center">
        <p className="text-center md:text-left mb-1">Personal Details:</p>
        {edit && (
          <p
            className="text-xs border-b h-4 ml-2 mb-1 cursor-pointer"
            onClick={() => setCurrentStage(2)}
          >
            Edit
          </p>
        )}
      </div>
      <div className="bg-royalblue/50 md:bg-darkblue rounded-3xl w-80 md:w-full p-5 text-left mb-4 ">
        <div className="flex flex-col items-start md:items-center md:flex-row">
          <p className="mr-1 text-xs md:text-base">Name:</p>
          <p className="text-xl md:text-[16px]">
            {contactDetails.firstName} {contactDetails.lastName}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-center md:flex-row">
          <p className="mr-1 text-xs md:text-base">Phone Number:</p>
          <p className="text-xl md:text-[16px]">{contactDetails.phoneNumber}</p>
        </div>
        <div className="flex flex-col items-start md:items-center md:flex-row">
          <p className="mr-1 text-xs md:text-base">Email:</p>
          <p className="text-xl md:text-[16px]">
            {contactDetails.emailAddress}
          </p>
        </div>
      </div>
    </div>
  );
}
