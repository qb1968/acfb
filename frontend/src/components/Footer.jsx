import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* MAIN FOOTER */}

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-12
        grid
        md:grid-cols-4
        gap-10
      "
      >
        {/* BRAND */}

        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.jpg"
              alt="Alamance County Farm Bureau"
              className="h-14 w-14 object-contain"
            />

            <div>
              <h2
                className="
                text-white
                font-bold
                text-lg
              "
              >
                Alamance County
              </h2>

              <p className="text-sm">Farm Bureau</p>
            </div>
          </div>

          <p className="text-sm leading-6">
            Supporting local agriculture, farmers, families, and our community
            through leadership, education, and advocacy.
          </p>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h3
            className="
            text-white
            font-bold
            text-lg
            mb-4
          "
          >
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-green-400 transition">
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/membership"
                className="hover:text-green-400 transition"
              >
                Membership
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-green-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* PROGRAMS */}

        <div>
          <h3
            className="
            text-white
            font-bold
            text-lg
            mb-4
          "
          >
            Programs
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/young-farmers"
                className="hover:text-green-400 transition"
              >
                Young Farmers & Ranchers
              </Link>
            </li>

            <li>
              <Link to="/women" className="hover:text-green-400 transition">
                Women's Committee
              </Link>
            </li>

            <li>
              <Link to="/events" className="hover:text-green-400 transition">
                Events
              </Link>
            </li>

            <li>
              <Link to="/gallery" className="hover:text-green-400 transition">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}

        <div>
          <h3
            className="
            text-white
            font-bold
            text-lg
            mb-4
          "
          >
            Contact
          </h3>

          <div className="space-y-4 text-sm">
            <p className="flex gap-3 items-center">
              <FaPhone className="text-green-400" />
              (336) 555-0000
            </p>

            <p className="flex gap-3 items-center">
              <FaEnvelope className="text-green-400" />
              info@alamancefarmbureau.org
            </p>

            <p>
              Alamance County, NC
              <br />
              Supporting Agriculture Since 1919
            </p>
          </div>

          {/* SOCIAL */}

          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="
                bg-white/10
                p-3
                rounded-full
                hover:bg-green-600
                transition
              "
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="
                bg-white/10
                p-3
                rounded-full
                hover:bg-green-600
                transition
              "
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}

      <div
        className="
          border-t
          border-white/10
          py-5
          text-center
          text-sm
        "
      >
        © {new Date().getFullYear()} Alamance County Farm Bureau. All Rights
        Reserved.
      </div>
    </footer>
  );
}
