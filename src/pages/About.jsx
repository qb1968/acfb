import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p>
          We support agricultural development, education, and the economic well-being
          of farming communities.
        </p>
      </section>

      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6">
          <div className="shadow p-4 rounded-lg">
            <h3 className="font-bold mb-2">Membership</h3>
            <p>Join and support local agriculture.</p>
          </div>

          <div className="shadow p-4 rounded-lg">
            <h3 className="font-bold mb-2">Resources</h3>
            <p>Access tools, programs, and updates.</p>
          </div>

          <div className="shadow p-4 rounded-lg">
            <h3 className="font-bold mb-2">Community</h3>
            <p>Stay connected with local initiatives.</p>
          </div>
        </div>
      </section>
    </div>
  );
}