import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api/officers";

export default function Officers() {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    loadOfficers();
  }, []);

  const loadOfficers = async () => {
    try {
      const res = await axios.get(API);
      setOfficers(res.data);
    } catch (err) {
      console.error("Error loading officers:", err);
    }
  };

  const officerList = officers.filter((person) => person.type === "Officer");

  const memberList = officers.filter((person) => person.type === "Member");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="relative bg-[url('/farm.png')] bg-cover bg-center h-[35vh] flex items-center">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">
            County Officers & Members
          </h1>

          <p className="mt-3 text-gray-200 text-lg">
            Meet the leaders and members supporting local agriculture.
          </p>
        </div>
      </section>

      {/* OFFICERS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Officers
        </h2>

        {officerList.length === 0 ? (
          <p className="text-center text-gray-500">
            No officers have been added.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {officerList.map((person) => (
              <div
                key={person._id}
                className="bg-white rounded-2xl shadow-lg p-6 text-center"
              >
                <h3 className="text-xl font-bold text-primary">
                  {person.name}
                </h3>

                <p className="font-semibold mt-2">{person.position}</p>

                {person.county && (
                  <p className="text-gray-600 mt-2">County: {person.county}</p>
                )}

                {person.location && (
                  <p className="text-gray-600 mt-2">📍 {person.location}</p>
                )}

                {person.commodities && (
                  <p className="text-gray-600 mt-2">🌱 {person.commodities}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MEMBERS */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Members
        </h2>

        {memberList.length === 0 ? (
          <p className="text-center text-gray-500">
            No members have been added.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberList.map((person) => (
              <div key={person._id} className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-bold">{person.name}</h3>

                {person.county && (
                  <p className="text-gray-600 mt-2">County: {person.county}</p>
                )}

                {person.location && (
                  <p className="text-gray-600 mt-2">📍 {person.location}</p>
                )}

                {person.commodities && (
                  <p className="text-gray-600 mt-2">🌱 {person.commodities}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
