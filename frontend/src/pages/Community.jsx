import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/news";

export default function Community() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(API);

      setNews(res.data);
    } catch (err) {
      console.error("Error loading news:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/farm.png')" }}
    >
      {/* OVERLAY */}
      <div className="min-h-screen bg-black/80 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}

          <div className="text-center mb-10 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">
              Community News
            </h1>

            <p className="text-gray-200 mt-3 max-w-3xl mx-auto">
              Alamance County Farm Bureau supports the community in many ways.
              We have donated money, assisted with school programs, sponsored
              scholarships, conducted “Homegrown Tours,” and much more.
            </p>
          </div>

          {/* NEWS */}

          <div className="grid md:grid-cols-3 gap-6">
            {news.length === 0 && (
              <p className="text-white col-span-3 text-center">
                No community news available.
              </p>
            )}

            {news.map((item) => (
              <div
                key={item._id}
                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition border border-white/20 overflow-hidden text-white"
              >
                {/* IMAGE */}

                {item.image && (
                  <img
                    src={`https://acfb.onrender.com${item.image}`}
                    alt={item.title}
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-6">
                  <p className="text-xs text-gray-300 mb-2">
                    {item.date && new Date(item.date).toLocaleDateString()}
                  </p>

                  <h2 className="text-xl font-bold mb-3">{item.title}</h2>

                  <p className="text-gray-200 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
