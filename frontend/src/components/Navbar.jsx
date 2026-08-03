import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  const closeMenu = () => {
    setDropdown(null);
    setMobileOpen(false);
  };

  return (
    
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}

        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Farm Bureau"
            className="h-12 w-12 object-contain"
          />

          <div>
            <h1 className="font-bold text-primary leading-none">
              Alamance County
            </h1>

            <p className="text-sm text-gray-600">Farm Bureau</p>
          </div>
        </Link>

        {/* DESKTOP */}

        <div className="hidden md:flex items-center gap-8 font-semibold">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>

          {/* ABOUT */}

          <div className="relative">
            <button
              onClick={() => toggleDropdown("about")}
              className="hover:text-primary"
            >
              About ▾
            </button>

            {dropdown === "about" && (
              <div className="absolute top-10 left-0 bg-white shadow-xl rounded-xl p-4 w-52 z-50">
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="block py-2 hover:text-primary"
                >
                  About Us
                </Link>

                <Link
                  to="/officers"
                  onClick={closeMenu}
                  className="block py-2 hover:text-primary"
                >
                  Officers
                </Link>

                <Link
                  to="/membership"
                  onClick={closeMenu}
                  className="block py-2 hover:text-primary"
                >
                  Membership
                </Link>
              </div>
            )}
          </div>

          {/* PROGRAMS */}

          <div className="relative">
            <button
              onClick={() => toggleDropdown("programs")}
              className="hover:text-primary"
            >
              Programs ▾
            </button>

            {dropdown === "programs" && (
              <div className="absolute top-10 left-0 bg-white shadow-xl rounded-xl p-4 w-64 z-50">
                <Link
                  to="/young-farmers"
                  onClick={closeMenu}
                  className="block py-2 hover:text-primary"
                >
                  Young Farmers & Ranchers
                </Link>

                <Link
                  to="/women"
                  onClick={closeMenu}
                  className="block py-2 hover:text-primary"
                >
                  Women's Committee
                </Link>
              </div>
            )}
          </div>

          {/* NEW MAIN NAV ITEM */}

          <Link to="/community" className="hover:text-primary">
            News
          </Link>

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
          className="md:hidden text-3xl"
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
          <Link to="/" onClick={closeMenu} className="block">
            Home
          </Link>

          <Link to="/about" onClick={closeMenu} className="block">
            About
          </Link>

          <Link to="/officers" onClick={closeMenu} className="block">
            Officers
          </Link>

          <Link to="/membership" onClick={closeMenu} className="block">
            Membership
          </Link>

          <Link to="/young-farmers" onClick={closeMenu} className="block">
            Young Farmers & Ranchers
          </Link>

          <Link to="/women" onClick={closeMenu} className="block">
            Women's Committee
          </Link>

          <Link
            to="/community"
            onClick={closeMenu}
            className="block font-semibold"
          >
            News
          </Link>

          <Link to="/events" onClick={closeMenu} className="block">
            Events
          </Link>

          <Link to="/gallery" onClick={closeMenu} className="block">
            Gallery
          </Link>

          <Link to="/contact" onClick={closeMenu} className="block">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
