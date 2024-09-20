import React from "react";

export default function Quote({
  serviceDetails,
}: {
  serviceDetails: ServiceDetailsType;
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-darkblue rounded-3xl md:p-4 pt-2 md:pb-10 md:h-[170px] md:min-h-[170px]">
        <p className=" md:mr-2 text-sm md:text-[16px] m-3 md:m-0 w-full text-left">
          Clients Quote
        </p>
        <div className="bg-royalblue/50 rounded-3xl h-full flex items-center justify-center">
          <h1>${serviceDetails.quote_amount}</h1>
        </div>
      </div>
    </div>
  );
}
