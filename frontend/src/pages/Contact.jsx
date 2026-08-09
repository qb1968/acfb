export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="relative bg-[url('/farm.png')] bg-cover bg-center h-[300px] flex items-center">
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-5xl font-bold">Contact Us</h1>

          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            We're committed to serving Alamance County farmers and our local
            community. Contact us by phone, email, or visit one of our offices.
          </p>
        </div>
      </section>

      {/* QUICK CONTACT */}
      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">📞</div>

            <h3 className="text-xl font-bold text-primary">Call Us</h3>

            <a
              href="tel:3362262477"
              className="mt-3 block text-lg text-gray-700 hover:text-primary"
            >
              (336) 226-2477
            </a>
            <p className="text-gray-700 font-bold mt-2">Spring Gates
            </p>
            <p className="text-gray-500 mt-2">Monday–Friday</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">✉️</div>

            <h3 className="text-xl font-bold text-primary">Email Us</h3>

            <a
              href="mailto:info@acfarmbureau.com"
              className="mt-3 block text-lg text-gray-700 hover:text-primary"
            >
              info@acfarmbureau.com
            </a>

            <p className="text-gray-500 mt-2">
              We'll respond as quickly as possible.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">🕒</div>

            <h3 className="text-xl font-bold text-primary">Office Hours</h3>

            <p className="mt-3 text-lg text-gray-700">Monday – Friday</p>

            <p className="text-xl font-semibold mt-2">8:30 AM – 5:00 PM</p>
          </div>
        </div>
      </section>

      {/* MAIN OFFICE */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Main County Office
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
              <div>
                <h4 className="font-bold text-lg">Address</h4>

                <p className="text-gray-700">
                  800 N. Main Street
                  <br />
                  Graham, NC 27253
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg">Phone</h4>

                <a
                  href="tel:3362262477"
                  className="text-primary hover:underline"
                >
                  (336) 226-2477
                </a>
              </div>

              <div>
                <h4 className="font-bold text-lg">Fax</h4>

                <p>(336) 226-4945</p>
              </div>

              <div>
                <h4 className="font-bold text-lg">Email</h4>

                <a
                  href="mailto:info@acfarmbureau.com"
                  className="text-primary hover:underline"
                >
                  info@acfarmbureau.com
                </a>
              </div>
            </div>
          </div>

          {/* MAP */}

          <div className="rounded-2xl overflow-hidden shadow-lg h-[420px]">
            <iframe
              title="Farm Bureau Office"
              src="https://www.google.com/maps?q=800+N+Main+Street+Graham+NC&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* OFFICE LOCATIONS */}

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Our Office Locations
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition">
              <h3 className="text-2xl font-bold text-primary">Graham</h3>

              <p className="mt-4 text-gray-600">
                800 N. Main Street
                <br />
                Graham, NC 27253
                <br />
                (336) 226-2477
              </p>

              <a
                href="https://maps.google.com/?q=800+N+Main+Street+Graham+NC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-primary text-white px-6 py-2 rounded-lg"
              >
                Directions
              </a>
            </div>

            <div className="rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition">
              <h3 className="text-2xl font-bold text-primary">Mebane</h3>

              <p className="mt-4 text-gray-600">
                209 N. Third Street
                <br />
                Mebane, NC 27302
                <br />
                (919) 563-3276
              </p>

              <a
                href="https://maps.google.com/?q=209+N+Third+Street+Mebane+NC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-primary text-white px-6 py-2 rounded-lg"
              >
                Directions
              </a>
            </div>

            <div className="rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition">
              <h3 className="text-2xl font-bold text-primary">Burlington</h3>

              <p className="mt-4 text-gray-600">
                3047 S. Church Street
                <br />
                Burlington, NC 27215
                <br />
                (336) 584-9299
              </p>

              <a
                href="https://maps.google.com/?q=3047+S+Church+Street+Burlington+NC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-primary text-white px-6 py-2 rounded-lg"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Send Us a Message
          </h2>

          <form className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Subject"
              className="border rounded-xl px-4 py-3"
            />

            <textarea
              rows="6"
              placeholder="Message"
              className="md:col-span-2 border rounded-xl px-4 py-3"
            />

            <button className="md:col-span-2 bg-primary text-white py-4 rounded-xl font-semibold hover:bg-green-800 transition">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
