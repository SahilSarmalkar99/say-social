import useFadeUpCards from "../../hooks/useFadeIn";
import useTextReveal from "../../hooks/useTextReveal";

export default function TeamSection({ team }) {
  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();
  console.log(team)

  if (!team) return null;

  return (
    <section ref={fadeIn} className="py-10 md:py-20">
      {/* Header */}
      <div className="text-center text-white mb-12">
        <h2 ref={textReveal} className="mt-6 text-4xl md:text-6xl font-light">
          {team.name}
        </h2>
      </div>

      {/* Team Video */}
      {team?.video && (
        <div className="fade-card max-w-6xl mx-auto px-4 mb-16">
          <video
            src={team.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="
        w-full
        h-[250px]
        md:h-[500px]
        object-cover
        rounded-3xl
      "
          />
        </div>
      )}

      {/* Members */}
      <div
        className="
          fade-card
          max-w-7xl
          mx-auto
          px-4
          flex
          flex-wrap
          justify-center
          gap-6
        "
      >
        {team?.members?.map((member) => (
          <div
            key={member._id}
            className="
              group
              w-[160px]
              sm:w-[180px]
              md:w-[200px]
              cursor-pointer
            "
          >
            {/* Photo */}
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/5
              "
            >
              <img
                src={member.photo}
                alt={member.name}
                loading="lazy"
                className="
                  w-full
                  h-[220px]
                  sm:h-[260px]
                  object-cover
                  grayscale
                  transition-all
                  duration-500
                  group-hover:grayscale-0
                  group-hover:scale-105
                "
              />
            </div>

            {/* Info */}
            <div
              className="
                text-center
                mt-4
                opacity-0
                translate-y-3
                transition-all
                duration-500
                group-hover:opacity-100
                group-hover:translate-y-0
              "
            >
              <h3 className="text-lg font-medium text-white">{member.name}</h3>

              <p className="text-sm text-white/60">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
