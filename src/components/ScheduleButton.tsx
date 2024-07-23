import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ScheduleButton() {
  return (
    <button
      type="button"
      className="bg-teal h-[70px] w-[275px] lg:h-[60px] lg:w-[250px] rounded-[55px] p-2 flex items-center "
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="ml-4 lg:ml-2">Schedule Now</h2>
        <div className="w-[55px] h-[55px] lg:w-[50px] lg:h-[50px] rounded-[50px] bg-royalblue p-3 flex items-center justify-center">
          <FontAwesomeIcon icon={faArrowRight} className="h-8" />
        </div>
      </div>
    </button>
  );
}
