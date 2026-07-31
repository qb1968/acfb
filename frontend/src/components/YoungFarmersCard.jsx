import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function YoungFarmersCard() {
  const [members, setMembers] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const membersRes = await axios.get(
        "https://acfb.onrender.com/api/young-farmers",
      );

      const newsRes = await axios.get(
        "https://acfb.onrender.com/api/young-farmer-news",
      );

      const eventsRes = await axios.get(
        "https://acfb.onrender.com/api/young-farmer-events",
      );

      setMembers(membersRes.data);

      setNews(newsRes.data);

      setEvents(eventsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link to="/young-farmers">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition shadow-lg h-full">
        <h3 className="font-bold text-lg mb-3">Young Farmers & Ranchers</h3>

        <p className="text-sm text-gray-200">
          👨‍🌾 {members.length} Committee Members
        </p>

        {news.length > 0 && (
          <p className="text-sm text-gray-200 mt-2">
            📰 Latest: {news[0].title}
          </p>
        )}

        {events.length > 0 && (
          <p className="text-sm text-gray-200 mt-2">
            📅 Next: {events[0].title}
          </p>
        )}

        <p className="text-sm mt-4 text-white font-semibold">Learn More →</p>
      </div>
    </Link>
  );
}
