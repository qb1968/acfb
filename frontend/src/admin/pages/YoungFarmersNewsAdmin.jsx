import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/young-farmer-news";

export default function YoungFarmersNewsAdmin() {
  const [news, setNews] = useState([]);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const res = await axios.get(API);

      setNews(res.data);
    } catch (err) {
      console.error("Loading news failed", err);
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

  const saveNews = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", form.title);

    data.append("description", form.description);

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

      loadNews();
    } catch (err) {
      console.error(err);

      alert("Error saving news");
    }
  };

  const editNews = (item) => {
    setEditing(item._id);

    setForm({
      title: item.title || "",

      description: item.description || "",
    });

    if (item.image) {
      setPreview(imageUrl(item.image));
    }

    setImage(null);
  };

  const deleteNews = async (id) => {
    if (!confirm("Delete news?")) return;

    try {
      await axios.delete(`${API}/${id}`);

      loadNews();
    } catch (err) {
      console.error(err);
    }
  };

  const clearForm = () => {
    setForm({
      title: "",

      description: "",
    });

    setImage(null);

    setPreview("");

    setEditing(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Young Farmers News Admin</h1>

      <form
        onSubmit={saveNews}
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
          placeholder="News Title"
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
h-32
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
bg-green-700
text-white
px-6
py-3
rounded-lg
"
          >
            {editing ? "Update News" : "Add News"}
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
        {news.map((item) => (
          <div
            key={item._id}
            className="
bg-white
shadow-lg
rounded-xl
p-5
"
          >
            {item.image && (
              <img
                src={imageUrl(item.image)}
                alt={item.title}
                className="
w-full
h-48
object-cover
rounded-xl
mb-4
"
              />
            )}

            <h2 className="font-bold text-xl">{item.title}</h2>

            <p className="text-gray-600 mt-2">{item.description}</p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => editNews(item)}
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
                onClick={() => deleteNews(item._id)}
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
