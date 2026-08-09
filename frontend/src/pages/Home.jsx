import { Link } from "react-router-dom";
import EventsCard from "../components/EventsCard";
import NewsCard from "../components/NewsCard";
import YoungFarmersCard from "../components/YoungFarmersCard";
import WomenCard from "../components/WomenCard";
import HomeUpdates from "../components/HomeUpdates";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}

      <section
        className="
    relative
    min-h-[85vh]
    bg-[url('/farm.png')]
    bg-cover
    bg-center
    flex
    items-center
  "
      >
        {/* Overlay */}

        <div className="absolute inset-0 bg-black/70" />

        <div
          className="
      relative
      z-10
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-10
      lg:gap-12
      items-center
      text-center
      lg:text-left
    "
        >
          {/* Hero Text */}

          <div className="text-white">
            <h1
              className="
          text-4xl
          sm:text-5xl
          lg:text-6xl
          font-bold
          leading-tight
        "
            >
              Supporting Agriculture,
              <br />
              Strengthening Communities
            </h1>

            <p
              className="
          mt-6
          max-w-xl
          mx-auto
          lg:mx-0
          text-base
          sm:text-lg
          text-gray-200
          leading-relaxed
        "
            >
              Alamance County Farm Bureau supports farmers, families, and
              communities through agriculture, education, advocacy, and local
              programs.
            </p>

            {/* Button */}

            <div
              className="
          mt-8
          flex
          justify-center
          lg:justify-start
        "
            >
              <Link
                to="/about"
                className="
            bg-white
            text-green-800
            px-8
            py-3
            rounded-full
            font-semibold
            shadow-lg
            hover:bg-green-100
            transition
          "
              >
                Learn More 
              </Link>
            </div>
          </div>

          {/* Hero Image */}

          <div className="hidden md:block">
            <img
              src="/cows.png"
              alt="Farm"
              className="
          rounded-3xl
          shadow-2xl
          border
          border-white/20
          w-full
          max-w-xl
          mx-auto
        "
            />
          </div>
        </div>
      </section>

      {/* PROGRAM CARDS */}
      {/* 
      <section
        className="
py-16
bg-green-900
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-6
"
        >
          <h2
            className="
text-3xl
font-bold
text-white
mb-10
text-center
"
          >
            Stay Connected
          </h2>

          <div
            className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
"
          >
            <EventsCard />

            <NewsCard />

            <YoungFarmersCard />

            <WomenCard />
          </div>
        </div>
      </section> */}
      <HomeUpdates />

      {/* MISSION */}

      <section
        className="
py-16
"
      >
        <div
          className="
max-w-5xl
mx-auto
px-6
text-center
"
        >
          <h2
            className="
text-3xl
font-bold
text-green-800
"
          >
            Our Mission
          </h2>

          <p
            className="
mt-6
text-gray-700
text-lg
leading-relaxed
"
          >
            To develop, foster, promote and protect programs for the general
            welfare of farm people, including their economic, social, and
            educational well-being, while supporting agriculture and rural
            communities throughout North Carolina.
          </p>
        </div>
      </section>

      {/* QUICK LINKS */}

      <section
        className="
pb-20
"
      >
        <div
          className="
max-w-5xl
mx-auto
px-6
grid
md:grid-cols-2
gap-6
"
        >
          <Link to="/gallery">
            <div
              className="
bg-white
rounded-2xl
shadow-lg
p-8
text-center
hover:-translate-y-1
transition
"
            >
              <h3
                className="
text-2xl
font-bold
text-green-700
"
              >
                Gallery
              </h3>

              <p className="mt-3 text-gray-600">
                View photos from our agricultural and community events.
              </p>
            </div>
          </Link>

          <Link to="/contact">
            <div
              className="
bg-white
rounded-2xl
shadow-lg
p-8
text-center
hover:-translate-y-1
transition
"
            >
              <h3
                className="
text-2xl
font-bold
text-green-700
"
              >
                Contact
              </h3>

              <p className="mt-3 text-gray-600">
                Connect with Alamance County Farm Bureau.
              </p>
            </div>
          </Link>
        </div>
      </section>
      <section className="bg-green-800 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold">
            Become Part of Our Farm Bureau Family
          </h2>

          <p className="mt-4 text-green-100">
            Join today to support agriculture, strengthen our community, and
            enjoy Farm Bureau member benefits.
          </p>

          <Link
            to="/membership"
            className="inline-block mt-8 bg-white text-green-800 px-8 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Become a Member
          </Link>
        </div>
      </section>
    </div>
  );
}
