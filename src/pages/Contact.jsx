export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[url('/farm.png')] bg-cover bg-center h-[35vh] flex items-center">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mt-3 text-lg text-gray-200">
            We’re here to support our agricultural community and answer your
            questions.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Main County Office
            </h2>
            <p className="text-gray-700">
              800 N. Main Street <br />
              Graham, NC 27253
            </p>
            <p className="mt-3 text-gray-700">
              📞 (336) 226-2477 <br />
              📠 (336) 226-4945
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Additional Offices
            </h2>
            <p className="text-gray-700">
              <strong>Mebane Office:</strong>
              <br />
              209 N. Third Street, Mebane, NC 27302
            </p>
            <p className="mt-3 text-gray-700">
              <strong>Burlington Office:</strong>
              <br />
              3047 S. Church Street, Burlington, NC 27215
            </p>
          </div>

          <div className="bg-primary text-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2">Office Hours</h3>
            <p>Monday – Friday</p>
            <p>8:30 AM – 5:00 PM</p>
            <p className="mt-3">✉ info@acfarmbureau.com</p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-accent text-primary py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Submit Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
