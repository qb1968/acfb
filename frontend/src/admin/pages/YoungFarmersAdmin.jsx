import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/young-farmers";

export default function YoungFarmersAdmin() {
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    position: "",
    location: "",
    commodities: "",
    bio: "",
    order: 99,
  });

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const res = await axios.get(API);

      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveMember = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      order: Number(form.order),
    };

    try {
      if (editing) {
        await axios.put(`${API}/${editing}`, data);
      } else {
        await axios.post(API, data);
      }

      clearForm();

      loadMembers();
    } catch (err) {
      console.log(err);
    }
  };

  const editMember = (m) => {
    setEditing(m._id);

    setForm({
      name: m.name || "",
      position: m.position || "",
      location: m.location || "",
      commodities: m.commodities || "",
      bio: m.bio || "",
      order: m.order || 99,
    });
  };

  const deleteMember = async (id) => {
    if (!confirm("Delete member?")) return;

    await axios.delete(`${API}/${id}`);

    loadMembers();
  };

  const clearForm = () => {
    setEditing(null);

    setForm({
      name: "",
      position: "",
      location: "",
      commodities: "",
      bio: "",
      order: 99,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Young Farmers Committee</h1>

      <form
        onSubmit={saveMember}
        className="bg-white shadow rounded-xl p-6 space-y-4 max-w-xl"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <select
          name="order"
          value={form.order}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option value="1">Chairman</option>

          <option value="2">Vice Chairman</option>

          <option value="3">Secretary</option>

          <option value="99">Member</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="commodities"
          placeholder="Commodities"
          value={form.commodities}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <textarea
          name="bio"
          placeholder="Biography"
          value={form.bio}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <button className="bg-primary text-white px-6 py-3 rounded">
          {editing ? "Update Member" : "Add Member"}
        </button>
      </form>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {members.map((m) => (
          <div key={m._id} className="bg-white shadow rounded-xl p-5">
            <h2 className="text-xl font-bold">{m.name}</h2>

            <p>{m.position}</p>

            <p>{m.location}</p>

            <p>{m.commodities}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => editMember(m)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteMember(m._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
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
