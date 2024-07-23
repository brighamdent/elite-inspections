import Image from "next/image";
import React from "react";
import plainLogo from "../../public/plainlogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="bg-royalblue w-full flex flex-col items-center h-80 p-2 justify-around">
      <div className="flex justify-around items-center">
        <div className="w-[55px] h-[55px] rounded-[50px] bg-teal p-3 flex items-center justify-center">
          <FontAwesomeIcon icon={faPhone} />
        </div>
        <div className="flex flex-col items-start ml-4">
          <h2>Contact Us</h2>
          <h3>businessemail@gmail.com</h3>
          <h3>555-555-555</h3>
        </div>
      </div>
      <div className="flex items-center">
        <Image src={plainLogo} alt="" />
        <div className="flex flex-col text-left w-56 ml-4">
          <p>Licenced with:</p>
          <p>
            State of Florida Department of Business and Professional Regulation
          </p>
          <p>LN: HI17145</p>
        </div>
      </div>
      <h3>2024 © | Elite Home Inspection Group </h3>
    </div>
  );
}
