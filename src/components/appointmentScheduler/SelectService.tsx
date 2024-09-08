import React, { useEffect, useState } from "react";
import { useAppointment } from "@/context/AppointmentContext";
import convertTo12Hour from "@/utils/convertTo12Hour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropertyDetails from "./PropertyDetails";
import {
  faArrowRight,
  faWarning,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SelectedAppointment from "./SelectedAppointment";

export default function SelectService() {
  const [message, setMessage] = useState("");
  const {
    date,
    selectedTime,
    contactDetails,
    serviceDetails,
    setServiceDetails,
    currentStage,
    setCurrentStage,
  } = useAppointment();

  useEffect(() => {
    const calculateQuote = () => {
      const extraSqft =
        contactDetails.finishedSqft >= 3000
          ? contactDetails.finishedSqft - 3000
          : 0;
      const quoteAmount = extraSqft * 0.13 + 350;
      setServiceDetails({ ...serviceDetails, extraSqft, quoteAmount });
    };
    calculateQuote();
  }, [serviceDetails.inspectionType, contactDetails]);

  const handleSubmit = () => {
    if (serviceDetails.inspectionType) setCurrentStage(currentStage + 1);
    else setMessage("Please Select an Inspection Type");
  };

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    setServiceDetails({ ...serviceDetails, [name]: value });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [message]);

  return (
    <div className="w-full md:pl-9 md:pr-9 pt-4 flex flex-col items-center md:block min-w-[302px]">
      <div className="flex justify-center md:justify-start items-center w-full">
        <h2>Select Service</h2>
        <button
          type="button"
          className="bg-teal group hover:bg-darkblue rounded-3xl hidden md:flex items-center justify-between p-1 ml-6 transition-colors"
          onClick={handleSubmit}
        >
          <p className="font-extrabold ml-2 mr-2">Next</p>
          <div className="bg-royalblue group-hover:bg-teal rounded-3xl h-6 w-6 flex items-center justify-center transition-colors">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </button>
      </div>
      {message && (
        <div className="flex items-center justify-between bg-yellow-200 text-yellow-500 border border-yellow-500 w-full rounded-md p-4 h-16 mb-5">
          <div className="flex items-center">
            <FontAwesomeIcon className="mr-4" icon={faWarning} />
            <h3>{message}</h3>
          </div>
          <FontAwesomeIcon
            className="ml-4"
            onClick={() => setMessage("")}
            icon={faXmark}
          />
        </div>
      )}
      <SelectedAppointment edit={true} />
      <PropertyDetails edit={true} />
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="bg-darkblue rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between p-2 mb-4">
            <p className="md:mr-2 text-sm md:text-[16px] m-3 md:m-0">
              Inspection Type
            </p>
            <select
              className="bg-royalblue/50 rounded-3xl pl-3 md:pl-3 w-full md:w-60 h-10 md:h-6 text-xl md:text-[16px]"
              name="inspectionType"
              value={serviceDetails.inspectionType}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="Elite Home Inspection">
                Elite Home Inspection
              </option>
              <option value="Elite Home Inspection Plus">
                Elite Home Inspection Plus
              </option>
              <option value="Wind Midigation">Wind Midigation</option>
            </select>
          </div>
          <div className="bg-darkblue rounded-3xl p-4 pt-2">
            <p className=" md:mr-2 text-sm md:text-[16px] m-3 md:m-0 w-full text-left">
              Your Quote
            </p>
            <div className="bg-royalblue/50 rounded-3xl">
              <h1>${serviceDetails.quoteAmount!}</h1>
            </div>
          </div>
        </div>
        <div className="bg-darkblue rounded-3xl md:p-4 min-h-[170px] w-full pr-2 pl-2 md:pr-4 md:pl-4 md:w-[270px] flex flex-col justify-between ">
          <div className="pl-2 pr-2">
            <p className="font-bold w-full text-left">Quote Breakdown</p>
            <div className="justify-between flex">
              <p className="text-xs">Elite Home Inspection</p>
              <p className="text-xs">$350.00</p>
            </div>
            {serviceDetails.extraSqft > 0 && (
              <div className="justify-between flex">
                <p className="text-xs">
                  $0.13 x {serviceDetails.extraSqft} extra sq ft
                </p>
                <p className="text-xs">
                  ${(serviceDetails.extraSqft * 0.13).toFixed(2)}
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="bg-teal h-[2px] w-full" />
            <div className="flex justify-between pl-2 pr-2">
              <p className="text-xs">Total:</p>
              <p className="text-xs">
                ${serviceDetails.quoteAmount!.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pr-2 pl-2">
        <button
          type="button"
          className=" mt-5 w-full h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] items-center justify-between p-1 transition-colors flex md:hidden"
          onClick={handleSubmit}
        >
          <p className="font-extrabold ml-20 mr-2 text-2xl">Review Info</p>
          <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors">
            <FontAwesomeIcon className="h-8 w-8" icon={faArrowRight} />
          </div>
        </button>
      </div>
    </div>
  );
}
