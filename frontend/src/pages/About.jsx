import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HERO */}

      <section
        className="
          relative
          bg-[url('/farm.png')]
          bg-cover
          bg-center
          min-h-[40vh]
          flex
          items-center
        "
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div
          className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          text-white
        "
        >
          <h1
            className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
          "
          >
             Alamance County Farm Bureau
          </h1>

          <p
            className="
            mt-4
            max-w-2xl
            text-base
            sm:text-lg
            text-gray-200
          "
          >
            Working together to strengthen agriculture, support farm families,
            and serve our local community.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}

      <section className="bg-white py-20">
        <div
          className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
        "
        >
          <div
            className="
            grid
            lg:grid-cols-2
            gap-12
            items-center
          "
          >
            <div>
              <h2
                className="
                text-3xl
                font-bold
                text-green-800
                mb-6
              "
              >
                Who We Are
              </h2>

              <p
                className="
                text-gray-700
                leading-8
              "
              >
                Alamance County Farm Bureau has proudly represented and served
                local farmers and rural families for generations. Our
                organization is dedicated to promoting agriculture, protecting
                the interests of our members, and strengthening the communities
                we call home.
              </p>

              <p
                className="
                mt-5
                text-gray-700
                leading-8
              "
              >
                Through advocacy, leadership development, youth education,
                scholarships, and community outreach, we continue to invest in
                the future of agriculture throughout Alamance County.
              </p>
            </div>

            <div>
              <img
                src="/cows.png"
                alt="Farm Bureau"
                className="
                  rounded-3xl
                  shadow-2xl
                  w-full
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* PURPOSE */}

      <section className="bg-green-100 py-20">
        <div
          className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
        "
        >
          <h2
            className="
            text-3xl
            font-bold
            text-green-800
            text-center
            mb-12
          "
          >
            Our Purpose
          </h2>

          <div
            className="
            grid
            md:grid-cols-3
            gap-8
          "
          >
            {[
              {
                icon: "🌱",
                title: "Mission",
                text: "Promote agriculture, advocate for farm families, and strengthen rural communities through education and leadership.",
              },
              {
                icon: "🌎",
                title: "Vision",
                text: "A thriving agricultural community where future generations continue the traditions and innovations of farming.",
              },
              {
                icon: "🤝",
                title: "Values",
                text: "Integrity, leadership, education, stewardship, service, and a commitment to supporting our agricultural heritage.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-8
                  text-center
                  hover:-translate-y-2
                  transition
                "
              >
                <div className="text-5xl mb-4">{item.icon}</div>

                <h3
                  className="
                  text-xl
                  font-bold
                  text-green-700
                  mb-4
                "
                >
                  {item.title}
                </h3>

                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="
        bg-gradient-to-r
        from-green-900
        via-green-800
        to-green-700
        text-white
        py-24
      "
      ></section>
      {/* WHAT WE DO */}

      <section className="bg-green-100 py-20">
        <div
          className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
        "
        >
          <h2
            className="
            text-3xl
            font-bold
            text-green-800
            text-center
            mb-12
          "
          >
            What We Do
          </h2>

          <div
            className="
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
          "
          >
            {[
              [
                "🚜",
                "Advocacy",
                "Representing agriculture at the local, state, and national levels.",
              ],
              [
                "🎓",
                "Education",
                "Supporting youth programs, scholarships, and agricultural education.",
              ],
              [
                "🌾",
                "Community",
                "Investing in local events, families, schools, and partnerships.",
              ],
              [
                "⭐",
                "Leadership",
                "Developing future agricultural leaders through Farm Bureau programs.",
              ],
            ].map((item) => (
              <div
                key={item[1]}
                className="
                  bg-gray-50
                  rounded-3xl
                  shadow-lg
                  p-8
                  text-center
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition
                "
              >
                <div className="text-5xl mb-4">{item[0]}</div>

                <h3 className="text-xl font-bold mb-3">{item[1]}</h3>

                <p className="text-gray-600">{item[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}

      <section
        className="
        bg-gradient-to-r
        from-green-900
        via-green-800
        to-green-700
        text-white
        py-24
      "
      ></section>

      {/* LEADERSHIP */}

      

      
    </div>
  );
}
