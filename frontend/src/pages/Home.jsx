import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UpcomingEvents from "../components/UpcomingEvents";

export default function Home() {
  const [latestNews, setLatestNews] = useState(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await axios.get("https://acfb.onrender.com/api/news");

        if (res.data.length > 0) {
          setLatestNews(res.data[0]);
        }
      } catch (err) {
        console.error("News loading error:", err);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="min-h-screen bg-[url('/farm.png')] bg-cover bg-center relative flex items-center py-20">
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE */}
          <div className="text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Supporting Agriculture & Community
            </h1>

            <p className="mt-4 text-gray-200 text-sm sm:text-base leading-relaxed max-w-xl">
              Welcome to the Alamance County Farm Bureau website. We hope you
              find our site useful and informative. We provide resources,
              membership benefits, agricultural advocacy, and community support
              for North Carolina residents and farming families.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-primary transition"
              >
                Learn More
              </Link>

              <Link
                to="/membership"
                className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-primary transition"
              >
                Membership
              </Link>
            </div>

            {/* FEATURE CARDS */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <Link to="/events">
                <UpcomingEvents />
              </Link>

              {/* COMMUNITY NEWS CARD */}
              <Link to="/community">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition shadow-lg">
                  <div className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Latest News
                  </div>

                  {latestNews ? (
                    <>
                      <h3 className="font-bold text-lg mb-2">
                        {latestNews.title}
                      </h3>

                      <p className="text-xs text-gray-300 mb-2">
                        {new Date(latestNews.date).toLocaleDateString()}
                      </p>

                      <p className="text-sm text-gray-200 line-clamp-3">
                        {latestNews.content}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold text-lg mb-1">Community News</h3>

                      <p className="text-sm text-gray-200">
                        Stay connected with local programs and initiatives.
                      </p>
                    </>
                  )}
                </div>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            {/* MISSION CARD */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>

              <p className="text-sm leading-relaxed text-gray-100">
                To develop, foster, promote and protect programs for the general
                welfare of farm people, including their economic, social, and
                educational well-being, while supporting agriculture and rural
                communities throughout North Carolina.
              </p>
            </div>

            {/* IMAGE CARD */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="/cows.png"
                alt="Farm"
                className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* QUICK LINKS */}
            <div className="grid grid-cols-2 gap-4">
              <Link to="/gallery">
                <div className="bg-white rounded-2xl p-5 text-center shadow-lg hover:shadow-2xl transition hover:-translate-y-1">
                  <h3 className="font-bold text-primary text-lg">Gallery</h3>

                  <p className="text-sm text-gray-600 mt-1">
                    View community and farm photos
                  </p>
                </div>
              </Link>

              <Link to="/contact">
                <div className="bg-white rounded-2xl p-5 text-center shadow-lg hover:shadow-2xl transition hover:-translate-y-1">
                  <h3 className="font-bold text-primary text-lg">Contact</h3>

                  <p className="text-sm text-gray-600 mt-1">
                    Get in touch with our office
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
