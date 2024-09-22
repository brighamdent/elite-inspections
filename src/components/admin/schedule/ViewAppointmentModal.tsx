import convertTo12Hour from "@/utils/convertTo12Hour";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";
import AdminPropertyDetails from "./AdminPropertyDetails";
import AdminContactDetails from "./AdminContactDetails";
import QuoteBreakdown from "../QuoteBreakdown";
import Quote from "../Quote";
import AppointmentTime from "../AppointmentTime";

export default function ViewAppointmentModal({
  a,
  index,
}: {
  a: AppointmentType;
  index: Number;
}) {
  const [modal, setModal] = useState(false);

  const handleToggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div
        className="text-left bg-royalblue/50 lg:flex-shrink w-80 lg:w-auto lg:min-w-[150px] 2xl:min-w-80 lg:max-w-80 rounded-3xl p-4 xl:p-6 m-4 "
        key={index.toString()}
        onClick={handleToggleModal}
      >
        <h2>{convertTo12Hour(a.time)}</h2>
        <div>
          <p>
            {a.contact.first_name} {a.contact.last_name}
          </p>
          <p>{a.contact.phone_number}</p>
          <p>{a.property.address}</p>
        </div>
      </div>
      {modal && (
        <>
          <div
            onClick={handleToggleModal}
            className="fixed left-0 top-0 z-50 h-full w-full bg-black/10 backdrop-blur-sm"
          />
          <div className="max-h-[80vh] md:max-h-fit overflow-y-scroll md:overflow-y-auto fixed bg-darkblue rounded-3xl md:bg-transparent left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center">
            <div className="md:w-[750px] md:bg-royalblue rounded-3xl md:mt-20 p-6 flex flex-col items-center">
              <div className="flex flex-col md:flex-row md:justify-start w-full">
                <h1 className="w-full">
                  {a.contact.first_name} {a.contact.last_name}
                </h1>
                <AppointmentTime edit={true} appointment={a} />
              </div>
              <AdminContactDetails edit={true} contactDetails={a.contact} />
              <AdminPropertyDetails edit={true} propertyDetails={a.property} />
              <div className="md:flex items-center w-full">
                <Quote serviceDetails={a.service_details} />
                <QuoteBreakdown serviceDetails={a.service_details} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}