import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com";

export default function Women() {
  const [members, setMembers] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadWomenData();
  }, []);

  const loadWomenData = async () => {
    try {
      const membersRes = await axios.get(`${API}/api/women-members`);

      const newsRes = await axios.get(`${API}/api/women-news`);

      const eventsRes = await axios.get(`${API}/api/women-events`);

      setMembers(membersRes.data.sort((a, b) => a.order - b.order));

      setNews(newsRes.data.slice(0, 3));

      setEvents(eventsRes.data.slice(0, 3));
    } catch (err) {
      console.error("Error loading Women's data:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}

      <section className="relative bg-[url('/farm.png')] bg-cover bg-center h-[35vh] flex items-center">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Women's Leadership Committee</h1>

          <p className="mt-3 text-lg text-gray-200 max-w-2xl">
            Supporting agriculture, leadership, education, and community
            programs throughout Alamance County.
          </p>
        </div>
      </section>

      {/* ABOUT */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-primary mb-4">
            About Our Women's Leadership Committee
          </h2>

          <p className="text-gray-600 leading-relaxed">
            The Women's Leadership Committee provides opportunities for women involved in
            agriculture to develop leadership skills, support local programs,
            and strengthen our farming community.
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
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-1 transition"
            >
              {member.image && (
                <img
                  src={`${API}${member.image}`}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                />
              )}

              <h3 className="text-xl font-bold text-primary">{member.name}</h3>

              <p className="font-semibold mt-2">{member.position}</p>

              <p className="text-gray-600 mt-2">📍 {member.location}</p>

              <p className="text-gray-600 mt-3">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Latest News
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {item.image && (
                <img
                  src={`${API}${item.image}`}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="text-sm text-gray-500 mt-2">
                  {item.date && new Date(item.date).toLocaleDateString()}
                </p>

                <p className="text-gray-600 mt-3">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary">{event.title}</h3>

              <p className="mt-3">
                📅 {event.date && new Date(event.date).toLocaleDateString()}
              </p>

              <p className="mt-2">
                ⏰ {event.startTime}
                {" - "}
                {event.endTime}
              </p>

              <p className="mt-2">📍 {event.location}</p>

              <p className="mt-3 text-gray-600">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
