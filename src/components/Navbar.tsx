"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ScheduleButton from "./ScheduleButton";
import CallButton from "./CallButton";

export default function Navbar() {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="sticky top-0 z-40  ">
      <div
        className={`sticky top-0 bg-royalblue w-full z-50 h-24 flex justify-between items-center p-4 ${!isOpened && "shadow-lg"}`}
      >
        <img src="/plainlogo.svg" className="h-full" />
        <FontAwesomeIcon
          icon={faBars}
          className="h-full"
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
