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
        <Link to="/admin/officers">Officers</Link>
        <Link to="/admin/young-farmers">Young Farmers Committee</Link>

        <Link to="/admin/young-farmer-news">Young Farmers News</Link>

        <Link to="/admin/young-farmer-events">Young Farmers Events</Link>
        <Link to="/admin/women-members">Women's Committee Members</Link>
        <Link to="/admin/women-news">Women's News</Link>
        <Link to="/admin/women-events">Women's Events</Link>
      </nav>
    </div>
  );
}
