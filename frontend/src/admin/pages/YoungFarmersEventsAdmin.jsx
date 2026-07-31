import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/young-farmer-events";

export default function YoungFarmerEventsAdmin() {
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(API);

    setEvents(res.data);
  };

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const save = async (e) => {
    e.preventDefault();

    await axios.post(API, form);

    setForm({
      title: "",
      description: "",
      date: "",
      location: "",
    });

    load();
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);

    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Young Farmers Events</h1>

      <form
        onSubmit={save}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={change}
          className="border p-3 rounded w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={change}
          className="border p-3 rounded w-full"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={change}
          className="border p-3 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={change}
          className="border p-3 rounded w-full"
        />

        <button className="bg-primary text-white px-5 py-3 rounded">
          Add Event
        </button>
      </form>

      {events.map((e) => (
        <div key={e._id} className="bg-white shadow rounded-xl p-5 mt-5">
          <h2 className="font-bold text-xl">{e.title}</h2>

          <p>{e.location}</p>

          <button
            onClick={() => remove(e._id)}
            className="bg-red-600 text-white px-4 py-2 rounded mt-3"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
