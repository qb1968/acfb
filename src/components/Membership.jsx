export default function Membership() {
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="relative bg-[url('/farm-membership.jpg')] bg-cover bg-center h-[45vh] flex items-center">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Membership
          </h1>
          <p className="max-w-2xl text-sm md:text-lg text-gray-200">
            Join Farm Bureau and gain access to valuable benefits, savings,
            and programs that support agriculture and rural communities.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Why Join?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Membership in Farm Bureau connects you with agricultural advocacy,
            education, and exclusive savings programs designed to support rural
            communities and local farmers.
          </p>

          <div className="space-y-3 text-gray-700">
            <div className="p-4 bg-white rounded-xl shadow">
              ✔ Advocacy at local and national levels
            </div>
            <div className="p-4 bg-white rounded-xl shadow">
              ✔ Exclusive member discounts & savings
            </div>
            <div className="p-4 bg-white rounded-xl shadow">
              ✔ Insurance and farm support programs
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <img
            src="/logo.jpg"
            alt="Farm benefits"
            className="rounded-2xl shadow-lg w-full  object-cover"
          />
        </div>

      </section>

      {/* MEMBERSHIP CARD SECTION */}
    <section className="bg-gray-50 min-h-[60vh] flex items-center justify-center py-16">

  <div className="w-full max-w-md mx-auto">

    <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 
                    hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">

      {/* Badge */}
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary text-xs font-bold px-4 py-1 rounded-full shadow">
        Popular Choice
      </span>

      <h3 className="font-bold text-2xl mb-3 text-primary">
        Associate Member
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        Support agriculture and access exclusive discounts, benefits, and community programs designed to strengthen rural living.
      </p>

      <div className="mt-6 text-3xl font-bold text-primary">
        $25 <span className="text-sm font-normal text-gray-500">/ year</span>
      </div>

      <button className="mt-6 w-full bg-accent text-primary py-3 rounded-full font-semibold 
                         hover:scale-[1.03] transition-transform shadow-md">
        Join Now
      </button>

    </div>

  </div>

</section>
      {/* CTA */}
      <section className="bg-primary text-white py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Become a Member?
        </h2>
        <a
  href="https://www.ncfb.org/join/"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-accent text-primary px-6 py-3 rounded-full font-semibold inline-block"
>
  Join Today
</a>
      </section>

    </div>
  );
}