export default function AnnouncementBar() {
  return (
    <div
      className="
        bg-primary
        text-white
        text-sm
        md:text-base
        py-3
        px-6
        text-center
        font-semibold
      "
    >
      🌱 Join Alamance County Farm Bureau today!
      <a
        href="/membership"
        className="
          ml-2
          underline
          hover:text-yellow-200
        "
      >
        Learn More
      </a>
    </div>
  );
}
