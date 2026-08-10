
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const links = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "📊",
    },
    {
      name: "News",
      path: "/admin/news",
      icon: "📰",
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: "📅",
    },
    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: "📷",
    },
    {
      name: "Officers",
      path: "/admin/officers",
      icon: "👥",
    },
    {
      name: "Young Farmers",
      path: "/admin/young-farmers",
      icon: "🌱",
    },
    {
      name: "Young Farmer News",
      path: "/admin/young-farmer-news",
      icon: "📰",
    },
    {
      name: "Young Farmer Events",
      path: "/admin/young-farmer-events",
      icon: "📅",
    },
    {
      name: "Women Members",
      path: "/admin/women-members",
      icon: "👩‍🌾",
    },
    {
      name: "Women News",
      path: "/admin/women-news",
      icon: "📰",
    },
    {
      name: "Women Events",
      path: "/admin/women-events",
      icon: "📅",
    },
    {
      name: "Manage Admins",
      path: "/admin/admin-management",
      icon: "🔐",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* MOBILE OVERLAY */}

      {open && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-30
            md:hidden
          "
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          z-40
          top-0
          left-0
          h-screen
          w-72
          bg-green-900
          text-white
          flex
          flex-col
          transform
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* LOGO / HEADER */}

        <div
          className="
            p-6
            border-b
            border-white/20
            flex-shrink-0
          "
        >
          <h1 className="text-xl font-bold">
            🌾 ACFB Admin
          </h1>

          <p className="text-sm text-green-200 mt-1">
            Website Management
          </p>
        </div>

        {/* NAVIGATION */}

        <nav
          className="
            flex-1
            overflow-y-auto
            p-4
            space-y-2
          "
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition
                  duration-200
                  ${
                    isActive
                      ? "bg-white text-green-900 font-bold shadow"
                      : "text-white hover:bg-green-800"
                  }
                `
              }
            >
              <span className="text-xl">
                {link.icon}
              </span>

              <span>
                {link.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}

        <div
          className="
            p-4
            border-t
            border-white/20
            flex-shrink-0
          "
        >
          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-left
              hover:bg-red-600
              transition
            "
          >
            <span className="text-xl">
              🚪
            </span>

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}

      <div
        className="
          md:ml-72
          min-h-screen
        "
      >
        {/* HEADER */}

        <header
          className="
            bg-white
            shadow-sm
            px-4
            sm:px-6
            py-4
            flex
            items-center
            gap-4
            sticky
            top-0
            z-20
          "
        >
          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setOpen(true)}
            className="
              md:hidden
              text-2xl
              text-gray-700
              hover:text-green-800
              transition
            "
            aria-label="Open admin menu"
          >
            ☰
          </button>

          {/* PAGE HEADER */}

          <div>
            <h2
              className="
                text-lg
                sm:text-xl
                font-bold
                text-gray-800
              "
            >
              Alamance County Farm Bureau
            </h2>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
              "
            >
              Administration Panel
            </p>
          </div>
        </header>

        {/* PAGE CONTENT */}

        <main
          className="
            p-4
            sm:p-6
            lg:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

