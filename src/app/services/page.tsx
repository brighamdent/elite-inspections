import React from "react";
import Image from "next/image";
import heroImage from "../../../public/hero_house.jpg";
import Footer from "@/components/Footer";
import ScheduleButton from "@/components/ScheduleButton";
import commercialBuilding from "../../../public/commercial_building.jpg";
import CallButton from "@/components/CallButton";

export default function page() {
  return (
    <div className="flex flex-col items-center lg:text-left">
      <h1 className="z-10 relative hidden lg:block m-4">Our Services</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-4/5 mt-0">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:p-4">
          <div className="relative h-96 lg:h-[500px] lg:rounded-3xl w-full overflow-hidden">
            <h1 className="z-10 relative lg:hidden">Our Services</h1>
            <Image
              src={heroImage}
              alt="Hero House"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start max-w-[500px] p-4 lg:p-6 lg:w-1/2 lg:ml-4 lg:min-h-[450px] mb-8">
          <h2 className="mb-4">Elite Home Inspection</h2>
          <p className="mb-4">
            A detailed examination of the entire property, including structural
            elements, electrical systems, plumbing, roofing, and HVAC systems to
            ensure the home is in good condition and identify any potential
            issues.
          </p>
          <h2 className="font-normal">Homes up to 3500 sq ft</h2>
          <h1>$350</h1>
          <h2 className="font-normal">Homes above 3500 sq ft</h2>
          <h1>$0.13</h1>
          <h2 className="mb-4 font-normal">Per additional sq ft</h2>
          <ScheduleButton />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-4/5 mt-0">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:p-4">
          <div className="relative h-96 lg:h-[500px] lg:rounded-3xl w-full overflow-hidden">
            <Image
              src={commercialBuilding}
              alt="Commercial Building"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start max-w-[500px] p-4 lg:p-6 lg:w-1/2 lg:ml-4 lg:min-h-[450px] mb-8">
          <h2 className="mb-4">Elite Commercial Inspection</h2>
          <p className="mb-4">
            At Elite Home Inspection Group, we provide thorough commercial
            property inspections to ensure the safety, functionality, and
            longevity of your investment. Our expert inspectors meticulously
            assess all aspects of your property, from structural integrity to
            electrical systems, HVAC, plumbing, and more. Trust us to deliver
            detailed reports and actionable insights, helping you make informed
            decisions and maintain the value of your commercial property.
          </p>
          <h3 className="mb-4">Give us a call to get a free quote today!</h3>
          <CallButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}
