"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faWarning,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { usePaymentData } from "@/context/PaymentDataContext";

export default function ServiceSummary() {
  const [message, setMessage] = useState("");
  const { userData, currentStage, setCurrentStage } = usePaymentData();

  const handleSubmit = () => {
    setCurrentStage(currentStage + 1);
  };

  return (
    <div className="w-full md:pl-9 md:pr-9 pt-4 flex flex-col items-center md:block">
      <div className="flex justify-center md:justify-start items-center w-full mb-4">
        <h2 className="text-xl md:text-[24px]">Review Your Service Summary</h2>
        <button
          type="button"
          className="bg-teal group hover:bg-darkblue rounded-3xl hidden md:flex items-center justify-between p-1 ml-6 transition-colors"
          onClick={handleSubmit}
        >
          <p className="font-extrabold ml-2 mr-2">Proceed to Payment</p>
          <div className="bg-royalblue group-hover:bg-teal rounded-3xl h-6 w-6 flex items-center justify-center transition-colors">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </button>
      </div>
      <h3 className=" md:self-start text-center md:text-left md:mr-20 mt-2 w-80 md:w-auto mb-6">
        Hello {userData?.contact.first_name}, Your inspection is ready to view!
        Please review the summary of your services and complete payment to
        access.
      </h3>
      <p className="text-left mb-2 md:text-[16px]">
        Date of Service: {userData!.date}
      </p>
      <p className="text-left mb-4 text-[16px]">
        Service Address: {userData?.property.address}
      </p>
      {/* <SelectedAppointment edit={true} /> */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="bg-royalblue p-2 md:bg-darkblue rounded-3xl md:p-4 min-h-[170px] w-80 md:w-full md:mr-6 flex flex-col justify-between mb-6 md:mb-0 ">
          <div className="pl-2 pr-2">
            <p className="font-bold w-full text-left">Original Quote</p>
            <div className="justify-between flex">
              <p className="text-xs">Elite Home Inspection</p>
              <p className="text-xs">$350.00</p>
            </div>
            {userData?.service_details.extra_sqft ? (
              <div className="justify-between flex">
                <p className="text-xs">
                  $0.13 x {userData!.service_details.extra_sqft} extra sq ft
                </p>
                <p className="text-xs">
                  ${(userData!.service_details.extra_sqft * 0.13).toFixed(2)}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <div className="bg-teal h-[2px] w-full" />
            <div className="flex justify-between pl-2 pr-2">
              <p className="text-xs">Total:</p>
              <p className="text-xs">
                ${userData?.service_details.quote_amount!}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-royalblue p-2 md:bg-darkblue rounded-3xl md:p-4 min-h-[170px] w-80 md:w-full flex flex-col justify-between ">
          <div className="pl-2 pr-2">
            <p className="font-bold w-full text-left">Completed Serviced</p>
            <div className="justify-between flex">
              <p className="text-xs">Elite Home Inspection</p>
              <p className="text-xs">$350.00</p>
            </div>
            {userData?.service_details.extra_sqft ? (
              <div className="justify-between flex">
                <p className="text-xs">
                  $0.13 x {userData!.service_details.extra_sqft} extra sq ft
                </p>
                <p className="text-xs">
                  ${(userData!.service_details.extra_sqft * 0.13).toFixed(2)}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <div className="bg-teal h-[2px] w-full" />
            <div className="flex justify-between pl-2 pr-2">
              <p className="text-xs">Total:</p>
              <p className="text-xs">
                ${userData?.service_details.quote_amount}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-royalblue p-2 md:bg-darkblue w-80 md:w-full rounded-3xl mt-6">
        <h2>Amount Due: ${userData?.service_details.quote_amount}</h2>
      </div>
      <button
        type="button"
        className=" mt-5 w-80 h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] items-center justify-between p-1 transition-colors flex md:hidden"
        onClick={handleSubmit}
      >
        <p className="font-extrabold ml-4 mr-2 text-2xl">Proceed to Payment</p>
        <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors">
          <FontAwesomeIcon className="h-8 w-8" icon={faArrowRight} />
        </div>
      </button>
    </div>
  );
}
