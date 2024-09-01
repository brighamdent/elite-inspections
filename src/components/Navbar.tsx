"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import ScheduleButton from "./ScheduleButton";
import CallButton from "./CallButton";
import Image from "next/image";
import plainLogo from "../../public/plainlogo.svg";
import longLogo from "../../public/longlogo.svg";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpened, setIsOpened] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpened(false);
  }, [pathName]);

  return (
    <div className="sticky top-0 z-40">
      <div
        className={`sticky top-0 bg-royalblue w-full z-50 h-24 flex justify-between items-center p-6 lg:pl-12 lg:pr-12 ${!isOpened && "shadow-lg"}`}
      >
        <Image src={plainLogo} alt="Logo" className="xl:hidden" />
        <div className="w-[370px] hidden xl:block">
          <Image src={longLogo} alt="Logo" />
        </div>
        <div className="items-center justify-around w-[500px] hidden lg:flex">
          <div className="flex justify-around w-[500px] font-bold">
            <Link href="/">
              <h3>Home</h3>
            </Link>
            <Link href="/services">
              <h3>Services</h3>
            </Link>
            <Link href="/about">
              <h3>About</h3>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center w-[370px] h-4 space-x-2">
          <ScheduleButton size={"small"} color={"darkblue"} />
          <CallButton size="small" />
        </div>
        <FontAwesomeIcon
          icon={!isOpened ? faBars : faX}
          className="h-full lg:hidden"
          onClick={() => setIsOpened(!isOpened)}
        />
      </div>
      {isOpened && (
        <div className="absolute top-0 z-0 h-screen bg-royalblue w-full flex flex-col items-center justify-center">
          <div className="flex flex-col w-96 items-center justify-around">
            <Link href="/">
              <h1>Home</h1>
            </Link>
            <Link href="/services">
              <h1>Services</h1>
            </Link>
            <Link href="/about">
              <h1>About</h1>
            </Link>
          </div>
          <div className="mt-12 flex flex-col justify-around items-center h-40">
            <ScheduleButton size={"small"} color={"darkblue"} />
            <CallButton />
          </div>
        </div>
      )}
    </div>
  );
}
