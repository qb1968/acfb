// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Membership from "./components/Membership";
// import EventsCalendar from "./pages/EventsCalendar";
// import Gallery from "./pages/Gallery";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <div className="min-h-screen">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/membership" element={<Membership />} />
//           <Route path="/events" element={<EventsCalendar />} />
//           <Route path="/gallery" element={<Gallery />} />
//         </Routes>
//       </div>
//       <Footer />
//     </BrowserRouter>
//   );
// }

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PUBLIC PAGES */
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
import ProtectedRoute from "./admin/ProtectedRoute";

/* SIMPLE WRAPPER (SAFE) */
const Page = ({ children }) => (
  <>
    <Navbar />
    <div className="min-h-screen">{children}</div>
    <Footer />
  </>
);

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
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

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<Login />} />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="events" element={<EventsAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="news" element={<NewsAdmin />} />
        <Route path="officers" element={<OfficersAdmin />} />
        <Route path="young-farmers" element={<YoungFarmersAdmin />} />

        <Route path="young-farmer-news" element={<YoungFarmerNewsAdmin />} />

        <Route
          path="young-farmer-events"
          element={<YoungFarmerEventsAdmin />}
        />
        <Route path="women-members" element={<WomenMembersAdmin />} />

        <Route path="women-news" element={<WomenNewsAdmin />} />

        <Route path="women-events" element={<WomenEventsAdmin />} />
      </Route>
    </Routes>
  );
}