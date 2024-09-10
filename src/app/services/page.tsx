import React from "react";
import Image from "next/image";
import heroImage from "../../../public/hero_house.jpg";
import Footer from "@/components/Footer";
import ScheduleButton from "@/components/ScheduleButton";
import commercialBuilding from "../../../public/commercial_building.jpg";
import arial from "../../../public/houses_arial.jpg";
import livingRoom from "../../../public/living_room.jpg";
import pool from "../../../public/pool_2.jpg";
import newBuild from "../../../public/new_build_2.jpg";
import CallButton from "@/components/CallButton";

export default function page() {
  return (
    <div className="flex flex-col items-center lg:text-left">
      <h1 className="z-10 relative hidden lg:block m-4">Our Services</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-4/5 mb-0 lg:mb-6">
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
          <h2 className="font-normal">Homes up to 2500 sq ft</h2>
          <h1>$350</h1>
          <h2 className="font-normal">Homes above 2500 sq ft</h2>
          <h1>$0.10</h1>
          <h2 className="mb-4 font-normal">Per additional sq ft</h2>
          <ScheduleButton size="big" color="royalblue" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row-reverse justify-center items-center w-full lg:w-4/5 mt-0 lg:mt-6 mb-0 lg:mb-6">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:p-4">
          <div className="relative h-96 lg:h-[500px] lg:rounded-3xl w-full overflow-hidden">
            <Image
              src={arial}
              alt="Arial View"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start max-w-[500px] p-4 lg:p-6 lg:w-1/2 lg:ml-4 lg:min-h-[450px] mb-8">
          <h2 className="mb-4">Elite Wind Midigation</h2>
          <p className="mb-4">
            At Elite Home Inspection Group, we offer detailed inspections to
            help protect your property from wind damage. Our experts assess key
            areas like roofing and windows, providing reports with actionable
            recommendations to enhance safety and potentially lower insurance
            costs.
          </p>
          <h2 className="font-normal">With Elite Home Inspection</h2>
          <h1>$50</h1>
          <h2 className="font-normal">Without Elite Home Inpsection </h2>
          <h1 className="mb-4">$149</h1>
          <ScheduleButton size="big" color="royalblue" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-4/5 mt-0 lg:mt-6 mb-0 lg:mb-6">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:p-4">
          <div className="relative h-96 lg:h-[500px] lg:rounded-3xl w-full overflow-hidden">
            <Image
              src={pool}
              alt="Swimming Pool"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start max-w-[500px] p-4 lg:p-6 lg:w-1/2 lg:ml-4 lg:min-h-[450px] mb-8">
          <h2 className="mb-4">Elite Pool Inspection</h2>
          <p className="mb-4">
            We provide thorough pool inspections to ensure your pool is safe and
            compliant. Our experts evaluate critical components like structural
            integrity, plumbing, and safety features, offering detailed reports
            with actionable insights to help maintain your pool and prevent
            costly repairs.
          </p>
          <h2 className="font-normal">With Elite Home Inspection</h2>
          <h1>$50</h1>
          <h2 className="font-normal">Without Elite Home Inpsection </h2>
          <h1 className="mb-4">$100</h1>
          <ScheduleButton size="big" color="royalblue" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row-reverse justify-center items-center w-full lg:w-4/5 mt-0 lg:mt-6 mb-0 lg:mb-6">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:p-4">
          <div className="relative h-96 lg:h-[500px] lg:rounded-3xl w-full overflow-hidden">
            <Image
              src={livingRoom}
              alt="Living Room"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start max-w-[500px] p-4 lg:p-6 lg:w-1/2 lg:ml-4 lg:min-h-[450px] mb-8">
          <h2 className="mb-4">Elite 4-Point Inspection</h2>
          <p className="mb-4">
            At Elite Home Inspection Group, we provide thorough 4-point
            inspections to assess the key systems in your home: roofing,
            electrical, plumbing, and HVAC. Our experts deliver detailed reports
            with actionable recommendations, helping ensure the safety and
            longevity of your home while meeting insurance requirements.
          </p>
          <h2 className="font-normal">With Elite Home Inspection</h2>
          <h1>$50</h1>
          <h2 className="font-normal">Without Elite Home Inpsection </h2>
          <h1 className="mb-4">$149</h1>
          <ScheduleButton size="big" color="royalblue" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-4/5 mt-0 lg:mt-6 mb-0 lg:mb-8">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:p-4">
          <div className="relative h-96 lg:h-[500px] lg:rounded-3xl w-full overflow-hidden">
            <Image
              src={newBuild}
              alt="New Build"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start max-w-[500px] p-4 lg:p-6 lg:w-1/2 lg:ml-4 lg:min-h-[450px] mb-8">
          <h2 className="mb-4">Elite New Build Inspections</h2>
          <p className="mb-4">
            We offer comprehensive phased inspections for new builds to ensure
            each stage of construction meets the highest standards. Our expert
            inspectors carefully assess critical phases, including foundation,
            framing, electrical, plumbing, and final walkthrough. We provide
            detailed reports and actionable recommendations at every step,
            giving you peace of mind that your new build is safe, sound, and
            built to last.
          </p>
          <h3 className="mb-4">Give us a call to get a free quote today!</h3>
          <CallButton size="big" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row-reverse justify-center items-center w-full lg:w-4/5 mt-0 lg:mt-6 mb-0 lg:mb-6">
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
          <CallButton size="big" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
