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
     console.log("Dashboard Error:", err.response?.data || err.message);
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
    <div
      className="
p-6
bg-gray-50
min-h-screen
"
    >
      <h1
        className="
text-4xl
font-bold
text-gray-800
mb-2
"
      >
        Farm Bureau Dashboard
      </h1>

      <p
        className="
text-gray-600
mb-10
"
      >
        Manage your website content and programs.
      </p>

      <div
        className="
grid
sm:grid-cols-2
lg:grid-cols-3
gap-6
"
      >
        {cards.map((card) => (
          <Link key={card.title} to={card.link}>
            <div
              className={`
${card.color}
text-white
rounded-3xl
p-6
shadow-xl
hover:-translate-y-2
transition
duration-300
`}
            >
              <div
                className="
text-4xl
mb-4
"
              >
                {card.icon}
              </div>

              <h2
                className="
text-xl
font-bold
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
            </div>
          </Link>
        ))}
      </div>

      <div
        className="
mt-12
bg-white
rounded-3xl
shadow
p-8
"
      >
        <h2
          className="
text-2xl
font-bold
mb-6
"
        >
          Quick Actions
        </h2>

        <div
          className="
flex
flex-wrap
gap-4
"
        >
          <Link
            to="/admin/news"
            className="
bg-primary
text-white
px-6
py-3
rounded-xl
"
          >
            + Add News
          </Link>

          <Link
            to="/admin/events"
            className="
bg-primary
text-white
px-6
py-3
rounded-xl
"
          >
            + Add Event
          </Link>

          <Link
            to="/admin/gallery"
            className="
bg-primary
text-white
px-6
py-3
rounded-xl
"
          >
            + Upload Photo
          </Link>
        </div>
      </div>
    </div>
  );
}
