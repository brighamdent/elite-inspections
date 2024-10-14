import React, { useState } from "react";
import { useAppointment } from "@/context/AppointmentContext";
import convertTo12Hour from "@/utils/convertTo12Hour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import SelectedAppointment from "./SelectedAppointment";
export default function EditContactForm({
  intitialAppointmentDetails,
}: {
  intitialAppointmentDetails: AppointmentType;
}) {
  const [contactDetails, setContactDetails] = useState(
    intitialAppointmentDetails,
  );

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    const keys = name.split("."); // Split the name by dot notation for nested fields

    setContactDetails((prevDetails) => {
      let updatedDetails = { ...prevDetails }; // Clone the previous state

      // Iterate over the keys to find the right nested property
      keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
          acc[key] = value; // Set the final key to the new value
        } else {
          acc[key] = { ...acc[key] }; // Continue cloning nested objects
        }
        return acc[key];
      }, updatedDetails);

      return updatedDetails;
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { role, appointment_id } = contactDetails;

    const { contact_id, first_name, last_name, phone_number, email } =
      contactDetails.contact;

    const {
      property_id,
      address,
      total_finished_square_feet,
      year_built,
      foundation_type,
      beds,
      baths,
      notes,
    } = contactDetails.property;
    try {
      const res = await fetch("/api/updateContactDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          appointment_id,
          contact_id,
          first_name,
          last_name,
          phone_number,
          email,
          property_id,
          address,
          total_finished_square_feet,
          year_built,
          foundation_type,
          beds,
          baths,
          notes,
        }),
      });

      await res.json();
      if (res.ok) {
      } else {
        throw Error("Something went wrong while connecting to our database.");
      }
    } catch (error) {
      console.log(error);
      throw Error("Something went wrong while connecting to our database.");
    }
  };

  return (
    <div>
      <form
        className="w-screen md:w-full md:pl-9 md:pr-9 pt-4 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex  flex-col md:flex-row items-center w-full">
          <h2 className="text-xl md:text-[24px]">Update Contact Details</h2>
          <button
            type="submit"
            className="bg-teal group hover:bg-darkblue rounded-3xl hidden md:flex  flex-col md:flex-row items-center justify-between p-1 ml-6 transition-colors"
          >
            <p className="font-extrabold ml-2 mr-2">Update</p>
            <div className="bg-royalblue group-hover:bg-teal rounded-3xl h-6 w-6 flex  flex-col md:flex-row items-center justify-center transition-colors">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </button>
        </div>
        {/* <div className="md:self-start mb-4 md:mb-0"> */}
        {/*   <SelectedAppointment edit={true} /> */}
        {/* </div> */}
        <div className="w-full pr-4 pl-4 md:pr-2 md:pl-2">
          <div className=" w-full p-4 md:max-w-auto md:w-full md:bg-darkblue md:h-8 rounded-3xl mt-2 flex  flex-col md:flex-row justify-between  md:pl-4 md:pr-4 items-start md:items-center bg-royalblue/50">
            <p className="w-full text-left pb-2 md:pb-0 md:w-auto font-bold md:font-normal">
              I am the...
            </p>
            <div>
              <input
                type="radio"
                id="homebuyer"
                name="role"
                value="Homebuyer"
                checked={contactDetails.role === "Homebuyer"}
                onChange={handleChange}
                required
              />
              <label htmlFor="homebuyer"> Homebuyer</label>
            </div>
            <div>
              <input
                type="radio"
                id="homeowner"
                name="role"
                value="Homeowner"
                checked={contactDetails.role === "Homeowner"}
                onChange={handleChange}
                required
              />
              <label htmlFor="homeowner"> Homeowner</label>
            </div>
            <div>
              <input
                type="radio"
                id="buyers_agent"
                name="role"
                value="Buyer's Agent"
                checked={contactDetails.role === "Buyer's Agent"}
                onChange={handleChange}
                required
              />
              <label htmlFor="buyers_agent"> Buyer&apos;s Agent</label>
            </div>
            <div>
              <input
                type="radio"
                id="sellers_agent"
                name="role"
                value="Seller's agent"
                checked={contactDetails.role === "Seller's Agent"}
                onChange={handleChange}
                required
              />
              <label htmlFor="sellers_agent"> Seller&apos;s Agent</label>
            </div>
          </div>
        </div>
        <p className="w-full text-xl md:text-[16px] text-center md:text-left mt-4 mb-2">
          Personal Details:
        </p>
        <div className="bg-darkblue rounded-3xl w-full md:p-4 ">
          <div className="flex  flex-col md:flex-row justify-between items-center md:w-full">
            <div className="flex items-start md:items-center flex-col md:flex-row gap-x-2 w-full pr-4 pl-4 md:pr-0 md:pl-0">
              <label
                htmlFor="first_name"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="contact.first_name"
                value={contactDetails.contact.first_name}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3  w-full md:max-w-auto md:w-56 h-10 md:h-6 text-xl md:text-[16px]"
                required
              />
            </div>
            <div className="flex items-start md:items-center flex-col md:flex-row gap-x-2 w-full pr-4 pl-4 md:pr-0 md:pl-0">
              <label
                htmlFor="last_name"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="contact.last_name"
                value={contactDetails.contact.last_name}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3  w-full md:max-w-auto md:w-56 h-10 md:h-6 text-xl md:text-[16px]"
                required
              />
            </div>
          </div>
          <div className="flex  flex-col md:flex-row justify-between items-center w-full  mt-2 ">
            <div className="flex items-start md:items-center flex-col md:flex-row gap-x-2 w-full md:w-auto pr-4 pl-4 md:pr-0 md:pl-0">
              <label
                htmlFor="phoneNumber"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="contact.phone_number"
                value={contactDetails.contact.phone_number}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3  w-full md:max-w-auto md:w-56 h-10 md:h-6 text-xl md:text-[16px]"
                required
              />
            </div>
            <div className="flex  items-start md:items-center flex-col md:flex-row gap-x-2 w-full md:w-auto pr-4 pl-4 md:pr-0 md:pl-0">
              <label
                htmlFor="email"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="contact.email"
                value={contactDetails.contact.email}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3  w-full md:max-w-auto md:w-56 h-10 md:h-6 text-xl md:text-[16px]"
                required
              />
            </div>
          </div>
        </div>
        <p className="w-full text-xl md:text-[16px] text-center md:text-left mt-4 mb-2">
          Property Details:
        </p>
        <div className="bg-darkblue rounded-3xl md:p-4 pt-0 md:pt-4 w-full ">
          <div className="flex justify-between flex-col items-center ">
            <div className="flex items-start md:items-center flex-col md:flex-row gap-x-2 w-full pr-4 pl-4 md:pr-0 md:pl-0">
              <label
                htmlFor="address"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="property.address"
                value={contactDetails.property.address}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3 w-full md:w-full h-10 md:h-6 text-xl md:text-[16px]"
                required
              />
            </div>
          </div>
          <div className="flex  flex-col md:flex-row justify-between items-center w-full mt-2 gap-x-1">
            <div className="flex items-start md:items-center flex-col md:flex-row gap-x-2 w-full md:w-auto pr-4 pl-4 md:pr-0 md:pl-0">
              <label
                htmlFor="finishedSqft"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Total Finished Square Feet
              </label>
              <input
                type="number"
                pattern="\d*"
                id="finishedSqft"
                name="property.total_finished_square_feet"
                value={contactDetails.property.total_finished_square_feet}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3  w-full md:max-w-auto md:w-44 h-10 md:h-6 text-xl md:text-[16px]"
                required
              />
            </div>
            <div className="flex items-start md:items-center w-full pr-4 pl-4 md:pr-0 md:pl-0 flex-col md:flex-row gap-x-2 md:w-auto">
              <label
                htmlFor="year_built"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Year Built
              </label>
              <input
                type="text"
                pattern="\d*"
                id="year_built"
                name="property.year_built"
                value={contactDetails.property.year_built}
                onChange={handleChange}
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3  w-full md:max-w-auto md:w-44 h-10 md:h-6 text-xl md:text-[16px]"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-2">
            <div className="flex flex-col items-start md:items-center md:flex-row gap-x-2 w-full pr-4 pl-4 md:pr-0 md:pl-0 md:w-auto">
              <label
                htmlFor="foundation_type"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Foundation Type
              </label>
              <select
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3 w-full md:w-60 h-10 md:h-6 text-xl md:text-[16px] "
                id="foundation_type"
                name="property.foundation_type"
                value={contactDetails.property.foundation_type}
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
            <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-x-2 pr-4 pl-4 md:pr-0 md:pl-0 md:w-auto">
              <label
                htmlFor="phone_number"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Beds
              </label>
              <select
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3  w-full md:max-w-auto md:w-20 h-10 md:h-6 text-xl md:text-[16px]"
                id="bed_count"
                name="property.beds"
                value={contactDetails.property.beds}
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
            <div className="flex flex-col md:flex-row items-start md:items-center gap-x-2 w-full pr-4 pl-4 md:pr-0 md:pl-0 md:w-auto">
              <label
                htmlFor="phone_number"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Bath
              </label>
              <select
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3  w-full md:max-w-auto md:w-20 h-10 md:h-6 text-xl md:text-[16px]"
                id="bath_count"
                name="property.baths"
                value={contactDetails.property.baths}
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
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-2">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-x-2 w-full pr-4 pl-4 md:pr-0 md:pl-0">
              <label
                htmlFor="address"
                className="text-sm md:text-[16px] m-3 md:m-0"
              >
                Notes
              </label>
              <textarea
                className="bg-royalblue/50 rounded-3xl pl-6 md:pl-3 w-full md:w-full h-32 md:h-16 text-xl md:text-[16px]"
                name="property.notes"
                value={contactDetails.property.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className=" pl-4 pr-4 w-full mt-4 md:hidden">
          <button
            type="submit"
            className="w-full h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] justify-center items-center p-1 transition-colors flex md:hidden relative"
          >
            <p className="font-extrabold text-2xl">Next</p>
            <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors absolute right-1">
              <FontAwesomeIcon className="h-8 w-8" icon={faArrowRight} />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
