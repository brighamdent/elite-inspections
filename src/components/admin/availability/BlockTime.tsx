import React, { useEffect, useState } from "react";
import BlockedTimeModal from "./BlockedTimeModal";

export default function BlockTime() {
  const [modal, setModal] = useState(false);

  const handleToggleModal = () => {
    setModal(!modal);
  };
  return (
    <div className="flex flex-col items-center h-full">
      <h3 className="font-bold">Block Time</h3>
      <div className="flex flex-col items-center lg:bg-darkblue/50 rounded-3xl justify-center p-4 h-full overflow-y-scroll">
        <button
          type="button"
          className="w-80 bg-teal rounded-3xl h-16 "
          onClick={handleToggleModal}
        >
          <h2>Add Blocked Time</h2>
        </button>
        {modal && <BlockedTimeModal handleToggleModal={handleToggleModal} />}
      </div>
    </div>
  );
}
