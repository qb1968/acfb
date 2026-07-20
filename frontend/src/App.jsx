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
/* ADMIN */
import Login from "./admin/pages/Login";
import AdminLayout from "./admin/AdminLayout";
import EventsAdmin from "./admin/pages/EventsAdmin";
import GalleryAdmin from "./admin/pages/GalleryAdmin";

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

      <Route path="/officers" element={
        <Page>
          <Officers />
        </Page>
      } />

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
        <Route path="events" element={<EventsAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="news" element={<NewsAdmin />} />
      </Route>
    </Routes>
  );
}