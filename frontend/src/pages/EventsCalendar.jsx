import { useState } from "react";

export default function EventsCalendar() {
  const [currentMonth] = useState("April 2026");

  // Example events (you can expand later)
  const events = {
    3: ["Farm Workshop"],
    8: ["Board Meeting"],
    12: ["Youth Training"],
    18: ["Community Fair"],
    25: ["Harvest Prep"],
  };

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-primary text-white py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Upcoming Events Calendar
        </h1>
        <p className="text-gray-200 mt-2">{currentMonth}</p>
      </div>

      {/* CALENDAR GRID */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Days of week */}
        <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div
              key={day}
              className="bg-white border rounded-xl p-2 h-24 md:h-28 flex flex-col justify-between hover:shadow-md transition"
            >
              {/* Day number */}
              <span className="text-sm font-bold text-gray-700">{day}</span>

              {/* Events */}
              <div className="text-xs space-y-1">
                {events[day]?.map((event, idx) => (
                  <div
                    key={idx}
                    className="bg-accent text-primary px-2 py-1 rounded-full text-[10px] font-semibold truncate"
                  >
                    {event}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
