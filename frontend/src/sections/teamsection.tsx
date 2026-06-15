const teamMembers = [
  {
    name: "Dr. Shahid Habib",
    role: "Founder & CEO",
    email: "ceo@sisharglobal.com",
    image: "/team/shahid-habib.jpg",
  },
  {
    name: "Safiur Rahman",
    role: "Founder & Managing Director",
    email: "safi@sisharglobal.com",
    image: "/team/safiur-rahman.jpg",
  },
  {
    name: "Mohammad Asrar",
    role: "Founder & CFO",
    email: "cfo@sisharglobal.com",
    image: "/team/mohammad-asrar.jpg",
  },
  {
    name: "Shakil Ahmad",
    role: "Chief Operating Officer (COO)",
    email: "coo@sisharglobal.com",
    image: "/team/shakil-ahmad.jpg",
  },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      className="py-12 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">

          <span className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 font-semibold text-sm uppercase tracking-[3px]">
            Our Leadership
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-primary-600">
            Meet Our Team
          </h2>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Experienced professionals driving international trade,
            sourcing excellence and global business growth.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">

          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4 text-center">

                <h3 className="text-lg font-bold text-primary-600 leading-tight">
                  {member.name}
                </h3>

                <p className="mt-2 text-accent-600 text-sm font-semibold min-h-[40px]">
                  {member.role}
                </p>

                <div className="w-10 h-[2px] bg-accent-500 mx-auto my-3"></div>

                <a
                  href={`mailto:${member.email}`}
                  className="text-xs text-slate-500 hover:text-primary-600 transition"
                >
                  {member.email}
                </a>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}