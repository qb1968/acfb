import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NewsCard() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const res = await axios.get("https://acfb.onrender.com/api/news");

      setNews(res.data);
    } catch (err) {
      console.error("News loading error:", err);
    }
  };

  const latestNews = news[0];

  return (
    <Link to="/community">
      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-xl
          border
          border-gray-200
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all
          duration-300
          h-full
        "
      >
        {/* COLOR ACCENT */}

        <div className="h-2 bg-amber-600"></div>

        {/* HEADER */}

        <div className="bg-amber-600 px-6 py-5">
          <div className="flex items-center gap-3">
            <div
              className="
                bg-white/20
                h-12
                w-12
                rounded-full
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              📰
            </div>

            <div>
              <h3 className="text-white text-xl font-bold">Community News</h3>

              <p className="text-amber-100 text-sm">
                Updates • Stories • Announcements
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}

        <div className="p-6 space-y-5">
          {/* NEWS COUNT */}

          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">News Articles</span>

            <span
              className="
                bg-amber-100
                text-amber-700
                font-bold
                px-3
                py-1
                rounded-full
              "
            >
              {news.length}
            </span>
          </div>

          {latestNews ? (
            <>
              <div>
                <p
                  className="
                    text-sm
                    text-gray-500
                    uppercase
                    tracking-wide
                  "
                >
                  Latest Update
                </p>

                <h4
                  className="
                    text-lg
                    font-bold
                    text-gray-800
                    mt-1
                  "
                >
                  📰 {latestNews.title}
                </h4>
              </div>

              {latestNews.description && (
                <p
                  className="
                    text-gray-600
                    text-sm
                    line-clamp-3
                  "
                >
                  {latestNews.description}
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-5xl mb-3">📰</div>

              <p className="text-gray-500">No news available.</p>
            </div>
          )}

          {/* FOOTER */}

          <div className="border-t pt-5">
            <div className="flex items-center justify-between">
              <span
                className="
                  font-semibold
                  text-amber-700
                "
              >
                Read News
              </span>

              <div
                className="
                  bg-amber-600
                  text-white
                  rounded-full
                  h-10
                  w-10
                  flex
                  items-center
                  justify-center
                  hover:bg-amber-700
                  transition
                "
              >
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
