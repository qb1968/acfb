import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EventsCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await axios.get("https://acfb.onrender.com/api/events");

      setEvents(res.data);
    } catch (err) {
      console.error("Events loading error:", err);
    }
  };

  const nextEvent = events[0];

  return (
    <Link to="/events">
      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-xl
          border
          border-gray-200
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all
          duration-300
          h-full
        "
      >
        {/* COLOR ACCENT */}
        <div className="h-2 bg-orange-700"></div>

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
              <h3 className="text-white text-xl font-bold">Upcoming Events</h3>

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
            <span className="text-gray-500 font-medium">Scheduled Events</span>

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

              {nextEvent.date && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span>🗓️</span>

                  <span>{new Date(nextEvent.date).toLocaleDateString()}</span>
                </div>
              )}

              {nextEvent.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📍</span>

                  <span>{nextEvent.location}</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-5xl mb-3">📅</div>

              <p className="text-gray-500">No upcoming events.</p>
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
      </div>
    </Link>
  );
}
