import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EventsCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await axios.get("https://acfb.onrender.com/api/events");

      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link to="/events">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition shadow-lg h-full">
        <h3 className="font-bold text-lg mb-3">Upcoming Events</h3>

        <p className="text-sm text-gray-200">
          📅 {events.length} Upcoming Events
        </p>

        {events.length > 0 && (
          <p className="text-sm text-gray-200 mt-2">Next: {events[0].title}</p>
        )}

        <p className="text-sm mt-4 text-white font-semibold">View Events →</p>
      </div>
    </Link>
  );
}
