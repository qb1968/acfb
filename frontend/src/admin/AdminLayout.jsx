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
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
        ></div>
      )}

      {/* SIDEBAR */}

      <aside
        className={`
fixed
md:static
z-40
top-0
left-0
h-full
w-72
bg-green-900
text-white
transform
transition-transform
duration-300

${open ? "translate-x-0" : "-translate-x-full"}

md:translate-x-0

flex
flex-col
`}
      >
        {/* LOGO */}

        <div
          className="
p-6
border-b
border-white/20
"
        >
          <h1
            className="
text-2xl
font-bold
"
          >
            🌾 ACFB Admin
          </h1>

          <p
            className="
text-sm
text-green-200
mt-1
"
          >
            Website Management
          </p>
        </div>

        {/* NAV */}

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

${isActive ? "bg-white text-green-900 font-bold" : "hover:bg-green-800"}

`
              }
            >
              <span>{link.icon}</span>

              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}

        <div
          className="
p-4
border-t
border-white/20
"
        >
          <button
            onClick={logout}
            className="
w-full
bg-red-600
hover:bg-red-700
py-3
rounded-xl
font-semibold
"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}

      <div
        className="
flex-1
md:ml-0
"
      >
        {/* HEADER */}

        <header
          className="
bg-white
shadow
p-4
flex
items-center
gap-4
"
        >
          <button
            onClick={() => setOpen(true)}
            className="
md:hidden
text-2xl
"
          >
            ☰
          </button>

          <div>
            <h2
              className="
text-xl
font-bold
text-gray-800
"
            >
              Alamance County Farm Bureau
            </h2>

            <p
              className="
text-sm
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
p-6
"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
