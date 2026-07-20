import { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  // Images already in /public
  const staticImages = [
    "/one.jpg",
    "/two.jpg",
    "/three.jpg",
    "/four.JPG",
    "/five.JPG",
    "/six.JPG",
    "/seven.JPG",
    "/eight.JPG",
  ];

  // Images uploaded from admin
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      const res = await axios.get("https://acfb.onrender.com/api/gallery");
      setGalleryImages(res.data);
    } catch (err) {
      console.error("Failed to load gallery images:", err);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[url('/farm.png')] bg-cover bg-center h-[35vh] flex items-center">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Photo Gallery</h1>
          <p className="mt-3 text-lg text-gray-200">
            Explore moments from our agricultural events, community programs,
            and local farm life.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Existing Images */}
          {staticImages.map((img, index) => (
            <a
              key={`static-${index}`}
              href={img}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl shadow-md bg-white block"
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  View Image
                </span>
              </div>
            </a>
          ))}

          {/* Images Uploaded from Admin */}
          {galleryImages.map((image) => (
            <a
              key={image._id}
              href={`https://acfb.onrender.com${image.image}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl shadow-md bg-white block"
            >
              <img
                src={`https://acfb.onrender.com${image.image}`}
                alt="Gallery Upload"
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  View Image
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
