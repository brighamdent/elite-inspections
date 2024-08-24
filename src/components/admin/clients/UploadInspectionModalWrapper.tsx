import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";
import UploadInspectionModalContent from "./UploadInspectionModalContent";

export default function UploadInspectionModalWrapper({
  appointment,
}: {
  appointment: AppointmentType;
}) {
  const [modal, setModal] = useState(false);

  const handleToggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleToggleModal}
        className="rounded-[100px] bg-teal h-14 w-14 flex justify-center items-center"
      >
        <FontAwesomeIcon icon={faUpload} className="h-8 w-8" />
      </button>
      {modal && (
        <>
          <div
            onClick={handleToggleModal}
            className="fixed left-0 top-0 z-50 h-full w-full bg-black/10 backdrop-blur-sm"
          />
          <div className="max-h-[80vh] md:max-h-fit overflow-y-scroll md:overflow-y-auto fixed bg-darkblue rounded-3xl md:bg-transparent left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center">
            <UploadInspectionModalContent
              appointment={appointment}
              handleToggleModal={handleToggleModal}
            />
          </div>
        </>
      )}
    </div>
  );
}
