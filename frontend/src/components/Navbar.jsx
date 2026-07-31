import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  return (
    <nav
      className="
      bg-white
      shadow-md
      sticky
      top-0
      z-50
    "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
      "
      >
        {/* LOGO */}

        <Link
          to="/"
          className="
            flex
            items-center
            gap-3
          "
        >
          <img
            src="/logo.jpg"
            alt="Farm Bureau"
            className="
              h-12
              w-12
              object-contain
            "
          />

          <div>
            <h1
              className="
              font-bold
              text-primary
              leading-none
            "
            >
              Alamance County
            </h1>

            <p
              className="
              text-sm
              text-gray-600
            "
            >
              Farm Bureau
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-8
          font-semibold
        "
        >
          <Link to="/" className="hover:text-primary">
            Home
          </Link>

          {/* ABOUT DROPDOWN */}

          <div className="relative">
            <button
              onClick={() => toggleDropdown("about")}
              className="
                hover:text-primary
              "
            >
              About ▾
            </button>

            {dropdown === "about" && (
              <div
                className="
                  absolute
                  top-10
                  left-0
                  bg-white
                  shadow-xl
                  rounded-xl
                  p-4
                  w-52
                  z-50
                "
              >
                <Link
                  to="/about"
                  onClick={() => setDropdown(null)}
                  className="
                    block
                    py-2
                    hover:text-primary
                  "
                >
                  About Us
                </Link>

                <Link
                  to="/officers"
                  onClick={() => setDropdown(null)}
                  className="
                    block
                    py-2
                    hover:text-primary
                  "
                >
                  Officers
                </Link>

                <Link
                  to="/membership"
                  onClick={() => setDropdown(null)}
                  className="
                    block
                    py-2
                    hover:text-primary
                  "
                >
                  Membership
                </Link>
              </div>
            )}
          </div>

          {/* PROGRAMS DROPDOWN */}

          <div className="relative">
            <button
              onClick={() => toggleDropdown("programs")}
              className="
                hover:text-primary
              "
            >
              Programs ▾
            </button>

            {dropdown === "programs" && (
              <div
                className="
                  absolute
                  top-10
                  left-0
                  bg-white
                  shadow-xl
                  rounded-xl
                  p-4
                  w-64
                  z-50
                "
              >
                <Link
                  to="/young-farmers"
                  onClick={() => setDropdown(null)}
                  className="
                    block
                    py-2
                    hover:text-primary
                  "
                >
                  Young Farmers & Ranchers
                </Link>

                <Link
                  to="/women"
                  onClick={() => setDropdown(null)}
                  className="
                    block
                    py-2
                    hover:text-primary
                  "
                >
                  Women's Committee
                </Link>

                <Link
                  to="/community"
                  onClick={() => setDropdown(null)}
                  className="
                    block
                    py-2
                    hover:text-primary
                  "
                >
                  Community News
                </Link>
              </div>
            )}
          </div>

          <Link to="/events" className="hover:text-primary">
            Events
          </Link>

          <Link to="/gallery" className="hover:text-primary">
            Gallery
          </Link>

          <Link to="/contact" className="hover:text-primary">
            Contact
          </Link>
        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
            md:hidden
            text-3xl
          "
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div
          className="
            md:hidden
            bg-white
            border-t
            px-6
            py-5
            space-y-4
          "
        >
          <Link to="/" className="block">
            Home
          </Link>

          <Link to="/about" className="block">
            About
          </Link>

          <Link to="/officers" className="block">
            Officers
          </Link>

          <Link to="/membership" className="block">
            Membership
          </Link>

          <Link to="/young-farmers" className="block">
            Young Farmers & Ranchers
          </Link>

          <Link to="/women" className="block">
            Women's Committee
          </Link>

          <Link to="/events" className="block">
            Events
          </Link>

          <Link to="/gallery" className="block">
            Gallery
          </Link>

          <Link to="/contact" className="block">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
