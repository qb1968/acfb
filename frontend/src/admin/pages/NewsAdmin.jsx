import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/news";

export default function NewsAdmin() {
  const [news, setNews] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNews();
  }, []);

  // GET NEWS
  const fetchNews = async () => {
    try {
      const res = await axios.get(API);

      setNews(res.data);
    } catch (err) {
      console.error("Error loading news:", err);
    }
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("News updated!");
      } else {
        await axios.post(API, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("News created!");
      }

      clearForm();
      fetchNews();
    } catch (err) {
      console.error(err);
      alert("Error saving news");
    }
  };

  // EDIT
  const editNews = (item) => {
    setEditingId(item._id);

    setTitle(item.title);
    setContent(item.content);

    setDate(item.date ? item.date.substring(0, 10) : "");

    if (item.image) {
      setPreview(`https://acfb.onrender.com${item.image}`);
    } else {
      setPreview("");
    }

    setImage(null);
  };

  // DELETE
  const deleteNews = async (id) => {
    if (!window.confirm("Delete this news item?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("News deleted");

      fetchNews();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // IMAGE SELECT
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // RESET FORM
  const clearForm = () => {
    setEditingId(null);

    setTitle("");
    setContent("");
    setDate("");

    setImage(null);
    setPreview("");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        {editingId ? "Edit News" : "News Administration"}
      </h1>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 space-y-5"
      >
        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          placeholder="News Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-3 rounded-lg h-40"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <div>
          <label className="block font-semibold mb-2">Featured Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="border p-3 rounded-lg w-full"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-64 h-40 object-cover rounded-xl shadow"
            />
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg"
          >
            {editingId ? "Update News" : "Save News"}
          </button>

          {editingId && (
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

      {/* NEWS LIST */}

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Existing News</h2>

        <div className="space-y-5">
          {news.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow p-5 flex gap-6"
            >
              {item.image && (
                <img
                  src={`https://acfb.onrender.com${item.image}`}
                  alt={item.title}
                  className="w-40 h-28 object-cover rounded-xl"
                />
              )}

              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="text-gray-500 text-sm">
                  {item.date && new Date(item.date).toLocaleDateString()}
                </p>

                <p className="mt-3 text-gray-700">{item.content}</p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => editNews(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNews(item._id)}
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
