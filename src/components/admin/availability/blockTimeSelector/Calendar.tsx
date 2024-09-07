import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, getDay, getDate, format } from "date-fns";
import { monthFormatting } from "@/utils/dateUtils";

export default function Calendar({
  currentMonthAppointments,
  setDate,
}: CalandarPropsType) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const firstDay = getDay(startOfMonth(currentDate));
  const lastDay = getDate(endOfMonth(currentDate));
  const monthFormatted = format(currentDate, "MMMM");
  const currentYear = currentDate.getFullYear();
  const currentMonthNumber = currentDate.getMonth() + 1;
  const realCurrentDay = new Date().getDate();
  const realCurrentMonthNumber = new Date().getMonth() + 1;
  const realCurrentYear = new Date().getFullYear();
  const currentDay = currentDate.getDate();
  const dayOfWeek = format(currentDate, "EEEE");
  const [selectedDate, setSelectedDate] = useState({
    month: currentMonthNumber,
    day: currentDay,
    year: currentYear,
    dayOfWeek,
    monthName: monthFormatted,
  });
  const [blockedWeekdays, setBlockedWeekdays] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>();
  const [dateCountMap, setDateCountMap] = useState<Map<number, number>>(
    new Map(),
  );

  useEffect(() => {
    const fetchBlockedDays = async () => {
      try {
        const response = await fetch("/api/weekdayAvailability");
        const blockedDaysObject: DaysOfWeekType[] = await response.json();
        const blockedDaysArray: string[] = blockedDaysObject
          .filter((day) => !day.available)
          .map((day) => {
            return day.day_name;
          });
        setBlockedWeekdays(blockedDaysArray);
      } catch (error) {
        console.error("Error fetching blocked days:", error);
      }
    };

    fetchBlockedDays();
  }, []);

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const response = await fetch("/api/blockedDays", { method: "GET" });
        const data = await response.json();
        const blockedDatesArray = data.data.map((day: PastBlockedDaysType) => {
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
    const countMap = new Map<number, number>();

    currentMonthAppointments.forEach((appointment: CalanderAppointmentType) => {
      const day = parseInt(appointment.scheduled_time.slice(8, 10), 10);

      if (countMap.has(day)) {
        countMap.set(day, countMap.get(day)! + 1);
      } else {
        countMap.set(day, 1);
      }
    });

    setDateCountMap(countMap);
  }, [currentMonthAppointments]);

  const nextMonth = () => {
    setCurrentDate(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1),
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1),
    );
  };

  const handleDayClick = (selectedDay: number) => {
    setSelectedDate({
      month: currentMonthNumber,
      day: selectedDay,
      year: currentYear,
      dayOfWeek,
      monthName: monthFormatted,
    });
  };

  useEffect(() => {
    setSelectedDate({
      month: currentMonthNumber,
      day: selectedDate.day,
      year: currentYear,
      dayOfWeek,
      monthName: monthFormatted,
    });
  }, [currentMonthNumber]);
  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const checkForDisabled = (i: number) => {
    let boolean = false;
    let day = i - firstDay + 1;
    const currWeekday = format(
      new Date(selectedDate.year, selectedDate.month - 1, day),
      "EEEE",
    );
    if (i < firstDay) {
      boolean = true;
    } else if (
      realCurrentMonthNumber == selectedDate.month &&
      realCurrentYear == selectedDate.year &&
      day < realCurrentDay
    ) {
      boolean = true;
    } else if (dateCountMap.has(day) && dateCountMap.get(day)! > 1) {
      boolean = true;
    } else if (blockedWeekdays.includes(currWeekday)) {
      boolean = true;
    } else if (
      blockedDates?.includes(
        `${selectedDate.year}-${monthFormatting(selectedDate.month)}-${day}`,
      )
    ) {
      boolean = true;
    }
    if (boolean == true && selectedDate.day == day) {
      handleDayClick(day + 1);
    }

    return boolean;
  };

  return (
    <div className=" rounded-3xl p-4  flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-4 pl-4 pr-4">
        <p className="text-md">
          {monthFormatted} {currentYear}
        </p>
        <div className="flex items-center h-full text-teal ">
          <button
            disabled={
              selectedDate.month == realCurrentMonthNumber &&
              selectedDate.year == realCurrentYear
            }
            onClick={prevMonth}
            className="mr-6 h-6 disabled:text-teal/10"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button onClick={nextMonth} className="mr-6 h-6">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 md:gap-2 ">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, i) => (
          <div className="text-center text-white text-[10px]" key={i}>
            {day}
          </div>
        ))}
        {Array.from({ length: 42 }).map((_, i) => (
          <button
            className={`rounded-3xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
            ${i < firstDay ? "bg-transparent" : "bg-royalblue md:bg-darkblue disabled:bg-royalblue/20 md:disabled:bg-darkblue/50 disabled:text-white/50"}
            ${i >= lastDay + firstDay ? "hidden" : ""}
            ${selectedDate.day === i - firstDay + 1 ? "bg-teal md:bg-teal" : ""}`}
            key={i}
            disabled={checkForDisabled(i)}
            onClick={() => handleDayClick(i - firstDay + 1)}
          >
            {i >= firstDay && i < lastDay + firstDay && (
              <p className="font-bold text-md">{i - firstDay + 1}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
