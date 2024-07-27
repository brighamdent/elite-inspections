import Image from "next/image";
import React from "react";
import aboutPortrait from "../../../public/about_portrait.jpg";

export default function page() {
  return (
    <div className="relative w-20 h-20 overflow-hidden">
      <Image
        src={aboutPortrait}
        alt="About Portrait"
        layout="fill"
        objectFit="cover"
        className=""
      />
    </div>
  );
}
