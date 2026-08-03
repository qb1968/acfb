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
        <div
          className="
absolute
inset-0
bg-black/70
"
        />

        <div
          className="
relative
z-10
max-w-7xl
mx-auto
px-6
grid
md:grid-cols-2
gap-12
items-center
"
        >
          <div className="text-white">
            <h1
              className="
text-4xl
md:text-6xl
font-bold
leading-tight
"
            >
              Supporting Agriculture, Strengthening Communities
            </h1>

            <p
              className="
mt-6
text-gray-200
max-w-xl
text-lg
leading-relaxed
"
            >
              Alamance County Farm Bureau supports farmers, families, and
              communities through agriculture, education, advocacy, and local
              programs.
            </p>

            <div
              className="
mt-8
flex
gap-4
flex-wrap
"
            >
              <Link
                to="/membership"
                className="
bg-green-700
px-7
py-3
rounded-full
font-semibold
hover:bg-green-800
transition
"
              >
                Join Today
              </Link>

              <Link
                to="/about"
                className="
border
border-white
px-7
py-3
rounded-full
hover:bg-white
hover:text-green-800
transition
"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div>
            <img
              src="/cows.png"
              alt="Farm"
              className="
rounded-3xl
shadow-2xl
border
border-white/20
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
    </div>
  );
}
