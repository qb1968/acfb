
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://acfb.onrender.com/api/events";

// --------------------------------------------------
// FORMAT DATE WITHOUT UTC
// --------------------------------------------------
const formatEventDate = (date) => {
  if (!date) return "";

  const dateOnly = String(date).substring(0, 10);

  const [year, month, day] = dateOnly.split("-");

  if (!year || !month || !day) {
    return "";
  }

  // IMPORTANT:
  // Do NOT use new Date() here.
  // This prevents timezone/date shifting.
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
};

// --------------------------------------------------
// GET DATE KEY
// --------------------------------------------------
// Returns YYYY-MM-DD.
// Strings in this format sort correctly chronologically.
// --------------------------------------------------
const getEventDateKey = (date) => {
  if (!date) return "";

  return String(date).substring(0, 10);
};

// --------------------------------------------------
// GET TODAY AS YYYY-MM-DD
// --------------------------------------------------
const getTodayKey = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function EventsCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  // --------------------------------------------------
  // LOAD EVENTS
  // --------------------------------------------------

  const loadEvents = async () => {
    try {
      const res = await axios.get(API);

      const todayKey = getTodayKey();

      // Keep only today's and future events.
      const upcomingEvents = res.data
        .filter((event) => {
          const eventDate = getEventDateKey(event.date);

          return eventDate && eventDate >= todayKey;
        })
        .sort((a, b) => {
          const dateA = getEventDateKey(a.date);
          const dateB = getEventDateKey(b.date);

          return dateA.localeCompare(dateB);
        });

      setEvents(upcomingEvents);
    } catch (err) {
      console.error(
        "Events loading error:",
        err.response?.data || err.message
      );
    }
  };

  const nextEvent = events[0];

  return (
    <Link
      to="/events"
      className="
        block
        bg-white
        rounded-2xl
        shadow-lg
        overflow-hidden
        hover:shadow-xl
        transition
        duration-300
        hover:-translate-y-1
      "
    >
      {/* COLOR ACCENT */}

      <div className="h-2 bg-orange-700" />

      {/* HEADER */}

      <div className="bg-orange-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className="
              bg-white/20
              h-12
              w-12
              rounded-full
              flex
              items-center
              justify-center
              text-2xl
            "
          >
            📅
          </div>

          <div>
            <h3 className="text-white text-xl font-bold">
              Upcoming Events
            </h3>

            <p className="text-orange-100 text-sm">
              Meetings • Programs • Activities
            </p>
          </div>
        </div>
      </div>

      {/* BODY */}

      <div className="p-6 space-y-5">

        {/* COUNT */}

        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">
            Scheduled Events
          </span>

          <span
            className="
              bg-orange-100
              text-orange-700
              font-bold
              px-3
              py-1
              rounded-full
            "
          >
            {events.length}
          </span>
        </div>

        {/* NEXT EVENT */}

        {nextEvent ? (
          <>
            <div>
              <p
                className="
                  text-sm
                  text-gray-500
                  uppercase
                  tracking-wide
                "
              >
                Next Event
              </p>

              <h4
                className="
                  text-lg
                  font-bold
                  text-gray-800
                  mt-1
                "
              >
                {nextEvent.title}
              </h4>
            </div>

            {/* DATE */}

            {nextEvent.date && (
              <div className="flex items-center gap-2 text-gray-600">
                <span>🗓️</span>

                <span>
                  {formatEventDate(nextEvent.date)}
                </span>
              </div>
            )}

            {/* TIME */}

            {nextEvent.startTime && (
              <div className="flex items-center gap-2 text-gray-600">
                <span>⏰</span>

                <span>
                  {nextEvent.startTime}

                  {nextEvent.endTime
                    ? ` - ${nextEvent.endTime}`
                    : ""}
                </span>
              </div>
            )}

            {/* LOCATION */}

            {nextEvent.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <span>📍</span>

                <span>
                  {nextEvent.location}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">
              📅
            </div>

            <p className="text-gray-500">
              No upcoming events.
            </p>
          </div>
        )}

        {/* FOOTER CTA */}

        <div className="border-t pt-5">
          <div className="flex items-center justify-between">
            <span
              className="
                font-semibold
                text-orange-700
              "
            >
              View All Events
            </span>

            <div
              className="
                bg-orange-700
                text-white
                rounded-full
                h-10
                w-10
                flex
                items-center
                justify-center
                hover:bg-orange-800
                transition
              "
            >
              →
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
