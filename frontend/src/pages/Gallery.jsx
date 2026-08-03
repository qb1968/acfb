import { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
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

  const [galleryImages, setGalleryImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

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
      {/* HERO */}

      <section
        className="
          relative
          bg-[url('/farm.png')]
          bg-cover
          bg-center
          h-[35vh]
          flex
          items-center
        "
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div
          className="
            relative
            z-10
            max-w-6xl
            mx-auto
            px-6
            text-white
          "
        >
          <h1 className="text-4xl md:text-5xl font-bold">Photo Gallery</h1>

          <p className="mt-3 text-lg text-gray-200">
            Explore moments from our agricultural events, community programs,
            and local farm life.
          </p>
        </div>
      </section>

      {/* GALLERY GRID */}

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div
          className="
            grid
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
          "
        >
          {/* PUBLIC IMAGES */}

          {staticImages.map((img, index) => (
            <div
              key={`static-${index}`}
              onClick={() => setSelectedImage(img)}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                shadow-md
                bg-white
                cursor-pointer
              "
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="
                  w-full
                  h-72
                  object-cover
                  transform
                  group-hover:scale-110
                  transition
                  duration-500
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/40
                  opacity-0
                  group-hover:opacity-100
                  transition
                  flex
                  items-center
                  justify-center
                "
              >
                <span className="text-white font-semibold text-lg">
                  View Image
                </span>
              </div>
            </div>
          ))}

          {/* CLOUDINARY UPLOADS */}

          {galleryImages.map((image) => (
            <div
              key={image._id}
              onClick={() => setSelectedImage(image.image)}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                shadow-md
                bg-white
                cursor-pointer
              "
            >
              <img
                src={image.image}
                alt="Gallery Upload"
                className="
                  w-full
                  h-72
                  object-cover
                  transform
                  group-hover:scale-110
                  transition
                  duration-500
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/40
                  opacity-0
                  group-hover:opacity-100
                  transition
                  flex
                  items-center
                  justify-center
                "
              >
                <span className="text-white font-semibold text-lg">
                  View Image
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE POPUP */}

      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/80
            flex
            items-center
            justify-center
            p-6
          "
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="
              relative
              max-w-5xl
              w-full
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={() => setSelectedImage(null)}
              className="
                absolute
                -top-12
                right-0
                text-white
                text-4xl
                font-bold
                hover:text-orange-400
              "
            >
              ×
            </button>

            <img
              src={selectedImage}
              alt="Gallery Preview"
              className="
                w-full
                max-h-[85vh]
                object-contain
                rounded-2xl
                shadow-2xl
              "
            />
          </div>
        </div>
      )}
    </div>
  );
}
