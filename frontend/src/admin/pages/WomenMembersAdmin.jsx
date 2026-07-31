import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/women-members";

export default function WomenMembersAdmin() {
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    position: "",
    location: "",
    description: "",
    order: 99,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [editing, setEditing] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const res = await axios.get(API);

      setMembers(res.data);
    } catch (err) {
      console.error("Error loading women members", err);
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

  const saveMember = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name);

    data.append("position", form.position);

    data.append("location", form.location);

    data.append("description", form.description);

    data.append("order", form.order);

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
      } else {
        await axios.post(API, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      clearForm();

      loadMembers();
    } catch (err) {
      console.error(err);

      alert("Error saving member");
    }
  };

  const editMember = (member) => {
    setEditing(member._id);

    setForm({
      name: member.name,

      position: member.position,

      location: member.location || "",

      description: member.description || "",

      order: member.order || 99,
    });

    if (member.image) {
      setPreview(`https://acfb.onrender.com${member.image}`);
    }

    setImage(null);
  };

  const deleteMember = async (id) => {
    if (!confirm("Delete this member?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadMembers();
    } catch (err) {
      console.error(err);
    }
  };

  const clearForm = () => {
    setEditing(null);

    setForm({
      name: "",
      position: "",
      location: "",
      description: "",
      order: 99,
    });

    setImage(null);

    setPreview("");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Women's Committee Members</h1>

      <form
        onSubmit={saveMember}
        className="bg-white rounded-2xl shadow-lg p-6 space-y-5"
      >
        <input
          name="name"
          placeholder="Member Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="order"
          value={form.order}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="1">Chairperson</option>

          <option value="2">Vice Chair</option>

          <option value="3">Secretary/Treasurer</option>

          <option value="99">Member</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-32"
        />

        <label className="font-semibold">Photo</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full border p-3 rounded-lg"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-xl mt-4"
          />
        )}

        <div className="flex gap-3">
          <button className="bg-primary text-white px-6 py-3 rounded-lg">
            {editing ? "Update Member" : "Add Member"}
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
        <h2 className="text-2xl font-bold mb-6">Current Members</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member._id} className="bg-white rounded-2xl shadow p-5">
              {member.image && (
                <img
                  src={`https://acfb.onrender.com${member.image}`}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}

              <h3 className="text-xl font-bold text-primary">{member.name}</h3>

              <p className="font-semibold">{member.position}</p>

              <p className="text-gray-600">📍 {member.location}</p>

              <p className="text-gray-600 mt-2">{member.description}</p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => editMember(member)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMember(member._id)}
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
