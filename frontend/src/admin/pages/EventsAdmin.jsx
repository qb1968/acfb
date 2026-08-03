import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/events";

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
  const [preview, setPreview] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API);

      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

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
          `${API}/${editingId}`,

          formData,

          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        alert("Event Updated");
      } else {
        await axios.post(
          API,

          formData,

          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        alert("Event Created");
      }

      clearForm();

      fetchEvents();
    } catch (err) {
      console.error(err);

      alert("Error saving event");
    }
  };

  const editEvent = (event) => {
    setEditingId(event._id);

    setTitle(event.title);

    setDescription(event.description);

    setDate(event.date ? event.date.substring(0, 10) : "");

    setLocation(event.location || "");

    setStartTime(event.startTime || "");

    setEndTime(event.endTime || "");

    setCategory(event.category || "Community Event");

    if (event.image) {
      setPreview(event.image);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);

      alert("Event Deleted");

      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const clearForm = () => {
    setTitle("");

    setDescription("");

    setDate("");

    setLocation("");

    setStartTime("");

    setEndTime("");

    setCategory("Community Event");

    setImage(null);

    setPreview("");

    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        {editingId ? "Edit Event" : "Add Event"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 max-w-xl space-y-4"
      >
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
          onChange={(e) => {
            const file = e.target.files[0];

            setImage(file);

            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-32 object-cover rounded-lg"
          />
        )}

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

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Existing Events</h2>

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow rounded-xl p-5 flex justify-between"
            >
              <div>
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-32 h-20 object-cover rounded-lg mb-3"
                  />
                )}

                <h3 className="font-bold text-lg">{event.title}</h3>

                <p>📅 {new Date(event.date).toLocaleDateString()}</p>

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
