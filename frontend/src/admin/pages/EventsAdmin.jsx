import { useEffect, useState } from "react";
import axios from "axios";

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("Community Event");
  const [image, setImage] = useState(null);

  const [editingId, setEditingId] = useState(null);

  // Load events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://acfb.onrender.com/api/events");

      setEvents(res.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  // Create or update event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);

    formData.append("location", location);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        await axios.put(
          `https://acfb.onrender.com/api/events/${editingId}`,
          formData,
        );

        alert("Event Updated!");
      } else {
        await axios.post("https://acfb.onrender.com/api/events", formData);

        alert("Event Created!");
      }

      clearForm();
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Error saving event");
    }
  };

  // Edit event
  const editEvent = (event) => {
    setEditingId(event._id);

    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date.substring(0, 10));

    setLocation(event.location || "");
    setStartTime(event.startTime || "");
    setEndTime(event.endTime || "");
    setCategory(event.category || "Community Event");
  };

  // Delete event
  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) {
      return;
    }

    try {
      await axios.delete(`https://acfb.onrender.com/api/events/${id}`);

      alert("Event Deleted");

      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // Clear form
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDate("");

    setLocation("");
    setStartTime("");
    setEndTime("");
    setCategory("Community Event");
    setImage(null);

    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Event" : "Add Event"}
      </h1>

      {/* EVENT FORM */}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded-lg h-32"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-3 rounded-lg"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option>Community Event</option>

          <option>Meeting</option>

          <option>Youth Program</option>

          <option>Training</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex gap-3">
          <button className="bg-primary text-white px-5 py-3 rounded-lg">
            {editingId ? "Update Event" : "Save Event"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              className="border px-5 py-3 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* EVENT LIST */}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Existing Events</h2>

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                {event.image && (
                  <img
                    src={`https://acfb.onrender.com${event.image}`}
                    alt=""
                    className="w-32 h-20 object-cover rounded-lg mb-3"
                  />
                )}

                <h3 className="font-bold text-lg">{event.title}</h3>

                <p className="text-gray-500">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>

                <p>📍 {event.location}</p>

                <p>
                  ⏰ {event.startTime} - {event.endTime}
                </p>

                <p>🏷 {event.category}</p>

                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editEvent(event)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEvent(event._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
