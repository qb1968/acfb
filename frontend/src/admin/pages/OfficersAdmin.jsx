import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/officers";

export default function OfficersAdmin() {
  const [officers, setOfficers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    position: "",
    county: "",
    location: "",
    commodities: "",
    type: "Member",
    order: 99,
  });

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadOfficers();
  }, []);

  // LOAD OFFICERS
  const loadOfficers = async () => {
    try {
      const res = await axios.get(API);

      setOfficers(res.data);
    } catch (err) {
      console.error("Error loading officers:", err);
    }
  };

  // HANDLE INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE / UPDATE
  const saveOfficer = async (e) => {
    e.preventDefault();

    try {
      const officerData = {
        ...form,
        order: Number(form.order),
      };

      if (editing) {
        await axios.put(`${API}/${editing}`, officerData);

        alert("Officer updated");
      } else {
        await axios.post(API, officerData);

        alert("Officer added");
      }

      clearForm();

      loadOfficers();
    } catch (err) {
      console.error("Save error:", err.response?.data || err);

      alert("Error saving officer");
    }
  };

  // EDIT
  const editOfficer = (officer) => {
    setEditing(officer._id);

    setForm({
      name: officer.name || "",
      position: officer.position || "",
      county: officer.county || "",
      location: officer.location || "",
      commodities: officer.commodities || "",
      type: officer.type || "Member",
      order: officer.order || 99,
    });
  };

  // DELETE
  const deleteOfficer = async (id) => {
    if (!window.confirm("Delete officer?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);

      alert("Officer deleted");

      loadOfficers();
    } catch (err) {
      console.error(err);

      alert("Delete failed");
    }
  };

  // CLEAR FORM
  const clearForm = () => {
    setEditing(null);

    setForm({
      name: "",
      position: "",
      county: "",
      location: "",
      commodities: "",
      type: "Member",
      order: 99,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Officer Administration</h1>

      {/* FORM */}

      <form
        onSubmit={saveOfficer}
        className="bg-white shadow rounded-xl p-6 space-y-4 max-w-xl"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        {/* ORDER */}

        <label className="font-semibold">Display Order</label>

        <select
          name="order"
          value={form.order}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option value="1">President</option>

          <option value="2">Vice-President</option>

          <option value="3">Secretary/Treasurer</option>

          <option value="99">Member</option>
        </select>

        {/* TYPE */}

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option value="Officer">Officer</option>

          <option value="Member">Member</option>
        </select>

        <input
          name="county"
          placeholder="County"
          value={form.county}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <textarea
          name="commodities"
          placeholder="Commodities"
          value={form.commodities}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <div className="flex gap-3">
          <button className="bg-primary text-white px-6 py-3 rounded">
            {editing ? "Update Officer" : "Add Officer"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={clearForm}
              className="border px-6 py-3 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* OFFICER LIST */}

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {officers.map((o) => (
          <div key={o._id} className="bg-white shadow rounded-xl p-5">
            <h2 className="font-bold text-xl text-primary">{o.name}</h2>

            <p className="font-semibold">{o.position}</p>

            <p>📍 {o.location}</p>

            <p>🌱 {o.commodities}</p>

            <p className="text-sm text-gray-500 mt-2">Order: {o.order}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => editOfficer(o)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteOfficer(o._id)}
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
