import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SeePricingButton() {
  return (
    <button
      type="button"
      className="bg-royalblue h-[70px] w-[275px] rounded-[55px] p-2 flex items-center "
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="ml-6">See Pricing</h2>
        <div className="w-[55px] h-[55px] rounded-[50px] bg-teal p-3 flex items-center justify-center">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </button>
  );
}
