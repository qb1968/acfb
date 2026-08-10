import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "https://acfb.onrender.com/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    news: 0,
    events: 0,
    officers: 0,
    gallery: 0,
    youngFarmers: 0,
    women: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [news, events, officers, gallery, youngFarmers, women] =
        await Promise.all([
          axios.get(`${API}/news`),
          axios.get(`${API}/events`),
          axios.get(`${API}/officers`),
          axios.get(`${API}/gallery`),
          axios.get(`${API}/young-farmers`),
          axios.get(`${API}/women-members`),
        ]);

      setStats({
        news: news.data.length,
        events: events.data.length,
        officers: officers.data.length,
        gallery: gallery.data.length,
        youngFarmers: youngFarmers.data.length,
        women: women.data.length,
      });
    } catch (err) {
      console.error("Dashboard Error:", err.response?.data || err.message);
    }
  };

  const cards = [
    {
      title: "News",
      count: stats.news,
      icon: "📰",
      link: "/admin/news",
      color: "bg-green-700",
    },

    {
      title: "Events",
      count: stats.events,
      icon: "📅",
      link: "/admin/events",
      color: "bg-blue-700",
    },

    {
      title: "Officers",
      count: stats.officers,
      icon: "👥",
      link: "/admin/officers",
      color: "bg-yellow-600",
    },

    {
      title: "Gallery",
      count: stats.gallery,
      icon: "📷",
      link: "/admin/gallery",
      color: "bg-purple-700",
    },

    {
      title: "Young Farmers",
      count: stats.youngFarmers,
      icon: "🌱",
      link: "/admin/young-farmers",
      color: "bg-emerald-700",
    },

    {
      title: "Women's Committee",
      count: stats.women,
      icon: "👩‍🌾",
      link: "/admin/women-members",
      color: "bg-pink-600",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* HEADER */}

      <div className="mb-10">
        <h1
          className="
          text-3xl
          sm:text-4xl
          font-bold
          text-gray-800
        "
        >
          Farm Bureau Dashboard
        </h1>

        <p
          className="
          text-gray-600
          mt-2
        "
        >
          Manage your website content and programs.
        </p>
      </div>

      {/* STAT CARDS */}

      <div
        className="
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
      >
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className={`
              ${card.color}
              text-white
              rounded-3xl
              p-6
              shadow-xl
              hover:-translate-y-2
              hover:shadow-2xl
              transition
              duration-300
              block
            `}
          >
            <div className="text-4xl">{card.icon}</div>

            <h2
              className="
              text-xl
              font-bold
              mt-4
            "
            >
              {card.title}
            </h2>

            <p
              className="
              text-5xl
              font-bold
              mt-3
            "
            >
              {card.count}
            </p>

            <p
              className="
              mt-3
              opacity-90
            "
            >
              Manage →
            </p>
          </Link>
        ))}
      </div>

      {/* QUICK ACTIONS */}

      <div
        className="
        mt-12
        bg-white
        rounded-3xl
        shadow-lg
        p-6
        sm:p-8
      "
      >
        <h2
          className="
          text-2xl
          font-bold
          text-gray-800
          mb-6
        "
        >
          Quick Actions
        </h2>

        <div
          className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
        >
          {/* ADD NEWS */}

          <Link
            to="/admin/news"
            className="
              bg-green-700
              hover:bg-green-800
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              text-center
              transition
            "
          >
            + Add News
          </Link>

          {/* ADD EVENT */}

          <Link
            to="/admin/events"
            className="
              bg-blue-700
              hover:bg-blue-800
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              text-center
              transition
            "
          >
            + Add Event
          </Link>

          {/* UPLOAD PHOTO */}

          <Link
            to="/admin/gallery"
            className="
              bg-purple-700
              hover:bg-purple-800
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              text-center
              transition
            "
          >
            + Upload Photo
          </Link>

          {/* CREATE ADMIN */}

          <Link
            to="/admin/admin-management"
            className="
              bg-gray-800
              hover:bg-gray-900
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              text-center
              transition
            "
          >
            + Create Admin
          </Link>
        </div>
      </div>

      {/* ADMIN MANAGEMENT NOTICE */}

      <div
        className="
        mt-8
        bg-green-50
        border
        border-green-200
        rounded-2xl
        p-6
      "
      >
        <div
          className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
        >
          <div>
            <h3
              className="
              text-lg
              font-bold
              text-green-800
            "
            >
              Administrator Accounts
            </h3>

            <p
              className="
              text-green-700
              mt-1
            "
            >
              Create and manage administrator access to the website.
            </p>
          </div>

          <Link
            to="/admin/admin-management"
            className="
              inline-flex
              justify-center
              bg-green-700
              hover:bg-green-800
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Manage Admins
          </Link>
        </div>
      </div>
    </div>
  );
}
