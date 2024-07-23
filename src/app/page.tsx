import Navbar from "@/components/Navbar";
import Image from "next/image";
import heroHouse from "../../public/hero_house.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ScheduleButton from "@/components/ScheduleButton";
import CallButton from "@/components/CallButton";
import HomepageDivider from "@/components/HomepageDivider";
import TopServices from "@/components/TopServices";

export default function Home() {
  return (
    <>
      <Navbar />
      <div
        className="relative bg-cover bg-center h-[82vh] text-white"
        style={{ backgroundImage: `url(${heroHouse.src})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-between pt-8 pb-8 bg-black bg-opacity-50 p-4">
          <div>
            <h1 className="text-3xl">Best Home Inspectors in Brevard County</h1>
            <p className="mt-2">
              Your Reliable Partner in Conducting Extensive Home Inspections for
              a Secure Future.
            </p>
          </div>
          <div className="flex flex-col items-center justify-around h-44">
            <ScheduleButton />
            <CallButton />
          </div>
        </div>
      </div>
      <TopServices />
    </>
  );
}
