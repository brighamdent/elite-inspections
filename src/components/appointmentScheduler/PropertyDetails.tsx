import React from "react";
import { useAppointment } from "@/context/AppointmentContext";

export default function PropertyDetails({ edit }) {
  const { contactDetails, setCurrentStage } = useAppointment();
  return (
    <div>
      <div className="flex w-full items-center justify-start">
        <p className=" text-left mb-1">Property Details:</p>
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
        <p>Address: {contactDetails.address}</p>
        <p>Total Finished Square Footage: {contactDetails.finishedSqft}</p>
        <div className="flex space-x-2">
          <p>Year Built: {contactDetails.yearBuilt}</p>
          <p className="text-teal font-extrabold"> | </p>
          <p>Foundation Type: {contactDetails.foundationType}</p>
        </div>
        <div className="flex space-x-2">
          <p>Beds: {contactDetails.bedCount}</p>
          <p className="text-teal font-extrabold"> | </p>
          <p>Bath: {contactDetails.bathCount}</p>
        </div>
        <p>Notes: {contactDetails.notes}</p>
      </div>
    </div>
  );
}
