import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const sizes: any = {
  big: {
    height: "h-[70px]",
    width: "w-[275px]",
    lgHeight: "lg:h-[60px]",
    lgWidth: "lg:w-[250px]",
    textSize: "text-[22px]",
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
    iconSize: "h-6",
    outerDivSize: "w-[40px] h-[40px]",
    lgOuterDivSize: "lg:w-[35px] lg:h-[35px]",
    rounded: "rounded-[40px]",
    padding: "p-1.5",
  },
};

export default function ScheduleButton({
  size,
  color,
}: {
  size: string;
  color: string;
}) {
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

  const hoverColor =
    color === "darkblue" ? "md:hover:bg-darkblue" : "md:hover:bg-royalblue";

  return (
    <Link href={"/schedule"}>
      <button
        type="button"
        className={`relative bg-teal ${height} ${width} ${lgHeight} ${lgWidth} ${rounded} ${padding} flex items-center group ${hoverColor}`}
      >
        <div className="flex justify-center items-center w-full">
          <h2 className={` pr-6 ${textSize}`}>Schedule Now</h2>
          <div
            className={`${outerDivSize} ${lgOuterDivSize} rounded-full bg-royalblue p-2 flex items-center justify-center md:group-hover:bg-teal absolute right-1`}
          >
            <FontAwesomeIcon icon={faArrowRight} className={iconSize} />
          </div>
        </div>
      </button>
    </Link>
  );
}
