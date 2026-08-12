import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com";

// --------------------------------------------------
// FORMAT WOMEN EVENT DATE
// IMPORTANT:
// DO NOT use new Date() for YYYY-MM-DD.
// --------------------------------------------------

const formatEventDate = (date) => {
  if (!date) return "";

  const dateString = String(date);

  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) {
    return dateString;
  }

  const [, year, month, day] = match;

  return `${month}/${day}/${year}`;
};

// --------------------------------------------------
// FORMAT TIME
// --------------------------------------------------

const formatTime = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.substring(0, 5).split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const suffix = hours >= 12 ? "PM" : "AM";

  const displayHour = hours % 12 || 12;

  return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

// --------------------------------------------------
// FORMAT TIME RANGE
// --------------------------------------------------

const formatTimeRange = (startTime, endTime) => {
  if (!startTime) return "";

  const start = formatTime(startTime);

  if (!endTime) {
    return start;
  }

  return `${start} - ${formatTime(endTime)}`;
};

export default function Women() {
  const [members, setMembers] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadWomenData();
  }, []);

  // --------------------------------------------------
  // IMAGE URL
  // --------------------------------------------------

  const imageUrl = (image) => {
    if (!image) return "";

    // Cloudinary
    if (image.startsWith("http")) {
      return image;
    }

    // Old uploads fallback
    return `${API}${image}`;
  };

  // --------------------------------------------------
  // LOAD WOMEN DATA
  // --------------------------------------------------

  const loadWomenData = async () => {
    try {
      const [membersRes, newsRes, eventsRes] = await Promise.all([
        axios.get(`${API}/api/women-members`),
        axios.get(`${API}/api/women-news`),
        axios.get(`${API}/api/women-events`),
      ]);

      // --------------------------------------------------
      // MEMBERS
      // --------------------------------------------------

      const sortedMembers = [...membersRes.data].sort((a, b) => {
        const orderA = Number(a.order ?? 99);
        const orderB = Number(b.order ?? 99);

        return orderA - orderB;
      });

      setMembers(sortedMembers);

      // --------------------------------------------------
      // NEWS
      // --------------------------------------------------

      setNews(newsRes.data.slice(0, 3));

      // --------------------------------------------------
      // EVENTS
      // --------------------------------------------------

      // Sort by YYYY-MM-DD string.
      // This avoids timezone conversion.
      const sortedEvents = [...eventsRes.data]
        .filter((event) => event.date)
        .sort((a, b) => {
          return String(a.date)
            .substring(0, 10)
            .localeCompare(String(b.date).substring(0, 10));
        });

      setEvents(sortedEvents.slice(0, 3));
    } catch (err) {
      console.error("Error loading Women's data:", err);
    }
  };

  const formatEventDate = (date) => {
    if (!date) return "";

    const dateOnly = String(date).substring(0, 10);

    const [year, month, day] = dateOnly.split("-");

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

  return (
    <div>
      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="
          relative
          bg-[url('/farm.png')]
          bg-cover
          bg-center
          h-[35vh]
          flex
          items-center
        "
      >
        <div className="absolute inset-0 bg-black/70" />

        <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            px-6
            text-white
          "
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Women's Leadership Committee
          </h1>

          <p className="mt-3 text-lg text-gray-200 max-w-2xl">
            Supporting agriculture, leadership, education, and community
            programs throughout Alamance County.
          </p>
        </div>
      </section>

      {/* ==================================================
          ABOUT
      ================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-primary mb-4">
            About Our Women's Leadership Committee
          </h2>

          <p className="text-gray-600 leading-relaxed">
            The Women's Leadership Committee provides opportunities for women
            involved in agriculture to develop leadership skills, support local
            programs, and strengthen our farming community.
          </p>
        </div>
      </section>

      {/* ==================================================
          MEMBERS
      ================================================== */}

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Committee Members
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member._id}
              className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                text-center
                hover:-translate-y-1
                transition
              "
            >
              {member.image && (
                <img
                  src={imageUrl(member.image)}
                  alt={member.name}
                  className="
                    w-32
                    h-32
                    rounded-full
                    mx-auto
                    object-cover
                    mb-4
                  "
                />
              )}

              <h3 className="text-xl font-bold text-primary">{member.name}</h3>

              <p className="font-semibold mt-2 text-green-700">
                {member.title || member.position || "Committee Member"}
              </p>

              {member.location && (
                <p className="text-gray-600 mt-2">📍 {member.location}</p>
              )}

              {member.bio && <p className="text-gray-600 mt-3">{member.bio}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          NEWS
      ================================================== */}

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Latest News
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item._id}
              className="
                bg-white
                rounded-2xl
                shadow-lg
                overflow-hidden
              "
            >
              {item.image && (
                <img
                  src={imageUrl(item.image)}
                  alt={item.title}
                  className="
                    w-full
                    h-48
                    object-contain
                  "
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="text-sm text-gray-500 mt-2">
                  {item.date && formatEventDate(item.date)}
                </p>

                <p className="text-gray-600 mt-3">
                  {item.content || item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          WOMEN'S EVENTS
      ================================================== */}

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="
                bg-white
                rounded-2xl
                shadow-lg
                overflow-hidden
              "
            >
              {/* IMAGE */}

              {event.image && (
                <img
                  src={imageUrl(event.image)}
                  alt={event.title}
                  className="
                    w-full
                    h-48
                    object-contain
                  "
                />
              )}

              {/* EVENT INFO */}

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary">
                  {event.title}
                </h3>

                {/* DATE */}

                {event.date && (
                  <p className="mt-3">📅 {formatEventDate(event.date)}</p>
                )}

                {/* TIME */}

                {(event.startTime || event.endTime) && (
                  <p className="mt-2">
                    ⏰ {formatTimeRange(event.startTime, event.endTime)}
                  </p>
                )}

                {/* LOCATION */}

                {event.location && <p className="mt-2">📍 {event.location}</p>}

                {/* CATEGORY */}

                {event.category && <p className="mt-2">🏷 {event.category}</p>}

                {/* DESCRIPTION */}

                {event.description && (
                  <p className="mt-3 text-gray-600">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* NO EVENTS */}

        {events.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No upcoming Women's Committee events.
          </div>
        )}
      </section>
    </div>
  );
}
