export default function Hero() {
  return (
    <section className="relative h-[60vh] flex items-center bg-[url('/farm.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Supporting Agriculture & Community
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-100 leading-relaxed">
            Welcome to the Alamance County Farm Bureau. We are committed to
            supporting farmers, strengthening rural communities, and providing
            valuable resources for our members across North Carolina.
          </p>
        </div>
      </div>
    </section>
  );
}