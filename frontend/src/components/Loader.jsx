export default function Loader() {
  return (
    <div
      className="
      fixed
      inset-0
      z-[9999]
      bg-white/90
      backdrop-blur-sm
      flex
      flex-col
      items-center
      justify-center
      "
    >
      {/* Spinner */}
      <div
        className="
        w-16
        h-16
        border-4
        border-primary
        border-t-transparent
        rounded-full
        animate-spin
        "
      ></div>

      <h2
        className="
        mt-6
        text-xl
        font-bold
        text-primary
        "
      >
        Waking up our farm server...
      </h2>

      <p className="text-gray-500 mt-2">
        This may take a few moments on your first visit.
      </p>
    </div>
  );
}
