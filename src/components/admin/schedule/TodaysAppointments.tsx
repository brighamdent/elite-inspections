"use client";
import { formatDate, getCurrentDate } from "@/utils/dateUtils";
import { useAdminData } from "@/context/AdminDataContext";
import convertTo12Hour from "@/utils/convertTo12Hour";

export default function TodaysAppointments() {
  const currentDate = getCurrentDate();
  const { todaysAppointments } = useAdminData();

  return (
    <div className=" lg:bg-darkblue/50 h-full lg:flex-shrink lg:min-w-[200px] lg:max-w-full rounded-3xl  lg:p-4 md:p-0 ">
      <p className="font-bold">
        Today&apos;s Appointments {formatDate(currentDate)}
      </p>
      {todaysAppointments.length >= 1 ? (
        <div>
          {todaysAppointments.map((a, index) => (
            <div
              className="bg-royalblue/50 lg:flex-shrink w-80 lg:w-auto 2xl:min-w-80 lg:min-w-[150px] lg:max-w-80 rounded-3xl p-4 m-4 text-left xl:p-6"
              key={index}
            >
              <h2>{convertTo12Hour(a.time)}</h2>
              <div>
                <p>
                  {a.contact.first_name} {a.contact.last_name}
                </p>
                <p>{a.contact.phone_number}</p>
                <p>{a.property.address}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-royalblue/50 rounded-3xl p-4 m-4 lg:flex-shrink w-80 lg:w-auto lg:min-w-[150px] 2xl:min-w-80 lg:max-w-80">
          <div>
            <p>No Appointments to Show</p>
          </div>
        </div>
      )}
    </div>
  );
}
