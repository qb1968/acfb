import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WomenCard() {
  const [members, setMembers] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const membersRes = await axios.get(
        "https://acfb.onrender.com/api/women-members",
      );

      const newsRes = await axios.get(
        "https://acfb.onrender.com/api/women-news",
      );

      const eventsRes = await axios.get(
        "https://acfb.onrender.com/api/women-events",
      );

      setMembers(membersRes.data);

      setNews(newsRes.data);

      setEvents(eventsRes.data);
    } catch (err) {
      console.error("Women loading error:", err);
    }
  };

  const latestNews = news[0];

  const nextEvent = events[0];

  return (
    <Link to="/women">
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

        <div className="h-2 bg-rose-800"></div>

        {/* HEADER */}

        <div className="bg-rose-800 px-6 py-5">
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
              👩‍🌾
            </div>

            <div>
              <h3 className="text-white text-xl font-bold">
                Women's Committee
              </h3>

              <p className="text-rose-100 text-sm">
                Leadership • Community • Agriculture
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}

        <div className="p-6 space-y-5">
          {/* MEMBER COUNT */}

          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Committee Members</span>

            <span
              className="
                bg-rose-100
                text-rose-800
                font-bold
                px-3
                py-1
                rounded-full
              "
            >
              {members.length}
            </span>
          </div>

          {/* NEWS */}

          {latestNews && (
            <div>
              <p
                className="
                  text-sm
                  text-gray-500
                  uppercase
                  tracking-wide
                "
              >
                Latest News
              </p>

              <h4
                className="
                  font-bold
                  text-gray-800
                  mt-1
                "
              >
                📰 {latestNews.title}
              </h4>
            </div>
          )}

          {/* EVENT */}

          {nextEvent && (
            <div>
              <p
                className="
                  text-sm
                  text-gray-500
                  uppercase
                  tracking-wide
                "
              >
                Upcoming Event
              </p>

              <h4
                className="
                  font-bold
                  text-gray-800
                  mt-1
                "
              >
                📅 {nextEvent.title}
              </h4>
            </div>
          )}

          {!latestNews && !nextEvent && (
            <p className="text-gray-500">
              Supporting women in agriculture, education, and community
              programs.
            </p>
          )}

          {/* FOOTER */}

          <div className="border-t pt-5">
            <div className="flex items-center justify-between">
              <span
                className="
                  font-semibold
                  text-rose-800
                "
              >
                Learn More
              </span>

              <div
                className="
                  bg-rose-800
                  text-white
                  rounded-full
                  h-10
                  w-10
                  flex
                  items-center
                  justify-center
                  hover:bg-rose-900
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
