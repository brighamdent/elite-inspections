import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppointment } from "@/context/AppointmentContext";
import SelectedAppointment from "./SelectedAppointment";
import PersonalDetails from "./PersonalDetails";
import PropertyDetails from "./PropertyDetails";

export default function ReviewInfo() {
  const {
    currentStage,
    setCurrentStage,
    contactDetails,
    serviceDetails,
    makeAppointment,
    sendAppointmentConfirmation,
  } = useAppointment();

  const handleClick = async () => {
    try {
      await makeAppointment();
      await sendAppointmentConfirmation();
      setCurrentStage(currentStage + 1);
    } catch {
      console.log("Something went wrong");
    }
  };
  console.log(contactDetails);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center w-full">
        <h2>Please Double Check Your Information</h2>
        <button
          type="button"
          className="bg-teal group hover:bg-darkblue rounded-3xl md:flex items-center justify-between p-1 ml-6 transition-colors hidden "
          onClick={handleClick}
        >
          <p className="font-extrabold ml-2 mr-2">Confirm</p>
          <div className="bg-royalblue group-hover:bg-teal rounded-3xl h-6 w-6 flex items-center justify-center transition-colors">
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
        </button>
      </div>
      <div className="flex flex-col items-center md:items-start w-full">
        <SelectedAppointment edit={true} />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="flex items-end">
          <div className=" bg-darkblue h-8 rounded-3xl mt-2 flex justify-between p-4 items-center">
            <p className="mr-1">I am the...</p>
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
        <div className="flex items-end ml-4">
          <div className=" w-full bg-darkblue md:h-8 rounded-3xl mt-2 flex flex-col md:flex-row justify-between p-4 items-center">
            <p>Service:</p>
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
      <button
        type="button"
        className=" mt-5 w-80 h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] items-center justify-between p-1 transition-colors flex md:hidden"
        onClick={handleClick}
      >
        <p className="font-extrabold ml-24 mr-2 text-2xl">Confirm</p>
        <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors">
          <FontAwesomeIcon className="h-8 w-8" icon={faArrowUp} />
        </div>
      </button>
    </div>
  );
}
