import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/women-events";

export default function WomenEventsAdmin() {
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "Meeting",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [editing, setEditing] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await axios.get(API);

      setEvents(res.data);
    } catch (err) {
      console.error("Error loading Women's events", err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const saveEvent = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      if (editing) {
        await axios.put(
          `${API}/${editing}`,

          data,

          {
            headers: {
              Authorization: `Bearer ${token}`,

              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        await axios.post(
          API,

          data,

          {
            headers: {
              Authorization: `Bearer ${token}`,

              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      clearForm();

      loadEvents();
    } catch (err) {
      console.error(err);

      alert("Error saving event");
    }
  };

  const editEvent = (event) => {
    setEditing(event._id);

    setForm({
      title: event.title || "",

      description: event.description || "",

      date: event.date ? event.date.substring(0, 10) : "",

      startTime: event.startTime || "",

      endTime: event.endTime || "",

      location: event.location || "",

      category: event.category || "Meeting",
    });

    if (event.image) {
      setPreview(`https://acfb.onrender.com${event.image}`);
    }

    setImage(null);
  };

  const deleteEvent = async (id) => {
    if (!confirm("Delete this event?")) return;

    await axios.delete(
      `${API}/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    loadEvents();
  };

  const clearForm = () => {
    setEditing(null);

    setForm({
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      category: "Meeting",
    });

    setImage(null);

    setPreview("");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Women's Committee Events</h1>

      <form
        onSubmit={saveEvent}
        className="bg-white rounded-2xl shadow-lg p-6 space-y-5"
      >
        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-32"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
        </div>

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option>Meeting</option>

          <option>Training</option>

          <option>Community Event</option>

          <option>Fundraiser</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full border p-3 rounded-lg"
        />

        {preview && (
          <img src={preview} className="w-64 h-40 object-cover rounded-xl" />
        )}

        <div className="flex gap-3">
          <button className="bg-primary text-white px-6 py-3 rounded-lg">
            {editing ? "Update Event" : "Save Event"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={clearForm}
              className="border px-6 py-3 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Existing Women's Events</h2>

        <div className="space-y-5">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow p-5 flex gap-6"
            >
              {event.image && (
                <img
                  src={`https://acfb.onrender.com${event.image}`}
                  className="w-40 h-28 object-cover rounded-xl"
                />
              )}

              <div className="flex-1">
                <h3 className="text-xl font-bold">{event.title}</h3>

                <p className="text-gray-500">
                  📅 {event.date && new Date(event.date).toLocaleDateString()}
                </p>

                <p>📍 {event.location}</p>

                <p>
                  ⏰ {event.startTime}-{event.endTime}
                </p>

                <p className="mt-3">{event.description}</p>
              </div>

              <div className="flex flex-col gap-3">
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
      </section>
    </div>
  );
}
