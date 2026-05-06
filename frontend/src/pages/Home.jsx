// import { Link } from 'react-router-dom';

// export default function Home() {
//   return (
//     <div className="h-screen overflow-hidden bg-gray-50">
//       {/* MAIN LAYOUT */}
//       <div className="h-full bg-[url('/farm.png')] bg-cover bg-center relative flex items-center">
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/75"></div>

//         {/* CONTENT WRAPPER */}
//         <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
//           {/* LEFT HERO */}
//           <div className="text-white">
//             <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//               Supporting Agriculture & Community
//             </h1>

//             <p className="mt-4 text-gray-200 text-sm md:text-base leading-relaxed">
//               Farm Bureau provides agricultural support, membership benefits,
//               and community programs across North Carolina.
//             </p>

//             <div className="mt-6 flex gap-3">
//               <button className="bg-accent text-primary px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
//                 Learn More
//               </button>

//               <Link
//                 to="/membership"
//                 className="border border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-primary transition"
//               >
//                 Membership
//               </Link>
//             </div>
//           </div>

//           {/* RIGHT STACKED CARDS */}
//           <div className="space-y-4">
//             {/* Mission Card */}
//             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
//               <h2 className="text-lg font-bold mb-2">Our Mission</h2>

//               <p className="text-xs text-gray-200 leading-relaxed">
//                 To develop, foster, promote and protect programs for the general
//                 welfare of farm people and rural communities.
//               </p>
//             </div>

//             {/* Image Card */}
//             <div className="rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src="/cows.png"
//                 alt="Farm"
//                 className="w-full h-[240px] object-cover"
//               />
//             </div>

//             {/* Quick Info Cards */}
//             <div className="grid grid-cols-2 gap-3">
//               <Link to="/events">
//                 <div className="bg-white/90 rounded-xl p-3 text-center shadow hover:shadow-lg transition cursor-pointer">
//                   <h3 className="font-bold text-primary text-sm">Calendar</h3>
//                   <p className="text-xs text-gray-600">Upcoming events</p>
//                 </div>
//               </Link>
// <Link to="/community">
//               <div className="bg-white/90 rounded-xl p-3 text-center shadow">

//                 <h3 className="font-bold text-primary text-sm">Community</h3>
//                 <p className="text-xs text-gray-600">Local programs</p>
//               </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="relative bg-[url('/farm.png')] bg-cover bg-center h-[85vh] flex items-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Supporting Agriculture <br /> & Rural Communities
          </h1>

          <p className="max-w-2xl text-gray-200 text-lg mb-6">
            Welcome to the Alamance County Farm Bureau. We are committed to
            supporting farmers, strengthening rural communities, and providing
            valuable resources for our members across North Carolina.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              to="/membership"
              className="bg-accent text-primary px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Become a Member
            </Link>

            <Link
              to="/community"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Community Programs
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Supporting Our Local Farming Community
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            We provide resources, advocacy, and community support for farmers
            and families across Alamance County.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border">
            <h3 className="text-xl font-bold mb-2 text-primary">Membership</h3>
            <p className="text-gray-600 mb-4">
              Join and gain access to exclusive agricultural benefits and
              programs.
            </p>
            <Link
              to="/membership"
              className="text-accent font-semibold hover:underline"
            >
              Learn More →
            </Link>
          </div>

          {/* CARD 2 */}
          <div className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border">
            <h3 className="text-xl font-bold mb-2 text-primary">Community</h3>
            <p className="text-gray-600 mb-4">
              Stay connected with local events, programs, and agricultural news.
            </p>
            <Link
              to="/community"
              className="text-accent font-semibold hover:underline"
            >
              Learn More →
            </Link>
          </div>

          {/* CARD 3 */}
          <div className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border">
            <h3 className="text-xl font-bold mb-2 text-primary">Events</h3>
            <p className="text-gray-600 mb-4">
              View upcoming agricultural meetings, fairs, and community events.
            </p>
            <Link
              to="/events"
              className="text-accent font-semibold hover:underline"
            >
              View Calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-primary text-white py-14 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Farm Bureau Today</h2>

        <p className="max-w-xl mx-auto text-gray-200 mb-6">
          Become part of a strong agricultural community dedicated to supporting
          farmers and rural families.
        </p>

        <Link
          to="/membership"
          className="bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}