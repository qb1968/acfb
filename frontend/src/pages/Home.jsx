import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* MAIN LAYOUT */}
      <div className="h-full bg-[url('/farm.png')] bg-cover bg-center relative flex items-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* CONTENT WRAPPER */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT HERO */}
          <div className="text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Supporting Agriculture & Community
            </h1>

            <p className="mt-4 text-gray-200 text-sm md:text-base leading-relaxed">
              Farm Bureau provides agricultural support, membership benefits,
              and community programs across North Carolina.
            </p>

            <div className="mt-6 flex gap-3">
              <button className="bg-accent text-primary px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
                Learn More
              </button>

              <Link
                to="/membership"
                className="border border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-primary transition"
              >
                Membership
              </Link>
            </div>
          </div>

          {/* RIGHT STACKED CARDS */}
          <div className="space-y-4">
            {/* Mission Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
              <h2 className="text-lg font-bold mb-2">Our Mission</h2>

              <p className="text-xs text-gray-200 leading-relaxed">
                To develop, foster, promote and protect programs for the general
                welfare of farm people and rural communities.
              </p>
            </div>

            {/* Image Card */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/cows.png"
                alt="Farm"
                className="w-full h-[240px] object-cover"
              />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Link to="/events">
                <div className="bg-white/90 rounded-xl p-3 text-center shadow hover:shadow-lg transition cursor-pointer">
                  <h3 className="font-bold text-primary text-sm">Calendar</h3>
                  <p className="text-xs text-gray-600">Upcoming events</p>
                </div>
              </Link>
<Link to="/community">
              <div className="bg-white/90 rounded-xl p-3 text-center shadow">
                
                <h3 className="font-bold text-primary text-sm">Community</h3>
                <p className="text-xs text-gray-600">Local programs</p>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
