import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com";

export default function YoungFarmers() {
  const [members, setMembers] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const membersRes = await axios.get(`${API}/api/young-farmers`);

      const newsRes = await axios.get(`${API}/api/young-farmer-news`);

      const eventsRes = await axios.get(`${API}/api/young-farmer-events`);

      setMembers(membersRes.data);

      setNews(newsRes.data);

      setEvents(eventsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}

      <section className="relative bg-[url('/farm.png')] bg-cover bg-center h-[35vh] flex items-center">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
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
        <div className="bg-white rounded-2xl shadow-lg p-8">
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
              className="bg-white rounded-2xl shadow-lg p-6"
            >
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
          {news.slice(0, 3).map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold">{item.title}</h3>

              <p className="text-gray-500 text-sm mt-2">
                {item.date && new Date(item.date).toLocaleDateString()}
              </p>

              <p className="text-gray-600 mt-3">{item.content}</p>
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
          {events.slice(0, 3).map((event) => (
            <div key={event._id} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold">{event.title}</h3>

              <p className="text-gray-600 mt-2">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>

              <p className="text-gray-600 mt-2">📍 {event.location}</p>

              <p className="mt-3">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
