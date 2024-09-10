import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAppointment } from "@/context/AppointmentContext";
import SelectedAppointment from "./SelectedAppointment";
import PersonalDetails from "./PersonalDetails";
import PropertyDetails from "./PropertyDetails";

export default function ReviewInfo() {
  const [loading, setLoading] = useState(false);
  const {
    currentStage,
    setCurrentStage,
    contactDetails,
    serviceDetails,
    makeAppointment,
    sendAppointmentConfirmation,
  } = useAppointment();

  const handleClick = async () => {
    setLoading(true);
    try {
      await makeAppointment();
      await sendAppointmentConfirmation();
      setCurrentStage(currentStage + 1);
    } catch {
      console.log("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full md:pl-9 md:pr-9">
      <div className="flex items-center w-full pr-2 pl-2 md:pr-0 md:pl-0 mb-4 md:mb-0">
        <h2 className="w-full md:text-left">
          Please Double Check Your Information
        </h2>
        <button
          type="button"
          className={` bg-teal group hover:bg-darkblue rounded-3xl md:flex items-center justify-between p-1 ml-6 transition-colors hidden ${loading ? "opacity-60" : ""}`}
          onClick={handleClick}
          disabled={loading}
        >
          <p className={` font-extrabold   ${loading ? "" : "mr-2 ml-2"} `}>
            {loading ? "Confirming..." : "Confirm"}
          </p>
          <div className="bg-royalblue group-hover:bg-teal rounded-3xl h-6 w-6 flex items-center justify-center transition-colors">
            {loading ? (
              <div className="loader border-1 h-4 w-4  " />
            ) : (
              <FontAwesomeIcon className="" icon={faArrowUp} />
            )}
          </div>
        </button>
      </div>
      <div className="flex flex-col items-center md:items-start w-full">
        <SelectedAppointment edit={true} />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 w-full pl-4 pr-4 md:pl-0 md:pr-0 mt-4 md:mt-0">
        <div className="flex items-end w-full md:w-64 mb-4 md:mb-0 ">
          <div className=" bg-royalblue/50 w-full md:w-64 md:bg-darkblue md:h-8 rounded-3xl mt-2 flex  md:justify-between p-4 items-center">
            <p className="mr-2">I am the...</p>
            <div>
              <input
                type="radio"
                id="person"
                name="person"
                value={contactDetails.person}
                checked={true}
                readOnly
              />
              <label htmlFor="person"> {contactDetails.person}</label>
            </div>
          </div>
          <p
            className="text-xs border-b h-4 ml-2 cursor-pointer"
            onClick={() => setCurrentStage(2)}
          >
            Edit
          </p>
        </div>
        <div className="flex items-end md:ml-4 w-full ">
          <div className=" w-full bg-royalblue/50 md:bg-darkblue md:h-8 rounded-3xl mt-2 flex flex-row p-4 items-center">
            <p className="mr-2">Service:</p>
            <p>
              {serviceDetails.inspectionType} | ${serviceDetails.quoteAmount}
            </p>
          </div>
          <p
            className="text-xs border-b h-4 ml-2 cursor-pointer"
            onClick={() => setCurrentStage(2)}
          >
            Edit
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center md:items-stretch">
        <PersonalDetails edit={true} />
        <PropertyDetails edit={true} />
      </div>
      <div className="pl-4 pr-4 w-full">
        <button
          type="button"
          className={`w-full h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] justify-center items-center p-1 transition-colors flex md:hidden relative ${loading ? "opacity-60" : ""}`}
          onClick={handleClick}
          disabled={loading}
        >
          <p className={` font-extrabold text-2xl`}>
            {loading ? "Confirming..." : "Confirm"}
          </p>
          <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors absolute right-1">
            {loading ? (
              <div className="loader border-5 border-t-5 h-8 w-8  " />
            ) : (
              <FontAwesomeIcon className="h-8 w-8" icon={faArrowUp} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
