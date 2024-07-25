import React from "react";
import HomepageDivider from "./HomepageDivider";
import Image from "next/image";
import kitchen from "../../public/kitchen.jpg";
import arial from "../../public/houses_arial.jpg";
import livingRoom from "../../public/living_room.jpg";
import { faHourglass3 } from "@fortawesome/free-solid-svg-icons";
import SeePricingButton from "./SeePricingButton";

export default function TopServices() {
  const services = [
    {
      photo: kitchen,
      name: "Elite Home Inpection",
      description:
        "A detailed examination of the entire property, including structural elements, electrical systems, plumbing, roofing, and HVAC systems to ensure the home is in good condition and identify any potential issues.",
    },
    {
      photo: arial,
      name: "Wind Midigation",
      description:
        "A specialized inspection to evaluate a home's resilience against strong winds, such as those during hurricanes. It assesses key construction elements to minimize wind damage and can help qualify for insurance discounts.",
    },
    {
      photo: livingRoom,
      name: "Radon Testing",
      description:
        "Testing for radon gas to ensure home safety. Radon is a radioactive gas that can cause lung cancer. Detectors are placed in the home, and results are analyzed to determine if mitigation is needed.",
    },
  ];
  return (
    <div>
      <HomepageDivider>
        <h1>Top Services</h1>
      </HomepageDivider>
      <div className="lg:mt-12 flex flex-col items-center">
        {services.map((service, index) => (
          <div
            className={`flex flex-col justify-around lg:justify-center items-center pb-8 lg:p-12 ${index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row "}`}
          >
            <Image
              src={service.photo}
              alt=""
              width={1000}
              height={1000}
              className="w-full lg:w-[45%] lg:rounded-2xl"
            />
            <div
              className={` flex flex-col items-center lg:items-start lg:text-start lg:w-[400px]  ${index % 2 === 0 ? "lg:ml-32" : "lg:mr-32"}`}
            >
              <div className="flex flex-col items-center lg:items-start lg:text-start justify-around p-6 lg:p-0 h-64 mt-2 mb-4 ">
                <h2>{service.name}</h2>
                <h3>{service.description}</h3>
              </div>
              <SeePricingButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
