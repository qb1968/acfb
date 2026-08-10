jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { formatTimeRange } from "../utils/timeFormat";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const API = "https://acfb.onrender.com/api/events";

export default function EventsCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // --------------------------------------------------
  // LOAD EVENTS
  // --------------------------------------------------

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API);

      setEvents(res.data);
    } catch (err) {
      console.error(
        "Error loading events:",
        err.response?.data || err.message
      );
    }
  };

  // --------------------------------------------------
  // IMAGE URL
  // --------------------------------------------------

  const imageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `https://acfb.onrender.com${image}`;
  };

  // --------------------------------------------------
  // GET DATE ONLY
  // --------------------------------------------------
  // IMPORTANT:
  // Never convert the event date itself with new Date().
  // An event date is a calendar date, not a UTC timestamp.
  // --------------------------------------------------

  const getDateOnly = (date) => {
    if (!date) return "";

    return String(date).substring(0, 10);
  };

  // --------------------------------------------------
  // CREATE LOCAL DATE/TIME STRING
  // --------------------------------------------------
  // Example:
  // 2026-08-10 + 14:00
  // becomes:
  // 2026-08-10T14:00:00
  //
  // No timezone is attached.
  // FullCalendar interprets this in the local timezone.
  // --------------------------------------------------

  const formatCalendarDateTime = (date, time = "00:00") => {
    const dateOnly = getDateOnly(date);

    if (!dateOnly) {
      return "";
    }

    const timeOnly =
      time && time.length >= 5
        ? time.substring(0, 5)
        : "00:00";

    return `${dateOnly}T${timeOnly}:00`;
  };

  // --------------------------------------------------
  // CREATE JAVASCRIPT DATE FOR EXTERNAL CALENDARS
  // --------------------------------------------------
  // This is ONLY used when we need a real timestamp
  // for Google Calendar / Apple Calendar.
  // --------------------------------------------------

  const createLocalDate = (date, time = "00:00") => {
    const dateOnly = getDateOnly(date);

    if (!dateOnly) {
      return null;
    }

    const [year, month, day] = dateOnly
      .split("-")
      .map(Number);

    const [hours, minutes] = String(time || "00:00")
      .substring(0, 5)
      .split(":")
      .map(Number);

    return new Date(
      year,
      month - 1,
      day,
      hours || 0,
      minutes || 0,
      0,
      0
    );
  };

  // --------------------------------------------------
  // GOOGLE CALENDAR
  // --------------------------------------------------

  const addToGoogleCalendar = () => {
    if (!selectedEvent) return;

    const props = selectedEvent.extendedProps;

    const date = getDateOnly(
      props.eventDate || selectedEvent.startStr
    );

    const startTime =
      props.startTime || "00:00";

    const endTime =
      props.endTime || "";

    const startDate = createLocalDate(
      date,
      startTime
    );

    if (!startDate) return;

    let endDate;

    if (endTime) {
      endDate = createLocalDate(
        date,
        endTime
      );
    } else {
      endDate = new Date(
        startDate.getTime() + 60 * 60 * 1000
      );
    }

    // Convert local browser time to UTC for Google.
    const formatGoogleDate = (date) => {
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");
    };

    const startUTC =
      formatGoogleDate(startDate);

    const endUTC =
      formatGoogleDate(endDate);

    const title = encodeURIComponent(
      selectedEvent.title || ""
    );

    const description = encodeURIComponent(
      props.description || ""
    );

    const location = encodeURIComponent(
      props.location || ""
    );

    const googleUrl =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${title}` +
      `&dates=${startUTC}/${endUTC}` +
      `&details=${description}` +
      `&location=${location}`;

    window.open(
      googleUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // --------------------------------------------------
  // APPLE / IPHONE CALENDAR
  // --------------------------------------------------

  const addToAppleCalendar = () => {
    if (!selectedEvent) return;

    const props = selectedEvent.extendedProps;

    const date = getDateOnly(
      props.eventDate || selectedEvent.startStr
    );

    const startTime =
      props.startTime || "00:00";

    const endTime =
      props.endTime || "01:00";

    const start = createLocalDate(
      date,
      startTime
    );

    const end = createLocalDate(
      date,
      endTime
    );

    if (!start || !end) return;

    // --------------------------------------------------
    // FORMAT ICS UTC DATE
    // --------------------------------------------------

    const formatICSDate = (date) => {
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");
    };

    // --------------------------------------------------
    // ESCAPE ICS CONTENT
    // --------------------------------------------------

    const escapeICS = (text = "") => {
      return String(text)
        .replace(/\\/g, "\\\\")
        .replace(/\r?\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");
    };

    const startICS =
      formatICSDate(start);

    const endICS =
      formatICSDate(end);

    const title = escapeICS(
      selectedEvent.title
    );

    const description = escapeICS(
      props.description || ""
    );

    const location = escapeICS(
      props.location || ""
    );

    const icsContent =
      "BEGIN:VCALENDAR\r\n" +
      "VERSION:2.0\r\n" +
      "PRODID:-//Alamance County Farm Bureau//Events//EN\r\n" +
      "CALSCALE:GREGORIAN\r\n" +
      "BEGIN:VEVENT\r\n" +
      `UID:${selectedEvent.id}@acfarmbureau.com\r\n` +
      `DTSTAMP:${formatICSDate(new Date())}\r\n` +
      `DTSTART:${startICS}\r\n` +
      `DTEND:${endICS}\r\n` +
      `SUMMARY:${title}\r\n` +
      `DESCRIPTION:${description}\r\n` +
      `LOCATION:${location}\r\n` +
      "END:VEVENT\r\n" +
      "END:VCALENDAR\r\n";

    const blob = new Blob(
      [icsContent],
      {
        type: "text/calendar;charset=utf-8",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${selectedEvent.title || "farm-bureau-event"}`
        .replace(/[^a-z0-9]/gi, "-")
        .toLowerCase() + ".ics";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // --------------------------------------------------
  // FULLCALENDAR EVENTS
  // --------------------------------------------------

  const calendarEvents = events
    .filter((event) => event.date)
    .map((event) => {
      const dateOnly =
        getDateOnly(event.date);

      const startTime =
        event.startTime || "00:00";

      return {
        id: event._id,

        title: event.title,

        // IMPORTANT:
        // This is a local date/time string.
        // No UTC conversion.
        start: formatCalendarDateTime(
          dateOnly,
          startTime
        ),

        extendedProps: {
          eventDate: dateOnly,
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

        borderColor: "transparent",
      };
    });

  // --------------------------------------------------
  // EVENT CLICK
  // --------------------------------------------------

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  return (
    <div>
      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Farm Bureau Events
        </h1>

        <p className="text-gray-600 mt-2 text-sm md:text-base">
          View upcoming Farm Bureau events and programs.
        </p>
      </div>

      {/* ------------------------------------------------
          CALENDAR
      ------------------------------------------------ */}

      <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-5 overflow-hidden">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          timeZone="local"
          events={calendarEvents}
          eventClick={handleEventClick}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.4}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right:
              "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
          }}
          eventDisplay="block"
          displayEventTime={true}
          dayMaxEvents={3}
        />
      </div>

      {/* ------------------------------------------------
          EVENT POPUP
      ------------------------------------------------ */}

      {selectedEvent && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/80
            flex
            items-center
            justify-center
            p-3
            sm:p-6
          "
          onClick={() =>
            setSelectedEvent(null)
          }
        >
          <div
            className="
              relative
              bg-white
              rounded-2xl
              shadow-2xl
              w-full
              max-w-5xl
              max-h-[96vh]
              overflow-hidden
              flex
              flex-col
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={() =>
                setSelectedEvent(null)
              }
              className="
                absolute
                top-3
                right-3
                z-20
                w-10
                h-10
                rounded-full
                bg-black/60
                hover:bg-black/80
                text-white
                text-xl
                flex
                items-center
                justify-center
                transition
              "
              aria-label="Close event"
            >
              ✕
            </button>

            {/* EVENT IMAGE */}

            {selectedEvent.extendedProps
              .image && (
              <div
                className="
                  w-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  h-[38vh]
                  sm:h-[45vh]
                  md:h-[50vh]
                "
              >
                <img
                  src={imageUrl(
                    selectedEvent
                      .extendedProps
                      .image
                  )}
                  alt={selectedEvent.title}
                  className="
                    w-full
                    h-full
                    object-contain
                  "
                />
              </div>
            )}

            {/* EVENT INFORMATION */}

            <div
              className="
                p-4
                sm:p-6
                bg-white
                shrink-0
              "
            >
              {/* TITLE */}

              <h2
                className="
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  font-bold
                  text-primary
                  pr-12
                "
              >
                {selectedEvent.title}
              </h2>

              {/* DETAILS */}

              <div
                className="
                  mt-3
                  grid
                  sm:grid-cols-2
                  gap-x-6
                  gap-y-2
                  text-sm
                  sm:text-base
                  text-gray-700
                "
              >
                {/* DATE */}

                {selectedEvent.extendedProps
                  .eventDate && (
                  <p>
                    📅{" "}
                    <strong>
                      Date:
                    </strong>{" "}
                    {formatDisplayDate(
                      selectedEvent
                        .extendedProps
                        .eventDate
                    )}
                  </p>
                )}

                {/* LOCATION */}

                {selectedEvent.extendedProps
                  .location && (
                  <p>
                    📍{" "}
                    <strong>
                      Location:
                    </strong>{" "}
                    {
                      selectedEvent
                        .extendedProps
                        .location
                    }
                  </p>
                )}

                {/* TIME */}

                {selectedEvent.extendedProps
                  .startTime && (
                  <p>
                    ⏰{" "}
                    <strong>
                      Time:
                    </strong>{" "}
                    {formatTimeRange(
                      selectedEvent
                        .extendedProps
                        .startTime,
                      selectedEvent
                        .extendedProps
                        .endTime
                    )}
                  </p>
                )}

                {/* CATEGORY */}

                {selectedEvent.extendedProps
                  .category && (
                  <p>
                    🏷{" "}
                    <strong>
                      Category:
                    </strong>{" "}
                    {
                      selectedEvent
                        .extendedProps
                        .category
                    }
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}

              {selectedEvent.extendedProps
                .description && (
                <p
                  className="
                    mt-3
                    text-sm
                    sm:text-base
                    text-gray-600
                  "
                >
                  {
                    selectedEvent
                      .extendedProps
                      .description
                  }
                </p>
              )}

              {/* CALENDAR BUTTONS */}

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                "
              >
                {/* GOOGLE */}

                <button
                  type="button"
                  onClick={
                    addToGoogleCalendar
                  }
                  className="
                    flex-1
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-3
                    px-4
                    rounded-xl
                    font-semibold
                    transition
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  📅 Add to Google Calendar
                </button>

                {/* APPLE */}

                <button
                  type="button"
                  onClick={
                    addToAppleCalendar
                  }
                  className="
                    flex-1
                    bg-gray-900
                    hover:bg-black
                    text-white
                    py-3
                    px-4
                    rounded-xl
                    font-semibold
                    transition
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  🍎 Add to iPhone Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------
// DISPLAY DATE
// --------------------------------------------------
// No Date object.
// No timezone conversion.
// --------------------------------------------------

const formatDisplayDate = (date) => {
  if (!date) return "";

  const dateOnly = String(date).substring(0, 10);

  const [year, month, day] =
    dateOnly.split("-");

  if (!year || !month || !day) {
    return "";
  }

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

