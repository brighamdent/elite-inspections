import React from "react";

export default function Quote({
  serviceDetails,
  editFunction,
}: {
  serviceDetails: ServiceDetailsType;
  editFunction: () => void;
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-darkblue rounded-3xl md:p-4 pt-2 md:pb-10 md:h-[170px] md:min-h-[170px]">
        <div className="flex w-full items-center justify-center md:justify-start">
          <p className=" md:mr-2 text-sm md:text-[16px] m-3 md:m-0 w-full text-left">
            Clients Quote
          </p>
          <p
            className="text-xs border-b h-4 ml-2 mb-1 cursor-pointer"
            onClick={editFunction}
          >
            Edit
          </p>
        </div>
        <div className="bg-royalblue/50 rounded-3xl h-full flex items-center justify-center">
          <h1>${Number(serviceDetails.quote_amount).toFixed(2)}</h1>
        </div>
      </div>
    </div>
  );
}
