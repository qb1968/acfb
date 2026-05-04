import { useEffect, useState } from "react";

export default function Community() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews([
      {
        id: 1,
        title: "Farm Safety Awareness Week",
        date: "May 2026",
        content:
          "Join local farmers and community members in promoting farm safety practices across rural areas.",
      },
      {
        id: 2,
        title: "New Agricultural Grants Available",
        date: "April 2026",
        content:
          "State programs now offer expanded funding opportunities for small and mid-size farms.",
      },
      {
        id: 3,
        title: "Community Spring Event",
        date: "March 2026",
        content:
          "Families gathered for a celebration of local agriculture, food, and education.",
      },
    ]);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/farm.png')" }}
    >
      {/* DARK OVERLAY */}
      <div className="min-h-screen bg-black/80 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-10 text-white">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Community Involvement
            </h1>

            <p className="text-gray-200 mt-3 max-w-3xl mx-auto">
              Alamance County Farm Bureau supports the community in many ways.
              We have donated money, assisted with school programs, sponsored
              scholarships, conducted “Homegrown Tours,” and much more.
            </p>
          </div>

          {/* NEWS GRID */}
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition p-6 border border-white/20 text-white"
              >
                <p className="text-xs text-gray-300 mb-2">{item.date}</p>

                <h2 className="text-xl font-bold mb-3">{item.title}</h2>

                <p className="text-gray-200 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
