"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ScheduleButton from "./ScheduleButton";
import CallButton from "./CallButton";
import Image from "next/image";
import plainLogo from "../../public/plainlogo.svg";
import longLogo from "../../public/longlogo.svg";

export default function Navbar() {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="sticky top-0 z-40  ">
      <div
        className={`sticky top-0 bg-royalblue w-full z-50 h-24 flex justify-between items-center p-6 lg:pl-12 lg:pr-12 ${!isOpened && "shadow-lg"}`}
      >
        <Image src={plainLogo} alt="" className="xl:hidden" />
        <div className="w-[500px] hidden xl:block ">
          <Image src={longLogo} alt="" className="w-[400px]" />
        </div>
        <div className="items-center justify-around w-[500px] hidden lg:flex ">
          <div className="flex justify-around w-[400px] font-bold">
            <h3>Home</h3>
            <h3>Services</h3>
            <h3>About</h3>
          </div>
        </div>
        <div className="hidden lg:flex items-center w-[500px] h-4">
          <ScheduleButton />
          <CallButton />
        </div>
        <FontAwesomeIcon
          icon={faBars}
          className="h-full lg:hidden"
          onClick={() => setIsOpened(!isOpened)}
        />
      </div>
      {isOpened && (
        <div className="absolute top-0 z-0 h-screen bg-royalblue w-full flex flex-col items-center justify-center">
          <div className="flex flex-col w-96 items-center justify-around  ">
            <h1>Home</h1>
            <h1>Services</h1>
            <h1>About</h1>
          </div>
          <div className="mt-12 flex flex-col justify-around items-center h-40">
            <ScheduleButton />
            <CallButton />
          </div>
        </div>
      )}
    </div>
  );
}
