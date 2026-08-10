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
const res = await axios.get(
"https://acfb.onrender.com/api/events"
);


  setEvents(res.data);
} catch (err) {
  console.error(
    "Error loading events:",
    err.response?.data || err.message
  );
}


};

// -----------------------------------------
// IMAGE URL
// -----------------------------------------

const imageUrl = (image) => {
if (!image) return "";


if (image.startsWith("http")) {
  return image;
}

return `https://acfb.onrender.com${image}`;


};

// -----------------------------------------
// FORMAT DATE FOR CALENDAR
// -----------------------------------------

const formatCalendarDate = (date, time = "00:00") => {
if (!date) return "";


const datePart = date.substring(0, 10);

const timePart =
  time && time.length >= 5
    ? time.substring(0, 5)
    : "00:00";

return `${datePart}T${timePart}:00`;


};

// -----------------------------------------
// GOOGLE CALENDAR
// -----------------------------------------

const addToGoogleCalendar = () => {
if (!selectedEvent) return;


const props = selectedEvent.extendedProps;

const startDate = selectedEvent.start;

if (!startDate) return;

const endDate = props.endTime
  ? new Date(
      formatCalendarDate(
        selectedEvent.startStr.substring(0, 10),
        props.endTime
      )
    )
  : new Date(startDate.getTime() + 60 * 60 * 1000);

const startUTC = startDate
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\.\d{3}/, "");

const endUTC = endDate
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\.\d{3}/, "");

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

// -----------------------------------------
// APPLE / IPHONE CALENDAR
// -----------------------------------------

const addToAppleCalendar = () => {
if (!selectedEvent) return;


const props = selectedEvent.extendedProps;

const date = selectedEvent.startStr.substring(0, 10);

const startTime = props.startTime || "00:00";

const endTime =
  props.endTime || "01:00";

const start = new Date(
  formatCalendarDate(date, startTime)
);

const end = new Date(
  formatCalendarDate(date, endTime)
);

const formatICSDate = (date) => {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
};

const escapeICS = (text = "") => {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
};

const startICS = formatICSDate(start);
const endICS = formatICSDate(end);

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

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

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

// -----------------------------------------
// FULLCALENDAR EVENTS
// -----------------------------------------

const calendarEvents = events.map((event) => ({
id: event._id,


title: event.title,

start: `${event.date.substring(0, 10)}T${
  event.startTime || "00:00"
}`,

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

borderColor: "transparent",


}));

// -----------------------------------------
// EVENT CLICK
// -----------------------------------------

const handleEventClick = (info) => {
setSelectedEvent(info.event);
};

return ( <div className="min-h-screen bg-gray-50">


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

  <div
    className="
      bg-white
      rounded-2xl
      shadow-lg
      p-2
      sm:p-4
      md:p-6
      overflow-x-auto
    "
  >
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
      ]}
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
        right:
          "today dayGridMonth,timeGridWeek",
      }}
      events={calendarEvents}
      eventClick={handleEventClick}
      height="auto"
      dayMaxEventRows={false}
      fixedWeekCount={false}
      expandRows={true}
      eventDisplay="block"
      contentHeight="auto"
    />
  </div>

  {/* EVENT POPUP */}

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

        {selectedEvent.extendedProps.image && (
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
                selectedEvent.extendedProps.image
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

            {selectedEvent.extendedProps.location && (
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

            {selectedEvent.extendedProps.startTime && (
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

            {selectedEvent.extendedProps.category && (
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

          {selectedEvent.extendedProps.description && (
            <p
              className="
                mt-3
                text-sm
                sm:text-base
                text-gray-600
                line-clamp-2
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

            {/* GOOGLE CALENDAR */}

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

            {/* APPLE CALENDAR */}

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
