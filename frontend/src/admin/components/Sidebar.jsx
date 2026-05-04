// src/admin/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-primary text-white p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/admin/events">Events</Link>
        <Link to="/admin/gallery">Gallery</Link>
        <Link to="/admin/news">News</Link>
      </nav>
    </div>
  );
}
