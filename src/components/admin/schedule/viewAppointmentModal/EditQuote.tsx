import React, { useEffect, useState } from "react";
import { useAppointment } from "@/context/AppointmentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faWarning,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function EditQuote({
  appointment,
}: {
  appointment: AppointmentType;
}) {
  const [message, setMessage] = useState("");
  const [serviceDetails, setServiceDetails] = useState(
    appointment.service_details,
  );
  const [propertyDetails, setPropertyDetails] = useState(appointment.property);

  const baseInpection =
    serviceDetails.inspection_type === "Elite Home Inspection"
      ? 350
      : serviceDetails.inspection_type === "Pool Inspection"
        ? 100
        : serviceDetails.inspection_type === "Wind Mitigation"
          ? 149
          : serviceDetails.inspection_type === "4 Point Inspection"
            ? 149
            : 0;

  useEffect(() => {
    const calculateQuote = () => {
      const extraSqft =
        serviceDetails.inspection_type !== "Elite Home Inspection"
          ? 0
          : Number(propertyDetails.total_finished_square_feet!) >= 2500
            ? Number(propertyDetails.total_finished_square_feet!) - 2500
            : 0;
      const poolAmount = serviceDetails.pool_inspection === true ? 50 : 0;
      const midigationAmount = serviceDetails.wind_mitigation === true ? 50 : 0;
      const fourPointInspection =
        serviceDetails.four_point_inspection === true ? 50 : 0;
      const quoteAmount =
        extraSqft * 0.1 +
        baseInpection +
        poolAmount +
        midigationAmount +
        fourPointInspection;
      setServiceDetails((prev) => ({
        ...prev,
        extra_sqft: extraSqft,
        quote_amount: quoteAmount,
      }));
    };

    calculateQuote();
  }, [
    serviceDetails.inspection_type,
    serviceDetails.pool_inspection,
    serviceDetails.wind_mitigation,
    serviceDetails.four_point_inspection,
    propertyDetails,
  ]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    if (name === "inspectionType" && value !== "Elite Home Inpection") {
      setServiceDetails({
        ...serviceDetails,
        [name]: value,
        poolInspection: false,
        windMitigation: false,
        fourPointInspection: false,
      });
    } else setServiceDetails({ ...serviceDetails, [name]: value });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [message]);

  return (
    <form
      className="w-screen md:w-full md:pl-9 md:pr-9 pt-4 flex flex-col items-center md:block min-w-[302px]"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center md:justify-start items-center w-full">
        <h2>Select Service</h2>
        <button
          type="submit"
          className="bg-teal group hover:bg-darkblue rounded-3xl hidden md:flex items-center justify-between p-1 ml-6 transition-colors"
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
      <div className="w-full pr-4 pl-4 md:pr-0 md:pl-0">
        <div className="w-full md:w-max bg-darkblue rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between md:p-3 mb-4">
          <p className="md:mr-2 text-sm md:text-[16px] m-3 md:m-0">
            Inspection Type
          </p>
          <select
            className="bg-royalblue/50 rounded-3xl pl-3 w-full md:w-60 h-10 md:h-6 text-xl md:text-[16px]"
            name="inspectionType"
            value={serviceDetails.inspection_type}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Elite Home Inspection">Elite Home Inspection</option>
            <option value="Wind Mitigation">Wind Mitigation</option>
            <option value="Pool Inspection">Pool Inspection</option>
            <option value="4 Point Inspection">4 Point Inspection</option>
          </select>
        </div>
        <div
          className={` w-full md:w-max bg-darkblue rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between md:p-3 mb-4 ${serviceDetails.inspection_type !== "Elite Home Inspection" ? "hidden md:opacity-50" : ""}`}
        >
          <p className="md:mr-2 text-sm md:text-[16px] m-3 md:m-0">
            Would you like to add on a pool inspection?
          </p>
          <select
            className="bg-royalblue/50 rounded-3xl pl-3 w-full md:w-max h-10 md:h-6 text-xl md:text-[16px]"
            name="poolInspection"
            value={serviceDetails.pool_inspection ? "true" : "false"}
            onChange={handleChange}
            required={
              serviceDetails.inspection_type === "Elite Home Inspection"
                ? true
                : false
            }
            disabled={
              serviceDetails.inspection_type !== "Elite Home Inspection"
            }
          >
            <option value=""></option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div
          className={` w-full md:w-max bg-darkblue rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between md:p-3 mb-4 ${serviceDetails.inspection_type !== "Elite Home Inspection" ? "hidden md:opacity-50" : ""}`}
        >
          <p className="md:mr-2 text-sm md:text-[16px] m-3 md:m-0">
            Would you like to add on wind mitigation? (This could lower
            insurance costs)
          </p>
          <select
            className="bg-royalblue/50 rounded-3xl pl-3 w-full md:w-max h-10 md:h-6 text-xl md:text-[16px]"
            name="windMitigation"
            value={serviceDetails.wind_mitigation ? "true" : "false"}
            onChange={handleChange}
            disabled={
              serviceDetails.inspection_type !== "Elite Home Inspection"
            }
            required={
              serviceDetails.inspection_type === "Elite Home Inspection"
                ? true
                : false
            }
          >
            <option value=""></option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div
          className={` w-full md:w-full bg-darkblue rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between md:p-3 mb-4 ${serviceDetails.inspection_type !== "Elite Home Inspection" ? "hidden md:opacity-50" : ""}`}
        >
          <p className="md:mr-2 text-sm md:text-[16px] m-3 md:m-0">
            Need 4 point inspection? (May be required by insurance for older
            homes)
          </p>
          <select
            className="bg-royalblue/50 rounded-3xl pl-3 w-full md:w-max h-10 md:h-6 text-xl md:text-[16px]"
            name="fourPointInspection"
            value={serviceDetails.four_point_inspection ? "true" : "false"}
            onChange={handleChange}
            disabled={
              serviceDetails.inspection_type !== "Elite Home Inspection"
            }
            required={
              serviceDetails.inspection_type === "Elite Home Inspection"
                ? true
                : false
            }
          >
            <option value=""></option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      {/* <PropertyDetails edit={true} /> */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full pr-4 pl-4 md:pr-0 md:pl-0">
        <div className="flex flex-col w-full md:w-full">
          <div className="bg-darkblue rounded-3xl md:p-4 pt-2 md:pb-10 md:h-[170px] md:min-h-[170px]">
            <p className=" md:mr-2 text-sm md:text-[16px] m-3 md:m-0 w-full text-left">
              Your Quote
            </p>
            <div className="bg-royalblue/50 rounded-3xl h-full flex items-center justify-center">
              {/* <h1>{serviceDetails.quote_amount!.toFixed(2)}</h1> */}
            </div>
          </div>
        </div>
        <div className="bg-darkblue rounded-3xl md:p-4 min-h-[170px] w-full pt-4 pr-2 pl-2 md:pr-4 md:pl-4 md:min-w-[350px] md:ml-6 flex flex-col justify-between ">
          <div className="pl-2 pr-2">
            <p className="font-bold w-full text-left">Quote Breakdown</p>
            {serviceDetails.inspection_type && (
              <div className="justify-between flex">
                <p className="text-xs">{serviceDetails.inspection_type}</p>
                <p className="text-xs">${baseInpection.toFixed(2)}</p>
              </div>
            )}
            {serviceDetails.extra_sqft > 0 && (
              <div className="justify-between flex">
                <p className="text-xs">
                  $0.10 x {serviceDetails.extra_sqft} extra sq ft
                </p>
                <p className="text-xs">${serviceDetails.extra_sqft * 0.1}</p>
              </div>
            )}
            {serviceDetails.pool_inspection === true && (
              <div className="justify-between flex">
                <p className="text-xs">Add on Pool Inspection</p>
                <p className="text-xs">$50.00</p>
              </div>
            )}
            {serviceDetails.wind_mitigation === true && (
              <div className="justify-between flex">
                <p className="text-xs">Add on Wind Mitigation</p>
                <p className="text-xs">$50.00</p>
              </div>
            )}
            {serviceDetails.four_point_inspection === true && (
              <div className="justify-between flex">
                <p className="text-xs">Add on 4 Point Inspection</p>
                <p className="text-xs">$50.00</p>
              </div>
            )}
          </div>
          <div>
            <div className="bg-teal h-[2px] w-full" />
            <div className="flex justify-between pl-2 pr-2">
              <p className="text-xs">Total:</p>
              <p className="text-xs">
                {/* ${serviceDetails.quote_amount!.toFixed(2)} */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pr-4 pl-4 mt-4">
        <button
          type="submit"
          className="w-full h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] justify-center items-center p-1 transition-colors flex md:hidden relative"
        >
          <p className="font-extrabold text-2xl">Review Info</p>
          <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors absolute right-1">
            <FontAwesomeIcon className="h-8 w-8" icon={faArrowRight} />
          </div>
        </button>
      </div>
    </form>
  );
}
