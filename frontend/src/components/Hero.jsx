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

         
        </div>
      </div>
    </section>
  );
}