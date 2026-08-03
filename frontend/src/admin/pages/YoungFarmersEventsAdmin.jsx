import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/young-farmer-events";

export default function YoungFarmersEventsAdmin() {
  const [events, setEvents] = useState([]);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await axios.get(API);

      setEvents(res.data);
    } catch (err) {
      console.error("Loading events failed", err);
    }
  };

  const imageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `https://acfb.onrender.com${image}`;
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

      date: event.date ? event.date.substring(0, 10) : "",

      location: event.location || "",

      description: event.description || "",
    });

    if (event.image) {
      setPreview(imageUrl(event.image));
    }

    setImage(null);
  };

  const deleteEvent = async (id) => {
    if (!confirm("Delete event?")) return;

    try {
      await axios.delete(`${API}/${id}`);

      loadEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const clearForm = () => {
    setForm({
      title: "",

      date: "",

      location: "",

      description: "",
    });

    setImage(null);

    setPreview("");

    setEditing(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Young Farmers Events Admin</h1>

      <form
        onSubmit={saveEvent}
        className="
bg-white
shadow-lg
rounded-xl
p-6
max-w-xl
space-y-4
"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="
border
p-3
rounded
w-full
"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="
border
p-3
rounded
w-full
"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="
border
p-3
rounded
w-full
"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="
border
p-3
rounded
w-full
"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="
border
p-3
rounded
w-full
"
        />

        {preview && (
          <img
            src={preview}
            className="
w-64
h-40
object-cover
rounded-xl
"
          />
        )}

        <div className="flex gap-3">
          <button
            className="
bg-orange-700
text-white
px-6
py-3
rounded-lg
"
          >
            {editing ? "Update Event" : "Add Event"}
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
"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div
        className="
grid
md:grid-cols-3
gap-6
mt-10
"
      >
        {events.map((event) => (
          <div
            key={event._id}
            className="
bg-white
shadow-lg
rounded-xl
p-5
"
          >
            {event.image && (
              <img
                src={imageUrl(event.image)}
                alt={event.title}
                className="
w-full
h-48
object-cover
rounded-xl
mb-4
"
              />
            )}

            <h2 className="text-xl font-bold">{event.title}</h2>

            <p>📅 {new Date(event.date).toLocaleDateString()}</p>

            <p>📍 {event.location}</p>

            <p className="mt-2 text-gray-600">{event.description}</p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => editEvent(event)}
                className="
bg-blue-600
text-white
px-4
py-2
rounded
"
              >
                Edit
              </button>

              <button
                onClick={() => deleteEvent(event._id)}
                className="
bg-red-600
text-white
px-4
py-2
rounded
"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
