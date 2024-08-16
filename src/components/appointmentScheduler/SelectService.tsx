import React from "react";
import { useAppointment } from "@/context/AppointmentContext";
import convertTo12Hour from "@/utils/convertTo12Hour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropertyDetails from "./PropertyDetails";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function SelectService() {
  const {
    date,
    selectedTime,
    contactDetails,
    serviceDetails,
    setServiceDetails,
    currentStage,
    setCurrentStage,
  } = useAppointment();

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    setServiceDetails({ ...serviceDetails, [name]: value });
    console.log(serviceDetails.inspectionType);
  };

  return (
    <div className="w-full pl-9 pr-9 pt-4">
      <div className="flex items-center w-full">
        <h2>Select Service</h2>
        <button
          type="button"
          className="bg-teal group hover:bg-darkblue rounded-3xl flex items-center justify-between p-1 ml-6 transition-colors"
          onClick={() => setCurrentStage(currentStage + 1)}
        >
          <p className="font-extrabold ml-2 mr-2">Next</p>
          <div className="bg-royalblue group-hover:bg-teal rounded-3xl h-6 w-6 flex items-center justify-center transition-colors">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </button>
      </div>
      <p className="w-full text-left mt-4 mb-2">
        Scheduled for: {date.dayOfWeek}, {date.monthName} {date.day},{" "}
        {date.year} {convertTo12Hour(selectedTime)}{" "}
      </p>
      <PropertyDetails />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="bg-darkblue rounded-3xl flex justify-between p-4 mb-4">
            <p className="mr-2">Inspection Type</p>
            <select
              className="bg-royalblue/50 rounded-3xl pl-3"
              name="inspectionType"
              onChange={handleChange}
            >
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
            <p className="full text-left ">Your Quote</p>
            <div className="bg-royalblue/50 rounded-3xl">
              <h1>$610</h1>
            </div>
          </div>
        </div>
        <div className="bg-darkblue rounded-3xl p-4 w-[270px] flex flex-col justify-between ">
          <div className="pl-2 pr-2">
            <p className="font-bold">Quote Breakdown</p>
            <div className="justify-between flex">
              <p className="text-xs">Elite Home Inspection</p>
              <p className="text-xs">$350</p>
            </div>
            <div className="justify-between flex">
              <p className="text-xs">$0.13 x 2000 extra sq ft</p>
              <p className="text-xs">$250</p>
            </div>
          </div>
          <div>
            <div className="bg-teal h-[2px] w-full" />
            <div className="flex justify-between pl-2 pr-2">
              <p className="text-xs">Total:</p>
              <p className="text-xs">$610</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
