import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";
import { setupAxios } from "./utils/axiosConfig";

import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Membership from "./components/Membership";
import EventsCalendar from "./pages/EventsCalendar";
import Gallery from "./pages/Gallery";
import Community from "./pages/Community";
import Officers from "./pages/Officers";
import YoungFarmers from "./pages/YoungFarmers";
import Women from "./pages/Women";

/* ADMIN */

import AdminManagement from "./admin/pages/AdminManagement";
import Login from "./admin/pages/Login";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";

import EventsAdmin from "./admin/pages/EventsAdmin";
import GalleryAdmin from "./admin/pages/GalleryAdmin";
import OfficersAdmin from "./admin/pages/OfficersAdmin";
import YoungFarmersAdmin from "./admin/pages/YoungFarmersAdmin";

import YoungFarmerNewsAdmin from "./admin/pages/YoungFarmersNewsAdmin";
import YoungFarmerEventsAdmin from "./admin/pages/YoungFarmersEventsAdmin";

import WomenMembersAdmin from "./admin/pages/WomenMembersAdmin";
import WomenNewsAdmin from "./admin/pages/WomenNewsAdmin";
import WomenEventsAdmin from "./admin/pages/WomenEventsAdmin";

import NewsAdmin from "./admin/pages/NewsAdmin";

import PageTransition from "./components/PageTransition";
import ProtectedRoute from "./admin/ProtectedRoute";

/* PUBLIC PAGE LAYOUT */

const Page = ({ children }) => {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main className="min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>

      <Footer />
    </>
  );
};

export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setupAxios(setLoading);
  }, []);

  return (
    <>
      {loading && <Loader />}

      <Routes>
        {/* ========================================= */}
        {/* PUBLIC ROUTES                            */}
        {/* ========================================= */}

        <Route
          path="/"
          element={
            <Page>
              <Home />
            </Page>
          }
        />

        <Route
          path="/about"
          element={
            <Page>
              <About />
            </Page>
          }
        />

        <Route
          path="/contact"
          element={
            <Page>
              <Contact />
            </Page>
          }
        />

        <Route
          path="/membership"
          element={
            <Page>
              <Membership />
            </Page>
          }
        />

        <Route
          path="/events"
          element={
            <Page>
              <EventsCalendar />
            </Page>
          }
        />

        <Route
          path="/gallery"
          element={
            <Page>
              <Gallery />
            </Page>
          }
        />

        <Route
          path="/community"
          element={
            <Page>
              <Community />
            </Page>
          }
        />

        <Route
          path="/officers"
          element={
            <Page>
              <Officers />
            </Page>
          }
        />

        <Route
          path="/young-farmers"
          element={
            <Page>
              <YoungFarmers />
            </Page>
          }
        />

        <Route
          path="/women"
          element={
            <Page>
              <Women />
            </Page>
          }
        />

        {/* ========================================= */}
        {/* ADMIN LOGIN                              */}
        {/* ========================================= */}

        <Route path="/admin/login" element={<Login />} />

        {/* ========================================= */}
        {/* ADMIN AREA                               */}
        {/* ========================================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* DASHBOARD */}

          <Route index element={<AdminDashboard />} />

          {/* ADMIN MANAGEMENT */}

          <Route path="admin-management" element={<AdminManagement />} />

          {/* NEWS */}

          <Route path="news" element={<NewsAdmin />} />

          {/* EVENTS */}

          <Route path="events" element={<EventsAdmin />} />

          {/* GALLERY */}

          <Route path="gallery" element={<GalleryAdmin />} />

          {/* OFFICERS */}

          <Route path="officers" element={<OfficersAdmin />} />

          {/* YOUNG FARMERS */}

          <Route path="young-farmers" element={<YoungFarmersAdmin />} />

          {/* YOUNG FARMER NEWS */}

          <Route path="young-farmer-news" element={<YoungFarmerNewsAdmin />} />

          {/* YOUNG FARMER EVENTS */}

          <Route
            path="young-farmer-events"
            element={<YoungFarmerEventsAdmin />}
          />

          {/* WOMEN MEMBERS */}

          <Route path="women-members" element={<WomenMembersAdmin />} />

          {/* WOMEN NEWS */}

          <Route path="women-news" element={<WomenNewsAdmin />} />

          {/* WOMEN EVENTS */}

          <Route path="women-events" element={<WomenEventsAdmin />} />
        </Route>
      </Routes>
    </>
  );
}
