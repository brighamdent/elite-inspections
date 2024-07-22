import Navbar from "@/components/Navbar";
import Image from "next/image";
import heroHouse from "../../public/hero_house.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <Navbar />
      <div
        className="relative bg-cover bg-center h-screen text-white"
        style={{ backgroundImage: `url(${heroHouse.src})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
          <h1 className="text-4xl">Best Home Inspectors in Brevard County</h1>
          <p className="mt-2 text-lg">
            Your Reliable Partner in Conducting Extensive Home Inspections for a
            Secure Future.
          </p>
          <button
            type="button"
            className="bg-teal h-[70px] w-[275px] rounded-[55px] p-2 flex items-center "
          >
            <div className="flex justify-between items-center w-full">
              <h2 className="ml-6">Schedule Now</h2>
              <div className="w-[55px] h-[55px] rounded-[50px] bg-royalblue p-3 flex items-center justify-center">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </button>
          <button type="button"></button>
        </div>
      </div>
    </>
  );
}
