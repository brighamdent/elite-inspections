"use client";
import { formatDate, getCurrentDate } from "@/utils/dateUtils";
import { useAdminData } from "@/context/AdminDataContext";
import convertTo12Hour from "@/utils/convertTo12Hour";

export default function TodaysAppointments() {
  const currentDate = getCurrentDate();
  const { todaysAppointments } = useAdminData();

  return (
    <div className=" lg:bg-darkblue/50 h-full w-screen p-4 lg:flex-shrink lg:min-w-[200px] lg:w-auto rounded-3xl max-w-96 ">
      <p className="font-bold">
        Today&apos;s Appointments {formatDate(currentDate)}
      </p>
      {todaysAppointments.length >= 1 ? (
        <div className="w-full">
          {todaysAppointments.map((a, index) => (
            <div
              className="bg-royalblue/50 lg:flex-shrink w-full lg:w-auto 2xl:min-w-80 lg:min-w-[150px] lg:max-w-80 rounded-3xl p-4 mb-4 mt-4 text-left xl:p-6"
              key={index}
            >
              <h2>{convertTo12Hour(a.time)}</h2>
              <div>
                <p>
                  {a.contact.first_name} {a.contact.last_name}
                </p>
                <p>{a.contact.phone_number}</p>
                <p>{a.property.address}</p>
                <p>{a.service_details.inspection_type}</p>
                {/* <p */}
                {/*   className={`${!a.service_details.pool_inspection && "hidden"}`} */}
                {/* > */}
                {/*   Add on Pool Inspection */}
                {/* </p> */}
                {/* <p */}
                {/*   className={`${!a.service_details.wind_mitigation && "hidden"}`} */}
                {/* > */}
                {/*   Add on Wind Mitigation */}
                {/* </p> */}
                {/* <p */}
                {/*   className={`${!a.service_details.four_point_inspection && "hidden"}`} */}
                {/* > */}
                {/*   Add on 4 Point Inspection */}
                {/* </p> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-royalblue/50 lg:flex-shrink w-full lg:w-auto 2xl:min-w-80 lg:min-w-[150px] lg:max-w-80 rounded-3xl p-4 mb-4 mt-4 text-left xl:p-6">
          <div>
            <p>No Appointments to Show</p>
          </div>
        </div>
      )}
    </div>
  );
}
