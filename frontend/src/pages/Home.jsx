import { Link } from "react-router-dom";
import UpcomingEvents from "../components/UpcomingEvents";

export default function Home() {
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

            {/* BUTTONS */}
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

              <Link to="/community">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition shadow-lg">
                  <h3 className="font-bold text-lg mb-1">Community</h3>
                  <p className="text-sm text-gray-200">
                    Stay connected with local programs and initiatives.
                  </p>
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
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="bg-gray-50">
//       {/* HERO */}
//       <section className="relative bg-[url('/farm.png')] bg-cover bg-center h-[30vh] flex items-center">
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/70"></div>

//         {/* Content */}
//         <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
//             Supporting Agriculture <br /> & Rural Communities
//           </h1>

//           <p className="max-w-2xl text-gray-200 text-lg mb-6">
//             Welcome to the Alamance County Farm Bureau website. We hope you find
//             our site useful and informative. We provide resources, membership
//             benefits, and agricultural support for North Carolina residents.
//           </p>
//         </div>
//       </section>

//       {/* FEATURE SECTION */}
//       <section className="max-w-6xl mx-auto px-6 py-16">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold text-primary">
//             Supporting Our Local Farming Community
//           </h2>
//           <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
//             We provide resources, advocacy, and community support for farmers
//             and families across Alamance County.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* CARD 1 */}
//           <div className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border">
//             <h3 className="text-xl font-bold mb-2 text-primary">Membership</h3>
//             <p className="text-gray-600 mb-4">
//               Join and gain access to exclusive agricultural benefits and
//               programs.
//             </p>
//             <Link
//               to="/membership"
//               className="text-accent font-semibold hover:underline"
//             >
//               Learn More →
//             </Link>
//           </div>

//           {/* CARD 2 */}
//           <div className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border">
//             <h3 className="text-xl font-bold mb-2 text-primary">Community</h3>
//             <p className="text-gray-600 mb-4">
//               Stay connected with local events, programs, and agricultural news.
//             </p>
//             <Link
//               to="/community"
//               className="text-accent font-semibold hover:underline"
//             >
//               Learn More →
//             </Link>
//           </div>

//           {/* CARD 3 */}
//           <div className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border">
//             <h3 className="text-xl font-bold mb-2 text-primary">Events</h3>
//             <p className="text-gray-600 mb-4">
//               View upcoming agricultural meetings, fairs, and community events.
//             </p>
//             <Link
//               to="/events"
//               className="text-accent font-semibold hover:underline"
//             >
//               View Calendar →
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* CALL TO ACTION */}

//     </div>
//   );
// }
