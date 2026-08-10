jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { formatTimeRange } from "../../utils/timeFormat";

const API = "https://acfb.onrender.com/api/events";

// --------------------------------------------------
// FORMAT EVENT DATE
// IMPORTANT: DO NOT USE new Date() HERE.
// Event dates are calendar dates, not timestamps.
// --------------------------------------------------
const formatEventDate = (date) => {
  if (!date) return "";

  const dateString = String(date);

  // Get YYYY-MM-DD directly from the value
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) {
    return dateString;
  }

  const [, year, month, day] = match;

  return `${month}/${day}/${year}`;
};

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

  // --------------------------------------------------
  // LOAD EVENTS
  // --------------------------------------------------

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API);

      setEvents(res.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  // --------------------------------------------------
  // SAVE / UPDATE EVENT
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    // IMPORTANT:
    // Send the date exactly as YYYY-MM-DD.
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
        await axios.put(`${API}/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Event Updated");
      } else {
        await axios.post(API, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Event Created");
      }

      clearForm();
      await fetchEvents();
    } catch (err) {
      console.error("Error saving event:", err);

      alert(
        err.response?.data?.message ||
          "Error saving event"
      );
    }
  };

  // --------------------------------------------------
  // EDIT EVENT
  // --------------------------------------------------

  const editEvent = (event) => {
    setEditingId(event._id);

    setTitle(event.title || "");
    setDescription(event.description || "");

    // Keep YYYY-MM-DD exactly as stored.
    setDate(
      event.date
        ? String(event.date).substring(0, 10)
        : ""
    );

    setLocation(event.location || "");
    setStartTime(event.startTime || "");
    setEndTime(event.endTime || "");

    setCategory(
      event.category || "Community Event"
    );

    if (event.image) {
      setPreview(event.image);
    }
  };

  // --------------------------------------------------
  // DELETE EVENT
  // --------------------------------------------------

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);

      alert("Event Deleted");

      await fetchEvents();
    } catch (err) {
      console.error("Delete event error:", err);

      alert(
        err.response?.data?.message ||
          "Error deleting event"
      );
    }
  };

  // --------------------------------------------------
  // CLEAR FORM
  // --------------------------------------------------

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
    <div>
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {editingId ? "Edit Event" : "Add Event"}
        </h1>

        <p className="text-gray-500 mt-2">
          Create and manage Farm Bureau events.
        </p>
      </div>

      {/* FORM */}

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
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded-lg h-32"
        />

        {/* DATE */}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Event Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            value={startTime}
            onChange={(e) =>
              setStartTime(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) =>
              setEndTime(e.target.value)
            }
            className="border p-3 rounded-lg"
          />
        </div>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
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
            const file = e.target.files?.[0];

            setImage(file || null);

            if (file) {
              setPreview(
                URL.createObjectURL(file)
              );
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
          <button
            type="submit"
            className="bg-primary text-white px-5 py-3 rounded-lg"
          >
            {editingId
              ? "Update Event"
              : "Save Event"}
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

      {/* EXISTING EVENTS */}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Existing Events
        </h2>

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow rounded-xl p-5 flex justify-between gap-6"
            >
              <div>
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-32 h-20 object-cover rounded-lg mb-3"
                  />
                )}

                <h3 className="font-bold text-lg">
                  {event.title}
                </h3>

                {/* IMPORTANT:
                    No new Date() here.
                */}

                <p>
                  📅 {formatEventDate(event.date)}
                </p>

                <p>
                  📍 {event.location}
                </p>

                <p>
                  ⏰{" "}
                  {formatTimeRange(
                    event.startTime,
                    event.endTime
                  )}
                </p>

                <p>
                  🏷 {event.category}
                </p>

                <p className="text-gray-600 mt-2">
                  {event.description}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    editEvent(event)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteEvent(event._id)
                  }
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

