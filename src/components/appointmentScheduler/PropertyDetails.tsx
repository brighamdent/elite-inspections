import React from "react";
import { useAppointment } from "@/context/AppointmentContext";

export default function PropertyDetails({ edit }) {
  const { contactDetails, setCurrentStage } = useAppointment();
  return (
    <div className="flex flex-col items-center md:items-start w-full pr-4 pl-4 md:pr-0 md:pl-0 ">
      <div className="flex w-full items-center justify-center md:justify-start">
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
      <div className="bg-royalblue/50 md:bg-darkblue rounded-3xl w-full p-5 text-left mb-4 space-y-2 md:space-y-0 ">
        <div className="flex flex-col items-start md:items-center md:flex-row">
          <p className="mr-1 text-xs md:text-base">Address:</p>
          <p className="text-xl md:text-[16px]">{contactDetails.address}</p>
        </div>
        <div className="flex flex-col items-start md:items-center md:flex-row">
          <p className="mr-1 text-xs md:text-base">
            Total Finished Square Footage:
          </p>
          <p className="text-xl md:text-[16px]">
            {contactDetails.finishedSqft}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-center md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <div className="flex flex-col items-start md:items-center md:flex-row">
            <p className="mr-1 text-xs md:text-base">Year Built:</p>
            <p className="text-xl md:text-[16px]">{contactDetails.yearBuilt}</p>
          </div>
          <p className="text-teal font-extrabold hidden md:flex"> | </p>
          <div className="flex flex-col items-start md:items-center md:flex-row">
            <p className="mr-1 text-xs md:text-base">Foundation Type:</p>
            <p className="text-xl md:text-[16px]">
              {contactDetails.foundationType}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-center md:flex-row md:space-x-2">
          <div className="flex flex-col items-start md:items-center md:flex-row space-y-2 md:space-y-0">
            <p className="mr-1 text-xs md:text-base">Beds:</p>
            <p className="text-xl md:text-[16px]">{contactDetails.bedCount}</p>
          </div>
          <p className="text-teal font-extrabold hidden md:flex"> | </p>
          <div className="flex flex-col items-start md:items-center md:flex-row">
            <p className="mr-1 text-xs md:text-base">Bath:</p>
            <p className="text-xl md:text-[16px]">{contactDetails.bathCount}</p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-center md:flex-row">
          <p className="mr-1 text-xs md:text-base">Notes:</p>
          <p className="text-xl md:text-[16px]">{contactDetails.notes}</p>
        </div>
      </div>
    </div>
  );
}
