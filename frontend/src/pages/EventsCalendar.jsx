import { useEffect, useState } from "react";
import axios from "axios";

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

  // Convert 24 hour time to 12 hour format

  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");

    const date = new Date();

    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
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
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary">Events Calendar</h1>

          <p className="text-gray-600 mt-2">
            View upcoming Farm Bureau events and programs.
          </p>
        </div>

        {/* CALENDAR */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
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
              left: "prev,next today",

              center: "title",

              right: "dayGridMonth,timeGridWeek",
            }}
            events={calendarEvents}
            eventClick={handleEventClick}
            height="auto"
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
                max-w-lg
                w-full
                p-6
                relative
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE */}

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

              {/* TITLE */}

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

              {/* DETAILS */}

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
                    {formatTime(selectedEvent.extendedProps.startTime)}
                    {" - "}
                    {formatTime(selectedEvent.extendedProps.endTime)}
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

              {/* IMAGE */}

              {selectedEvent.extendedProps.image && (
                <img
                  src={imageUrl(selectedEvent.extendedProps.image)}
                  alt={selectedEvent.title}
                  className="
                    mt-5
                    w-full
                    h-64
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
