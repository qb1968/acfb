import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/women-members";

const getImageUrl = (image) => {
if (!image) return "";

if (image.startsWith("http")) {
return image;
}

return `https://acfb.onrender.com${image}`;
};

export default function WomenMembersAdmin() {
const [members, setMembers] = useState([]);

const [form, setForm] = useState({
name: "",
title: "Committee Member",
location: "",
bio: "",
order: 99,
});

const [image, setImage] = useState(null);
const [preview, setPreview] = useState("");

const [editing, setEditing] = useState(null);
const [loading, setLoading] = useState(false);

const token = localStorage.getItem("token");

useEffect(() => {
loadMembers();
}, []);

const loadMembers = async () => {
try {
const res = await axios.get(API);


  const sortedMembers = [...res.data].sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99)
  );

  setMembers(sortedMembers);
} catch (err) {
  console.error(
    "Error loading women members:",
    err.response?.data || err.message
  );
}


};

const handleChange = (e) => {
setForm((current) => ({
...current,
[e.target.name]: e.target.value,
}));
};

const handleImage = (e) => {
const file = e.target.files?.[0];


if (!file) {
  return;
}

setImage(file);
setPreview(URL.createObjectURL(file));


};

const saveMember = async (e) => {
e.preventDefault();


if (!form.name.trim()) {
  alert("Please enter the member's name.");
  return;
}

try {
  setLoading(true);

  const data = new FormData();

  data.append("name", form.name.trim());
  data.append("title", form.title);
  data.append("location", form.location);
  data.append("bio", form.bio);
  data.append("order", Number(form.order));

  if (image) {
    data.append("image", image);
  }

  if (editing) {
    await axios.put(`${API}/${editing}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    await axios.post(API, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  await loadMembers();

  const wasEditing = editing;

  clearForm();

  alert(
    wasEditing
      ? "Member updated successfully."
      : "Member added successfully."
  );
} catch (err) {
  console.error(
    "Error saving women member:",
    err.response?.data || err.message
  );

  alert(
    err.response?.data?.message ||
      "Error saving women member."
  );
} finally {
  setLoading(false);
}


};

const editMember = (member) => {
setEditing(member._id);


setForm({
  name: member.name || "",
  title: member.title || "Committee Member",
  location: member.location || "",
  bio: member.bio || "",
  order: member.order ?? 99,
});

if (member.image) {
  setPreview(getImageUrl(member.image));
} else {
  setPreview("");
}

setImage(null);

window.scrollTo({
  top: 0,
  behavior: "smooth",
});


};

const deleteMember = async (id, name) => {
const confirmed = window.confirm(
`Are you sure you want to delete ${name}?`
);


if (!confirmed) {
  return;
}

try {
  await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setMembers((current) =>
    current.filter((member) => member._id !== id)
  );
} catch (err) {
  console.error(
    "Error deleting women member:",
    err.response?.data || err.message
  );

  alert(
    err.response?.data?.message ||
      "Unable to delete member."
  );
}


};

const clearForm = () => {
setEditing(null);


setForm({
  name: "",
  title: "Committee Member",
  location: "",
  bio: "",
  order: 99,
});

setImage(null);
setPreview("");


};

return ( <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


  <div className="mb-8">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
      Women's Committee Members
    </h1>

    <p className="mt-2 text-gray-600">
      Add and manage Women's Committee members.
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {editing ? "Edit Committee Member" : "Add Committee Member"}
      </h2>

      <p className="text-gray-500 mt-1">
        Enter the member's information below.
      </p>
    </div>

    <form
      onSubmit={saveMember}
      className="space-y-5"
    >

      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Member Name"
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Position / Title
        </label>

        <select
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="Chairperson">
            Chairperson
          </option>

          <option value="Vice Chair">
            Vice Chair
          </option>

          <option value="Secretary/Treasurer">
            Secretary/Treasurer
          </option>

          <option value="Committee Member">
            Committee Member
          </option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Display Order
        </label>

        <select
          name="order"
          value={form.order}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="1">
            1 - Chairperson
          </option>

          <option value="2">
            2 - Vice Chair
          </option>

          <option value="3">
            3 - Secretary/Treasurer
          </option>

          <option value="99">
            99 - Committee Member
          </option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Location
        </label>

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Bio
        </label>

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Short biography or description"
          rows="5"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Photo
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
      </div>

      {preview && (
        <div>
          <p className="font-semibold text-gray-700 mb-2">
            Photo Preview
          </p>

          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-contain bg-gray-100 rounded-xl border"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3">

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading
            ? "Saving..."
            : editing
              ? "Update Member"
              : "Add Member"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={clearForm}
            className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  </div>

  <section>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Current Members
        </h2>

        <p className="text-gray-500 mt-1">
          {members.length} member
          {members.length !== 1 ? "s" : ""}
        </p>
      </div>

      <button
        type="button"
        onClick={loadMembers}
        className="border border-gray-300 px-5 py-2 rounded-lg font-semibold hover:bg-gray-50"
      >
        Refresh
      </button>

    </div>

    {members.length === 0 ? (
      <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
        No Women's Committee members found.
      </div>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {members.map((member) => (

          <div
            key={member._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            {member.image ? (
              <div className="bg-gray-100 flex items-center justify-center">
                <img
                  src={getImageUrl(member.image)}
                  alt={member.name}
                  className="w-full h-64 object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-5xl">
                👩‍🌾
              </div>
            )}

            <div className="p-5">

              <h3 className="text-xl font-bold text-primary">
                {member.name}
              </h3>

              <p className="mt-2 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                {member.title || "Committee Member"}
              </p>

              {member.location && (
                <p className="text-gray-600 mt-3">
                  📍 {member.location}
                </p>
              )}

              {member.bio && (
                <p className="text-gray-600 mt-3">
                  {member.bio}
                </p>
              )}

              <div className="flex gap-3 mt-5">

                <button
                  type="button"
                  onClick={() => editMember(member)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteMember(
                      member._id,
                      member.name
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>
    )}

  </section>

</div>


);
}
