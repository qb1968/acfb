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
      console.error(err);
    }
  };

  // Convert MongoDB events to FullCalendar format

  const calendarEvents = events.map((event) => ({
    id: event._id,

    title: event.title,

    start: event.date,

    extendedProps: {
      description: event.description,

      location: event.location,

      startTime: event.startTime,

      endTime: event.endTime,

      category: event.category,

      image: event.image,
    },

    // CATEGORY COLORS

    backgroundColor:
      event.category === "Meeting"
        ? "#2563eb"
        : event.category === "Youth Program"
          ? "#16a34a"
          : event.category === "Training"
            ? "#f97316"
            : "#7c3aed",
  }));

  // When event clicked

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
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

        {/* EVENT DETAILS */}

        {selectedEvent && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <button
              onClick={() => setSelectedEvent(null)}
              className="float-right text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-primary">
              {selectedEvent.title}
            </h2>

            <p className="mt-3">📍 {selectedEvent.extendedProps.location}</p>

            <p>
              ⏰ {selectedEvent.extendedProps.startTime}
              {" - "}
              {selectedEvent.extendedProps.endTime}
            </p>

            <p>🏷 {selectedEvent.extendedProps.category}</p>

            <p className="mt-4 text-gray-600">
              {selectedEvent.extendedProps.description}
            </p>

            {selectedEvent.extendedProps.image && (
              <img
                src={`https://acfb.onrender.com${
                  selectedEvent.extendedProps.image
                }`}
                alt=""
                className="mt-5 rounded-xl max-w-lg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
