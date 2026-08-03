import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/women-news";

export default function WomenNewsAdmin() {
  const [news, setNews] = useState([]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    date: "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [editing, setEditing] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const res = await axios.get(API);

      setNews(res.data);
    } catch (err) {
      console.error("Loading women's news failed", err);
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

  const saveNews = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", form.title);

    data.append("content", form.content);

    data.append("date", form.date);

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

      loadNews();
    } catch (err) {
      console.error(err);

      alert("Error saving Women's news");
    }
  };

  const editNews = (item) => {
    setEditing(item._id);

    setForm({
      title: item.title || "",

      content: item.content || "",

      date: item.date ? item.date.substring(0, 10) : "",
    });

    if (item.image) {
      setPreview(item.image);
    }

    setImage(null);
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Delete this news item?")) return;

    try {
      await axios.delete(
        `${API}/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      loadNews();
    } catch (err) {
      console.error(err);
    }
  };

  const clearForm = () => {
    setEditing(null);

    setForm({
      title: "",

      content: "",

      date: "",
    });

    setImage(null);

    setPreview("");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Women's Committee News</h1>

      <form
        onSubmit={saveNews}
        className="
          bg-white
          rounded-2xl
          shadow-lg
          p-6
          space-y-5
        "
      >
        <input
          name="title"
          placeholder="News Title"
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

        <textarea
          name="content"
          placeholder="News Content"
          value={form.content}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            h-40
          "
          required
        />

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

        {preview && (
          <img
            src={preview}
            alt="Preview"
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
              bg-primary
              text-white
              px-6
              py-3
              rounded-lg
            "
          >
            {editing ? "Update News" : "Save News"}
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

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Existing Women's News</h2>

        <div className="space-y-5">
          {news.map((item) => (
            <div
              key={item._id}
              className="
                bg-white
                rounded-2xl
                shadow
                p-5
                flex
                gap-6
              "
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    w-40
                    h-28
                    object-cover
                    rounded-xl
                  "
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
                  className="
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNews(item._id)}
                  className="
                    bg-red-600
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
      </section>
    </div>
  );
}
