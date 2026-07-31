import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/young-farmer-news";

export default function YoungFarmerNewsAdmin() {
  const [news, setNews] = useState([]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    date: "",
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const res = await axios.get(API);

    setNews(res.data);
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
      content: "",
      date: "",
    });

    loadNews();
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);

    loadNews();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Young Farmers News</h1>

      <form
        onSubmit={save}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={change}
          className="border p-3 rounded w-full"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
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

        <button className="bg-primary text-white px-5 py-3 rounded">
          Add News
        </button>
      </form>

      {news.map((n) => (
        <div key={n._id} className="bg-white shadow rounded-xl p-5 mt-5">
          <h2 className="font-bold text-xl">{n.title}</h2>

          <p>{n.content}</p>

          <button
            onClick={() => remove(n._id)}
            className="bg-red-600 text-white px-4 py-2 rounded mt-3"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
