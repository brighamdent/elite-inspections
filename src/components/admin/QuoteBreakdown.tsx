import React from "react";

export default function QuoteBreakdown({
  serviceDetails,
  lineItems,
}: {
  serviceDetails: ServiceDetailsType;
  lineItems: SingleLineItem[];
}) {
  const baseInpection =
    serviceDetails.inspection_type === "Elite Home Inspection"
      ? 350
      : serviceDetails.inspection_type === "Pool Inspection"
        ? 100
        : serviceDetails.inspection_type === "Wind Mitigation"
          ? 149
          : serviceDetails.inspection_type === "4 Point Inspection"
            ? 149
            : 0;

  return (
    <div className="bg-darkblue rounded-3xl md:p-4 min-h-[170px] w-full pt-4 pr-2 pl-2 md:pr-4 md:pl-4 md:min-w-[350px] md:ml-6 flex flex-col justify-between ">
      <div className="pl-2 pr-2">
        <p className="font-bold w-full text-left">Quote Breakdown</p>
        {serviceDetails.inspection_type && (
          <div className="justify-between flex">
            <p className="text-xs">{serviceDetails.inspection_type}</p>
            <p className="text-xs">${baseInpection.toFixed(2)}</p>
          </div>
        )}
        {serviceDetails.extra_sqft > 0 && (
          <div className="justify-between flex">
            <p className="text-xs">
              $0.10 x {serviceDetails.extra_sqft} extra sq ft
            </p>
            <p className="text-xs">
              ${(serviceDetails.extra_sqft * 0.1).toFixed(2)}
            </p>
          </div>
        )}
        {serviceDetails.pool_inspection && (
          <div className="justify-between flex">
            <p className="text-xs">Add on Pool Inspection</p>
            <p className="text-xs">$50.00</p>
          </div>
        )}
        {serviceDetails.wind_mitigation && (
          <div className="justify-between flex">
            <p className="text-xs">Add on Wind Mitigation</p>
            <p className="text-xs">$50.00</p>
          </div>
        )}
        {serviceDetails.four_point_inspection && (
          <div className="justify-between flex">
            <p className="text-xs">Add on 4 Point Inspection</p>
            <p className="text-xs">$50.00</p>
          </div>
        )}
        {lineItems?.map((lineItem, index) => (
          <div className="justify-between flex" key={index}>
            <p className="text-xs">{lineItem.description}</p>
            <p className="text-xs">${Number(lineItem.amount).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="bg-teal h-[2px] w-full" />
        <div className="flex justify-between pl-2 pr-2">
          <p className="text-xs">Total:</p>
          <p className="text-xs">
            ${Number(serviceDetails.quote_amount).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
