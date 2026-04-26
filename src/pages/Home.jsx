import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col">

      {/* HERO + CONTENT WRAPPER */}
      <div className="relative flex-1 bg-[url('/farm.png')] bg-cover bg-center flex items-center">

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/85"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-10 items-center text-white">

          {/* LEFT: HERO TEXT */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Supporting Agriculture & Community
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-100 leading-relaxed">
              Welcome to the Farm Bureau website. We provide agricultural support,
              membership benefits, and community resources for North Carolina residents.
            </p>

            {/* CTA */}
            <div className="mt-6 flex gap-4">
              <button className="bg-accent text-primary px-5 py-2 rounded-full font-semibold">
                Learn More
              </button>
              <button className="border border-white px-5 py-2 rounded-full">
                Membership
              </button>
            </div>
          </div>

          {/* RIGHT: MISSION CARD */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="text-sm leading-relaxed text-gray-100 mb-4">
              To develop, foster, promote and protect programs for the general welfare
              of farm people, including their economic, social and educational well-being.
            </p>

            <img
              src="/cows.png"
              alt="Farm"
              className="w-full h-[180px] object-cover rounded-xl"
            />
          </div>

        </div>
      </div>

    </div>
  );
}