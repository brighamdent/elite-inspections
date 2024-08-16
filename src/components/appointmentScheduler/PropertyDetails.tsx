import React from "react";
import { useAppointment } from "@/context/AppointmentContext";

export default function PropertyDetails() {
  const { contactDetails } = useAppointment();
  return (
    <div>
      <p className="w-full text-left mb-1">Property Details:</p>
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
