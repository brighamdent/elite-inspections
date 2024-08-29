import AppointmentScheduler from "@/components/appointmentScheduler/AppointmentScheduler";
import { AppointmentProvider } from "@/context/AppointmentContext";
import React from "react";
import BlockTimeSelector from "./blockTimeSelector/BlockTimeSelector";

export default function BlockedTimeModal({
  handleToggleModal,
}: {
  handleToggleModal: () => void;
}) {
  return (
    <>
      <div
        onClick={handleToggleModal}
        className="fixed left-0 top-0 z-50 h-full w-full bg-black/10 backdrop-blur-sm"
      />
      <div className=" max-h-[80vh] md:max-h-fit overflow-y-scroll md:overflow-y-auto fixed bg-darkblue rounded-3xl md:bg-transparent left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center">
        <BlockTimeSelector handleToggleModal={handleToggleModal} />
      </div>
    </>
  );
}
