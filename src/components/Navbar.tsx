import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div className="bg-royalblue w-full h-24 flex justify-between items-center p-4">
      <img src="/plainlogo.svg" alt="hello" className="h-full" />
      <FontAwesomeIcon icon={faBars} className="h-full" />
    </div>
  );
}
