// src/components/Navbar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive ? "text-accent font-semibold" : "text-primary hover:text-accent"
    }`;

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-center sm:text-left">
            Supporting Agriculture & Rural Communities
          </p>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>(336) 226-2477</span>
            <Mail size={16} />
            <span>info@acfarmbureau.com</span>
            {/* <a href="https://facebook.com" target="_blank">
            <FaFacebook size={22} />
            </a> */}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Farm Bureau Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
            <NavLink to="/gallery" className={navClass}>
              Gallery
            </NavLink>
            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>

            <Link
              to="/membership"
              onClick={() => setOpen(false)}
              className="bg-accent text-primary px-5 py-3 rounded-full font-semibold text-center"
            >
              Join Today
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-primary"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="px-6 pb-6 flex flex-col gap-4 bg-white shadow-inner">
            <NavLink
              to="/"
              className="text-primary font-medium"
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className="text-primary font-medium"
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className="text-primary font-medium"
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>

            {/* ✅ FIXED JOIN TODAY BUTTON */}
            <Link
              to="/membership"
              onClick={() => setOpen(false)}
              className="bg-accent text-primary px-5 py-3 rounded-full font-semibold text-center block"
            >
              Join Today
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
