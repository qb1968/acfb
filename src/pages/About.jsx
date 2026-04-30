import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="max-w-5xl mx-auto p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
          Our Mission
        </h2>

        <p className="text-gray-700 leading-relaxed text-lg">
          Our mission is to strengthen and support the agricultural community by
          promoting education, advocacy, and sustainable growth for farmers and
          rural families. We are committed to preserving the values of hard
          work, stewardship, and community service while providing resources
          that help agriculture thrive in an ever-changing world. Through
          membership, partnerships, and outreach, we aim to create opportunities
          that enhance economic well-being, protect rural livelihoods, and
          inspire future generations to value and sustain our farming heritage.
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
