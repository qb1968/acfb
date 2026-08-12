import { useEffect, useState } from "react";
import axios from "axios";
import { formatTimeRange } from "../../utils/timeFormat";

const API = "https://acfb.onrender.com/api/women-events";

// --------------------------------------------------
// FORMAT EVENT DATE
// IMPORTANT:
// Do NOT use new Date() for calendar dates.
// Dates are stored as YYYY-MM-DD strings.
// --------------------------------------------------
const formatEventDate = (date) => {
  if (!date) return "";

  const dateString = String(date);

  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) {
    return dateString;
  }

  const [, year, month, day] = match;

  return `${month}/${day}/${year}`;
};

// --------------------------------------------------
// GET YYYY-MM-DD
// --------------------------------------------------
const getDateOnly = (date) => {
  if (!date) return "";

  const dateString = String(date);

  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) {
    return "";
  }

  return `${match[1]}-${match[2]}-${match[3]}`;
};

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

  // --------------------------------------------------
  // LOAD EVENTS
  // --------------------------------------------------

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await axios.get(API);

      setEvents(res.data);
    } catch (err) {
      console.error(
        "Error loading Women's events:",
        err.response?.data || err.message,
      );
    }
  };

  // --------------------------------------------------
  // FORM CHANGE
  // --------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // IMAGE
  // --------------------------------------------------

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // --------------------------------------------------
  // SAVE / UPDATE EVENT
  // --------------------------------------------------

  const saveEvent = async (e) => {
    e.preventDefault();

    // Make absolutely sure we send only YYYY-MM-DD.
    const dateOnly = getDateOnly(form.date);

    if (!dateOnly) {
      alert("Please select a valid event date.");
      return;
    }

    const data = new FormData();

    data.append("title", form.title);

    data.append("description", form.description);

    // IMPORTANT:
    // Send calendar date exactly as YYYY-MM-DD.
    data.append("date", dateOnly);

    data.append("startTime", form.startTime);

    data.append("endTime", form.endTime);

    data.append("location", form.location);

    data.append("category", form.category);

    if (image) {
      data.append("image", image);
    }

    try {
      if (editing) {
        await axios.put(`${API}/${editing}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Women's event updated.");
      } else {
        await axios.post(API, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Women's event created.");
      }

      clearForm();

      await loadEvents();
    } catch (err) {
      console.error(
        "Error saving Women's event:",
        err.response?.data || err.message,
      );

      alert(err.response?.data?.message || "Error saving event.");
    }
  };

  // --------------------------------------------------
  // EDIT EVENT
  // --------------------------------------------------

  const editEvent = (event) => {
    setEditing(event._id);

    setForm({
      title: event.title || "",

      description: event.description || "",

      // Keep date as YYYY-MM-DD.
      date: getDateOnly(event.date),

      startTime: event.startTime || "",

      endTime: event.endTime || "",

      location: event.location || "",

      category: event.category || "Meeting",
    });

    if (event.image) {
      setPreview(event.image);
    } else {
      setPreview("");
    }

    setImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // DELETE EVENT
  // --------------------------------------------------

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this Women's event?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Women's event deleted.");

      await loadEvents();
    } catch (err) {
      console.error(
        "Delete Women's event error:",
        err.response?.data || err.message,
      );

      alert(err.response?.data?.message || "Error deleting event.");
    }
  };

  // --------------------------------------------------
  // CLEAR FORM
  // --------------------------------------------------

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

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Women's Committee Events
        </h1>

        <p className="text-gray-500 mt-2">
          Create and manage Women's Committee events.
        </p>
      </div>

      {/* FORM */}

      <form
        onSubmit={saveEvent}
        className="
          bg-white
          rounded-2xl
          shadow-lg
          p-6
          space-y-5
        "
      >
        {/* TITLE */}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Event Title
          </label>

          <input
            name="title"
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-lg
            "
            required
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-lg
              h-32
            "
          />
        </div>

        {/* DATE */}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Event Date
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-lg
            "
            required
          />

          <p className="text-xs text-gray-500 mt-1">
            Date is stored as YYYY-MM-DD to prevent timezone changes.
          </p>
        </div>

        {/* TIME */}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Event Time
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="
                border
                p-3
                rounded-lg
              "
            />

            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="
                border
                p-3
                rounded-lg
              "
            />
          </div>
        </div>

        {/* LOCATION */}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Location
          </label>

          <input
            name="location"
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-lg
            "
          />
        </div>

        {/* CATEGORY */}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-lg
            "
          >
            <option value="Meeting">Meeting</option>

            <option value="Training">Training</option>

            <option value="Community Event">Community Event</option>

            <option value="Fundraiser">Fundraiser</option>
          </select>
        </div>

        {/* IMAGE */}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Event Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="
              w-full
              border
              p-3
              rounded-lg
            "
          />
        </div>

        {/* IMAGE PREVIEW */}

        {preview && (
          <div>
            <p className="font-semibold text-gray-700 mb-2">Image Preview</p>

            <img
              src={preview}
              alt="Event Preview"
              className="
                w-64
                h-40
                object-cover
                rounded-xl
              "
            />
          </div>
        )}

        {/* BUTTONS */}

        <div className="flex gap-3">
          <button
            type="submit"
            className="
              bg-primary
              text-white
              px-6
              py-3
              rounded-lg
              hover:opacity-90
              transition
            "
          >
            {editing ? "Update Event" : "Save Event"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={clearForm}
              className="
                border
                px-6
                py-3
                rounded-lg
                hover:bg-gray-50
              "
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* EXISTING EVENTS */}

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Existing Women's Events</h2>

        {events.length === 0 ? (
          <div
            className="
            bg-white
            rounded-2xl
            shadow
            p-8
            text-center
            text-gray-500
          "
          >
            No Women's Committee events found.
          </div>
        ) : (
          <div className="space-y-5">
            {events.map((event) => (
              <div
                key={event._id}
                className="
                  bg-white
                  rounded-2xl
                  shadow
                  p-5
                  flex
                  flex-col
                  md:flex-row
                  gap-6
                "
              >
                {/* IMAGE */}

                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="
                      w-full
                      md:w-40
                      h-48
                      md:h-28
                      object-cover
                      rounded-xl
                    "
                  />
                )}

                {/* INFORMATION */}

                <div className="flex-1">
                  <h3 className="text-xl font-bold">{event.title}</h3>

                  {/* DATE */}

                  <p className="text-gray-500 mt-2">
                    📅 {formatEventDate(event.date)}
                  </p>

                  {/* LOCATION */}

                  {event.location && (
                    <p className="mt-1">📍 {event.location}</p>
                  )}

                  {/* TIME */}

                  {(event.startTime || event.endTime) && (
                    <p className="mt-1">
                      ⏰ {formatTimeRange(event.startTime, event.endTime)}
                    </p>
                  )}

                  {/* CATEGORY */}

                  {event.category && (
                    <p className="mt-1">🏷 {event.category}</p>
                  )}

                  {/* DESCRIPTION */}

                  {event.description && (
                    <p className="mt-3 text-gray-600">{event.description}</p>
                  )}
                </div>

                {/* ACTIONS */}

                <div
                  className="
                    flex
                    md:flex-col
                    gap-3
                    md:justify-start
                  "
                >
                  <button
                    type="button"
                    onClick={() => editEvent(event)}
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteEvent(event._id)}
                    className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
