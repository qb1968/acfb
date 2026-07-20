import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function GalleryAdmin() {
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);

  // Load images when page opens
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("https://acfb.onrender.com/api/gallery");
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Upload image
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("https://acfb.onrender.com/api/gallery", formData);

      alert("Image uploaded!");

      // Refresh gallery list
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  }, []);

  // Delete image
  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`https://acfb.onrender.com/api/gallery/${id}`);

      // Refresh gallery
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gallery Upload</h1>

      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
          isDragActive
            ? "border-accent bg-yellow-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />

        <p className="text-gray-600">
          Drag & drop images here, or click to upload
        </p>
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="mt-6">
          <img
            src={preview}
            alt="Preview"
            className="w-64 rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* UPLOADED IMAGES */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Uploaded Images</h2>

        {images.length === 0 ? (
          <p className="text-gray-500">No uploaded images yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src={`https://acfb.onrender.com${img.image}`}
                  alt="Gallery"
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">
                  <button
                    onClick={() => deleteImage(img._id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                  >
                    Delete Image
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
