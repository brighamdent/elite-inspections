import Navbar from "@/components/Navbar";
import Image from "next/image";
import heroHouse from "../../public/hero_house.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ScheduleButton from "@/components/ScheduleButton";
import CallButton from "@/components/CallButton";
import HomepageDivider from "@/components/HomepageDivider";
import TopServices from "@/components/TopServices";
import { Reviews } from "@/components/Reviews";
import { Faqs } from "@/components/Faqs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-hero-house relative  lg:bg-darkblue bg-center h-[82vh] text-white overflow-hidden">
        <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between pt-8 pb-8 bg-darkblue bg-opacity-80 lg:bg-opacity-0 p-4">
          <div className="w-full lg:ml-12 lg:m-8 flex flex-col justify-between lg:justify-around h-full lg:h-96 lg:items-start">
            <div className="lg:text-left p-4">
              <h1 className="text-5xl lg:text-7xl ">
                Best Home Inspectors in Brevard County
              </h1>
              <p className="mt-2 lg:text-xl">
                Your Reliable Partner in Conducting Extensive Home Inspections
                for a Secure Future.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:justify-start  h-44 space-y-4 lg:space-y-0 lg:space-x-6">
              <ScheduleButton />
              <CallButton />
            </div>
          </div>
          <Image
            src={heroHouse}
            width={1000}
            height={1000}
            alt=""
            className="hidden lg:block rounded-3xl -mr-32 w-1/2"
          />
        </div>
      </div>
      <TopServices />
      <Reviews />
      <Faqs />
      <Footer />
    </>
  );
}
