import {
  faArrowUp,
  faCheck,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function PaymentConfirmation() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {};
  return (
    <div className="flex flex-col items-center md:items-start pl-9 pr-9">
      <div className="flex items-center md:self-start">
        <h2>Thank you for your payment</h2>
        <div className="bg-teal rounded-3xl h-10 w-10 ml-2 flex items-center justify-center ">
          <FontAwesomeIcon icon={faCheck} className="h-6" />
        </div>
      </div>
      <h3 className=" md:self-start text-center md:text-left md:mr-20 mt-2 w-80 md:w-auto">
        Your inspection is ready to view. You will receive an email with the
        inspection attached. You may also download it below!
      </h3>
      <button
        type="button"
        className={`  mt-5 w-80 h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] items-center justify-between p-1 transition-colors flex ${loading ? "opacity-60" : ""}`}
        onClick={handleClick}
        disabled={loading}
      >
        <p
          className={` font-extrabold  mr-2 text-2xl ${loading ? "ml-20" : "ml-24"} `}
        >
          {loading ? "Downloading..." : "Download"}
        </p>
        <div
          className={` bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors`}
        >
          {loading ? (
            <div className="loader border-5 border-t-5 h-8 w-8  " />
          ) : (
            <FontAwesomeIcon className="h-6 w-6" icon={faDownload} />
          )}
        </div>
      </button>
      <div className="bg-darkblue rounded-3xl p-4 mt-6 text-left">
        <p className="mb-4">
          Thank you for choosing Elite Home Inspection Group. We appreciate your
          business and look forward to serving you again in the future.
        </p>
        <p>Best Regards,</p>
        <p>John Howell</p>
        <p>Elite Home Inspection Group</p>
      </div>
    </div>
  );
}
