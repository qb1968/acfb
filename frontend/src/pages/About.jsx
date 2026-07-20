import Hero from "../components/Hero";
import { Link } from "react-router-dom";

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

      {/* <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 place-items-center">
            
            <Link
              to="/membership"
              className="shadow p-6 rounded-xl text-center w-full hover:shadow-xl transition block"
            >
              <h3 className="font-bold mb-2">Membership</h3>
              <p>Join and support local agriculture.</p>
            </Link>

          
            <Link
              to="/community"
              className="shadow p-6 rounded-xl text-center w-full hover:shadow-xl transition block"
            >
              <h3 className="font-bold mb-2">Community</h3>
              <p>Stay connected with local initiatives.</p>
            </Link>
          </div>
        </div>
      </section> */}
      <section className="bg-primary text-white py-14 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Farm Bureau Today</h2>

        <p className="max-w-xl mx-auto text-gray-200 mb-6">
          Become part of a strong agricultural community dedicated to supporting
          farmers and rural families.
        </p>

        <Link
          to="/membership"
          className="bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
