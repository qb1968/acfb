import { useEffect, useState } from "react";
import axios from "axios";
import { formatTimeRange } from "../utils/timeFormat";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function EventsCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://acfb.onrender.com/api/events");

      setEvents(res.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  // Fix image URL

  const imageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `https://acfb.onrender.com${image}`;
  };

  // Convert database events for FullCalendar

  const calendarEvents = events.map((event) => ({
    id: event._id,

    title: event.title,

    start: `${event.date.substring(0, 10)}T${event.startTime || "00:00"}`,

    extendedProps: {
      description: event.description,

      location: event.location,

      startTime: event.startTime,

      endTime: event.endTime,

      category: event.category,

      image: event.image,
    },

    backgroundColor:
      event.category === "Meeting"
        ? "#2563eb"
        : event.category === "Youth Program"
          ? "#16a34a"
          : event.category === "Training"
            ? "#f97316"
            : "#7c3aed",
  }));

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-12 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Events Calendar
          </h1>

          <p className="text-gray-600 mt-2 text-sm md:text-base">
            View upcoming Farm Bureau events and programs.
          </p>
        </div>

        {/* CALENDAR */}

        <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-4 md:p-6 overflow-x-auto">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            displayEventTime={true}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "today dayGridMonth,timeGridWeek",
            }}
            events={calendarEvents}
            eventClick={handleEventClick}
            height="auto"
            dayMaxEventRows={2}
            fixedWeekCount={false}
            expandRows={true}
            eventDisplay="block"
            contentHeight="auto"
            events={calendarEvents}
            eventClick={handleEventClick}
          />
        </div>

        {/* EVENT POPUP */}

        {selectedEvent && (
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/70
              px-4
            "
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="
                bg-white
                rounded-2xl
                shadow-2xl
                max-w-xl
                w-full
                p-4 sm:p-6
                relative
                max-h-[90vh] overflow-y-auto
              "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="
                  absolute
                  top-4
                  right-4
                  text-gray-500
                  hover:text-black
                  text-xl
                "
              >
                ✕
              </button>

              <h2
                className="
                text-2xl
                font-bold
                text-primary
                pr-8
              "
              >
                {selectedEvent.title}
              </h2>

              <div
                className="
                mt-5
                space-y-3
                text-gray-700
              "
              >
                {selectedEvent.extendedProps.location && (
                  <p>
                    📍 <strong>Location:</strong>{" "}
                    {selectedEvent.extendedProps.location}
                  </p>
                )}

                {selectedEvent.extendedProps.startTime && (
                  <p>
                    ⏰ <strong>Time:</strong>{" "}
                    {formatTimeRange(
                      selectedEvent.extendedProps.startTime,

                      selectedEvent.extendedProps.endTime,
                    )}
                  </p>
                )}

                {selectedEvent.extendedProps.category && (
                  <p>
                    🏷 <strong>Category:</strong>{" "}
                    {selectedEvent.extendedProps.category}
                  </p>
                )}

                <p
                  className="
                  pt-3
                  text-gray-600
                "
                >
                  {selectedEvent.extendedProps.description}
                </p>
              </div>

              {selectedEvent.extendedProps.image && (
                <img
                  src={imageUrl(selectedEvent.extendedProps.image)}
                  alt={selectedEvent.title}
                  className="
                    mt-5
                    w-full
                    h-48 sm:h-56 md:h-64
                    object-cover
                    rounded-xl
                    shadow-lg
                  "
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
