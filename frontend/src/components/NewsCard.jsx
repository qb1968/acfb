import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CommunityNewsCard() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const res = await axios.get("https://acfb.onrender.com/api/news");

      setNews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link to="/community">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition shadow-lg h-full">
        <h3 className="font-bold text-lg mb-3">Community News</h3>

        <p className="text-sm text-gray-200">📰 {news.length} News Articles</p>

        {news.length > 0 && (
          <p className="text-sm text-gray-200 mt-2">Latest: {news[0].title}</p>
        )}

        <p className="text-sm mt-4 text-white font-semibold">View News →</p>
      </div>
    </Link>
  );
}
