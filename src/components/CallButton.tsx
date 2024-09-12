"use client";
import { faPhone, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import plainLogo from "../../public/plainlogo.svg";

const sizes: any = {
  big: {
    height: "h-[70px]",
    width: "w-[275px]",
    lgHeight: "lg:h-[60px]",
    lgWidth: "lg:w-[250px]",
    textSize: "text-[24px]",
    iconSize: "h-8",
    outerDivSize: "w-[55px] h-[55px]",
    lgOuterDivSize: "lg:w-[50px] lg:h-[50px]",
    rounded: "rounded-[55px]",
    padding: "p-2",
  },
  small: {
    height: "h-[50px]",
    width: "w-[200px]",
    lgHeight: "lg:h-[45px]",
    lgWidth: "lg:w-[180px]",
    textSize: "text-base",
    iconSize: "h-5",
    outerDivSize: "w-[40px] h-[40px]",
    lgOuterDivSize: "lg:w-[35px] lg:h-[35px]",
    rounded: "rounded-[40px]",
    padding: "p-1.5",
  },
};

export default function CallButton({ size = "small" }: { size: string }) {
  const [modal, setModal] = useState(false);
  const {
    height,
    width,
    lgHeight,
    lgWidth,
    textSize,
    iconSize,
    outerDivSize,
    lgOuterDivSize,
    rounded,
    padding,
  } = sizes[size as any];

  const handleClick = () => {
    setModal(!modal);
    console.log(modal);
  };

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCall}
        className={`bg-royalblue ${height} ${width} ${lgHeight} ${lgWidth} ${rounded} ${padding} flex items-center group hover:bg-teal relative`}
      >
        <div className="flex justify-between items-center w-full">
          <h2 className={` ml-4 lg:ml-2 ${textSize} text-white`}>
            407-818-3403{" "}
          </h2>
          <div
            className={`${outerDivSize} ${lgOuterDivSize} rounded-full bg-teal p-2 flex items-center justify-center group-hover:bg-royalblue absolute right-1`}
          >
            <FontAwesomeIcon icon={faPhone} className={iconSize} />
          </div>
        </div>
      </button>
      {modal && (
        <>
          <div
            onClick={handleClick}
            className="fixed left-0 top-0 z-50 h-full w-full bg-black/10 backdrop-blur-sm"
          />
          <div className=" max-h-[80vh] md:max-h-fit overflow-y-scroll md:overflow-y-auto fixed bg-darkblue rounded-3xl md:bg-transparent left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center">
            <div className="relative w-full sm:w-96 h-80 bg-royalblue rounded-3xl p-4 flex flex-col items-center justify-center">
              <FontAwesomeIcon
                icon={faX}
                className="absolute right-4 top-4"
                onClick={handleClick}
              />
              <Image src={plainLogo} alt="Logo" className="h-full w-full" />
              <h2>Reach out to us!</h2>
              <p>Call 407-818-3403</p>
              <h2>Or Send us an email</h2>
              <p>elitehomeinspectiongroup@gmail.com</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
