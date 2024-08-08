import React from "react";

export default function TimeSelector({ selectedTime, setSelectedTime }) {
  const availableTimes = ["9:00", "10:00", "11:00", "12:00", "1:00"];

  const handleClick = (time: string) => {
    setSelectedTime(time);
  };
  return (
    <div className="bg-royalblue p-4 flex flex-col items-center">
      <p className="text-md mb-2">Wednesday, July 2, 2024</p>
      {availableTimes.map((time, i) => (
        <button
          className={` bg-darkblue p-4 w-56 h-12 rounded-2xl flex flex-col items-center justify-center m-1 ${time == selectedTime ? "bg-teal" : ""}`}
          key={i}
          onClick={() => handleClick(time)}
        >
          <h3 className="font-bold">{time} AM</h3>
        </button>
      ))}
    </div>
  );
}
