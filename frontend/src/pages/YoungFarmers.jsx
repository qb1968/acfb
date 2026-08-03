import { useEffect, useState } from "react";
import axios from "axios";
import { formatTimeRange } from "../utils/timeFormat";
const API = "https://acfb.onrender.com";

export default function YoungFarmers() {
  const [members, setMembers] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const imageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${API}${image}`;
  };

  // Make URLs clickable
  const renderLinks = (text) => {
    if (!text) return "";

    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-primary
              underline
              hover:text-orange-700
              font-semibold
            "
          >
            {part}
          </a>
        );
      }

      return part;
    });
  };

  const loadData = async () => {
    try {
      const membersRes = await axios.get(`${API}/api/young-farmers`);

      const newsRes = await axios.get(`${API}/api/young-farmer-news`);

      const eventsRes = await axios.get(`${API}/api/young-farmer-events`);

      setMembers(membersRes.data);

      setNews(
        newsRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3),
      );

      setEvents(
        eventsRes.data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3),
      );
    } catch (err) {
      console.error("Loading Young Farmers data failed", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}

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
        <div className="absolute inset-0 bg-black/70"></div>

        <div
          className="
            relative
            z-10
            max-w-6xl
            mx-auto
            px-6
            text-white
          "
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Young Farmers & Ranchers
          </h1>

          <p className="mt-3 text-gray-200 text-lg">
            Supporting the next generation of agricultural leaders.
          </p>
        </div>
      </section>

      {/* ABOUT */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div
          className="
            bg-white
            rounded-2xl
            shadow-lg
            p-8
          "
        >
          <h2 className="text-3xl font-bold text-primary mb-4">
            About Young Farmers & Ranchers
          </h2>

          <p className="text-gray-600 leading-relaxed">
            The Young Farmers & Ranchers program provides leadership, education,
            and networking opportunities for farmers and agricultural
            professionals. Our members work together to promote agriculture and
            strengthen our local community.
          </p>
        </div>
      </section>

      {/* MEMBERS */}

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
                    object-cover
                    mx-auto
                    mb-4
                  "
                />
              )}

              <h3 className="text-xl font-bold text-primary">{member.name}</h3>

              <p className="font-semibold mt-2">{member.position}</p>

              <p className="text-gray-600 mt-2">📍 {member.location}</p>

              <p className="text-gray-600 mt-2">🌱 {member.commodities}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}

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
                    object-cover
                  "
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="text-gray-500 text-sm mt-2">
                  {item.createdAt &&
                    new Date(item.createdAt).toLocaleDateString()}
                </p>

                <p className="text-gray-600 mt-3 leading-relaxed">
                  {renderLinks(item.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}

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
              {event.image && (
                <img
                  src={imageUrl(event.image)}
                  alt={event.title}
                  className="
                    w-full
                    h-48
                    object-cover
                  "
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary">
                  {event.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>

                {event.startTime && (
                  <p className="text-gray-600 mt-2">
                    ⏰ {formatTimeRange(event.startTime, event.endTime)}
                  </p>
                )}

                <p className="text-gray-600 mt-2">📍 {event.location}</p>

                <p className="mt-3 text-gray-700 leading-relaxed">
                  {renderLinks(event.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
