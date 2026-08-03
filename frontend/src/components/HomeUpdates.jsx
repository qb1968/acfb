import EventsCard from "./EventsCard";
import NewsCard from "./NewsCard";
import YoungFarmersCard from "./YoungFarmersCard";
import WomenCard from "./WomenCard";

export default function LatestUpdates() {
  return (
    <section
      className="
        py-20
        bg-gradient-to-b
        from-green-200
        to-white
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >
        {/* SECTION HEADER */}

        <div
          className="
            text-center
            mb-12
          "
        >
          <span
            className="
              inline-block
              bg-green-800
              text-white
              px-5
              py-2
              rounded-full
              text-sm
              font-semibold
              uppercase
              tracking-wide
              mb-5
            "
          >
            Farm Bureau News
          </span>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-green-900
            "
          >
            Latest Updates
          </h2>

          <p
            className="
              mt-4
              text-gray-600
              text-lg
              max-w-2xl
              mx-auto
            "
          >
            Stay connected with upcoming events, community news, and programs
            that support Alamance County agriculture.
          </p>
        </div>

        {/* CARDS */}

        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
          "
        >
          <EventsCard />

          <NewsCard />

          <YoungFarmersCard />

          <WomenCard />
        </div>
      </div>
    </section>
  );
}
