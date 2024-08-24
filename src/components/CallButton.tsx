import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function CallButton() {
  return (
    <button
      type="button"
      className="bg-royalblue h-[70px] w-[275px] lg:h-[60px] lg:w-[250px] rounded-[55px] p-2 flex items-center group hover:bg-teal "
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="ml-10 lg:ml-4">555-555-555</h2>
        <div className="w-[55px] h-[55px] lg:w-[50px] lg:h-[50px] rounded-[50px] bg-teal p-2 flex items-center justify-center group-hover:bg-royalblue">
          <FontAwesomeIcon icon={faPhone} className="h-6" />
        </div>
      </div>
    </button>
  );
}
