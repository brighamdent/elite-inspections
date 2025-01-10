import React, { useEffect, useState } from "react";
import BlockedTimeModal from "./BlockedTimeModal";
import { formatBackwardsDate } from "@/utils/dateUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faX } from "@fortawesome/free-solid-svg-icons";
import convertTo12Hour from "@/utils/convertTo12Hour";
import firebase from "firebase/compat/app";

export default function BlockTimeList() {
  const [blockedTimes, setBlockedTimes] = useState<BlockedTimeType[]>([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const response = await fetch("/api/blockedDays", { method: "GET" });
        const data = await response.json();
        const blockedDatesArray = data.data.map((day: BlockedDayType) => {
          return day.date;
        });
        console.log(blockedDatesArray);

        setBlockedDates(blockedDatesArray);
      } catch (error) {
        console.error("Error fetching blocked days:", error);
      }
    };

    fetchBlockedDates();
  }, []);

  useEffect(() => {
    const fetchBlockedTimes = async () => {
      const response = await fetch("/api/blockedTimes", {
        method: "GET",
      });

      const data = await response.json();
      setBlockedTimes(data.data);
      console.log(data.data);
    };
    fetchBlockedTimes();
  }, []);

  const deleteBlockedDate = async (dateToDelete: string) => {
    try {
      const user = firebase.auth().currentUser;
      const token = await user?.getIdToken();
      const response = await fetch("/api/blockedDays", {
        method: "DELETE",
        body: JSON.stringify({
          date: dateToDelete,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the date from backend.");
      }
      const newBlockedDates = blockedDates.filter(
        (date) => date !== dateToDelete,
      );
      setBlockedDates(newBlockedDates);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlockedTime = async (timeToDelete: BlockedTimeType) => {
    try {
      const user = firebase.auth().currentUser;
      const token = await user?.getIdToken();
      const response = await fetch("/api/blockedTimes", {
        method: "DELETE",
        body: JSON.stringify({
          timeId: timeToDelete.id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the date from backend.");
      }
      const newBlockedTimes = blockedTimes.filter(
        (time) => time.id !== timeToDelete.id,
      );
      setBlockedTimes(newBlockedTimes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center h-full">
      <h3 className="font-bold">Block Time List</h3>
      <div className=" lg:bg-darkblue/50 rounded-3xl p-4 h-[638px]">
        <h2>Blocked Dates</h2>
        {loading ? (
          <div className="w-80 h-64 mr-2 ml-2 flex items-center justify-center">
            <div className="big-loader" />
          </div>
        ) : (
          <div className="flex flex-col h-64 overflow-y-scroll ">
            {blockedDates.length >= 1 ? (
              blockedDates.map((date, index) => (
                <div
                  className={`  p-6 m-2 rounded-3xl w-80 min-h-16 flex items-center justify-between bg-royalblue/50`}
                  key={index}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    {formatBackwardsDate(date)}
                  </div>
                  <button onClick={() => deleteBlockedDate(date)}>
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
              ))
            ) : (
              <div
                className={`  p-6 m-2 rounded-3xl w-80 min-h-16 flex items-center justify-between bg-royalblue/50`}
              >
                <p>No Blocked Dates</p>
              </div>
            )}
          </div>
        )}
        <h2 className="mt-4">Blocked Times</h2>
        {loading ? (
          <div className="w-80 h-64 mr-2 ml-2 flex items-center justify-center">
            <div className="big-loader" />
          </div>
        ) : (
          <div className="flex flex-col h-64 overflow-y-scroll ">
            {blockedTimes.length >= 1 ? (
              blockedTimes.map((date, index) => (
                <div
                  className={`  p-4 m-2 rounded-3xl w-80 min-h-16 flex items-center justify-between bg-royalblue/50`}
                  key={index}
                >
                  <div className="flex items-center text-sm">
                    <div className="flex items-center mr-2">
                      {" "}
                      <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                      <p className="text-sm">
                        {formatBackwardsDate(date.date)}
                      </p>
                    </div>
                    <div className="flex items-center text-sm">
                      <FontAwesomeIcon icon={faClock} className="mr-1" />
                      <p className="text-sm">{convertTo12Hour(date.time)}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteBlockedTime(date)}>
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
              ))
            ) : (
              <div
                className={`  p-6 m-2 rounded-3xl w-80 min-h-16 flex items-center justify-between bg-royalblue/50`}
              >
                <p>No Blocked Times</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
