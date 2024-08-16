import React from "react";
import { useAppointment } from "@/context/AppointmentContext";
import convertTo12Hour from "@/utils/convertTo12Hour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function ContactDetailsForm() {
  const {
    date,
    selectedTime,
    contactDetails,
    setContactDetails,
    currentStage,
    setCurrentStage,
  } = useAppointment();
  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStage(currentStage + 1);
  };

  return (
    <div>
      <form className="w-full pl-9 pr-9 pt-4" onSubmit={handleSubmit}>
        <div className="flex items-center w-full">
          <h2>Please Provide Contact Details</h2>
          <button
            type="submit"
            className="bg-teal group hover:bg-darkblue rounded-3xl flex items-center justify-between p-1 ml-6 transition-colors"
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
        <div className="w-full bg-darkblue h-8 rounded-3xl mt-2 flex justify-between p-4 items-center">
          <p>I am the...</p>
          <div>
            <input
              type="radio"
              id="homebuyer"
              name="person"
              value="Homebuyer"
              checked={contactDetails.person === "Homebuyer"}
              onChange={handleChange}
              required
            />
            <label htmlFor="homebuyer"> Homebuyer</label>
          </div>
          <div>
            <input
              type="radio"
              id="homeowner"
              name="person"
              value="Homeowner"
              checked={contactDetails.person === "Homeowner"}
              onChange={handleChange}
              required
            />
            <label htmlFor="homeowner"> Homeowner</label>
          </div>
          <div>
            <input
              type="radio"
              id="buyers_agent"
              name="person"
              value="Buyer's Agent"
              checked={contactDetails.person === "Buyer's Agent"}
              onChange={handleChange}
              required
            />
            <label htmlFor="buyers_agent"> Buyer's Agent</label>
          </div>
          <div>
            <input
              type="radio"
              id="sellers_agent"
              name="person"
              value="Seller's agent"
              checked={contactDetails.person === "Seller's agent"}
              onChange={handleChange}
              required
            />
            <label htmlFor="sellers_agent"> Seller's Agent</label>
          </div>
        </div>
        <p className="w-full text-left mt-4 mb-2">Personal Details:</p>
        <div className="bg-darkblue rounded-3xl w-full p-4 ">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-x-2">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="firstName"
                value={contactDetails.firstName}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-3 w-56"
                required
              />
            </div>
            <div className="flex gap-x-2">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="lastName"
                value={contactDetails.lastName}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-3 w-56"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <div className="flex gap-x-2">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phone_number"
                name="phoneNumber"
                value={contactDetails.phoneNumber}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-3 w-56"
                required
              />
            </div>
            <div className="flex gap-x-2">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="emailAddress"
                value={contactDetails.emailAddress}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-3 w-56"
                required
              />
            </div>
          </div>
        </div>
        <p className="w-full text-left mt-4 mb-2">Property Details:</p>
        <div className="bg-darkblue rounded-3xl w-full p-4 ">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-x-2 w-full">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={contactDetails.address}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-3 w-full"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <div className="flex gap-x-2">
              <label htmlFor="finishedSqft">Total Finished Square Feet</label>
              <input
                type="text"
                id="finishedSqft"
                name="finishedSqft"
                value={contactDetails.finishedSqft}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-3 w-44"
                required
              />
            </div>
            <div className="flex gap-x-2">
              <label htmlFor="year_built">Year Built</label>
              <input
                type="text"
                id="year_built"
                name="yearBuilt"
                value={contactDetails.yearBuilt}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-3 w-44"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <div className="flex gap-x-2">
              <label htmlFor="foundation_type">Foundation Type</label>
              <select
                className="bg-royalblue/50 rounded-3xl pl-3 w-60"
                id="foundation_type"
                name="foundationType"
                value={contactDetails.foundationType}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="option 1">Option 1</option>
                <option value="option 2">Option 2</option>
                <option value="option 3">Option 3</option>
                <option value="option 4">Option 4</option>
              </select>
            </div>
            <div className="flex gap-x-2">
              <label htmlFor="phone_number">Beds</label>
              <select
                className="bg-royalblue/50 rounded-3xl pl-3 w-20"
                id="bed_count"
                name="bedCount"
                value={contactDetails.bedCount}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div className="flex gap-x-2">
              <label htmlFor="phone_number">Bath</label>
              <select
                className="bg-royalblue/50 rounded-3xl pl-3 w-20"
                id="bath_count"
                name="bathCount"
                value={contactDetails.bathCount}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <div className="flex items-center gap-x-2 w-full">
              <label htmlFor="address">Notes</label>
              <textarea
                className="bg-royalblue/50 rounded-xl pl-3 w-full h-16"
                name="notes"
                value={contactDetails.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
