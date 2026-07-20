export default function Officers() {
  const officers = [
    {
      name: "Vaugh Willoughby",
      title: "President",
      location: "Northwest",
      commodities: "Nursery Crops, Landscaping",
    },
    {
      name: "Renee McPherson",
      title: "Vice-President",
      location: "Southeast",
      commodities:
        "Field Crops, Beef Cattle, Hay, Vegetable Plants, Cut Flowers",
    },
    {
      name: "Ricky Reid",
      title: "Secretary/Treasurer",
      location: "Northwest",
      commodities: "Field Crops, Beef Cattle, Hay",
    },
  ];

  const members = [
    {
      name: "Allison Cooper",
      location: "Southeast",
      commodities: "Beef Cattle, Poultry, Pork, Goats, Season Produce, Hay",
    },
    {
      name: "Tim Covington",
      location: "East",
      commodities: "Goats, Landscaping",
    },
    {
      name: "Doug Gilliam",
      location: "N. Central",
      commodities: "Beef Cattle, Hay",
    },
    {
      name: "Willie Holliday",
      location: "South",
      commodities: "Field Crops, Beef Cattle, Hay",
    },
    {
      name: "Eric McPherson",
      location: "South",
      commodities: "Poultry, Beef Cattle, Hay",
    },
    {
      name: "Michael McPherson",
      location: "Southeast",
      commodities:
        "Field Crops, Beef Cattle, Hay, Vegetable Plants, Cut Flowers",
    },
    {
      name: "Kyle Norris",
      location: "Northwest",
      commodities: "Tobacco, Field Crops",
    },
    {
      name: "Rob Stas",
      location: "West & South",
      commodities: "Field Crops",
    },
    {
      name: "Randall Smith",
      location: "Southwest",
      commodities: "Poultry, Beef Cattle, Hay",
    },
  ];

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

        <div className="grid md:grid-cols-3 gap-6">
          {officers.map((person) => (
            <div
              key={person.name}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <h3 className="text-xl font-bold text-primary">{person.name}</h3>

              <p className="font-semibold mt-2">{person.title}</p>

              <p className="text-gray-600 mt-3">📍 {person.location}</p>

              <p className="text-gray-600 mt-2">🌱 {person.commodities}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERS */}

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Members
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((person) => (
            <div key={person.name} className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-bold">{person.name}</h3>

              <p className="text-gray-600 mt-2">📍 {person.location}</p>

              <p className="text-gray-600 mt-2">🌱 {person.commodities}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
