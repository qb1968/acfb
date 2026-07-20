import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomeEventsCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");

        const upcoming = res.data
          .filter((event) => new Date(event.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 2);

        setEvents(upcoming);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Link to="/events">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition shadow-lg">
        <h3 className="font-bold text-lg mb-2">Events Calendar</h3>

        <p className="text-sm text-gray-200 mb-4">
          View upcoming agricultural and community events.
        </p>

        <div className="space-y-3">
          {events.length === 0 && (
            <p className="text-sm text-gray-300">
              No upcoming events scheduled.
            </p>
          )}

          {events.map((event) => (
            <div key={event._id} className="bg-white/10 rounded-lg p-3">
              <h4 className="font-semibold">{event.title}</h4>

              <p className="text-xs text-gray-200">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>

              <p className="text-xs text-gray-200">📍 {event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
