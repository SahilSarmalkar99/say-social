export default function ProcessSection() {
  const steps = [
    {
      title: "Step 1: Planning",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      images: 2,
    },
    {
      title: "Step 2: Ideating",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      images: 2,
    },
    {
      title: "Step 3: Execution",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      images: 4,
    },
  ];

  return (
    <section className="relative w-full bg-[#1d1028] text-white py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#6c3b8f33,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Project Overview */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Project Overview
          </h2>

          <p className="text-white/70 leading-relaxed text-sm md:text-base">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
            aut fugit.
          </p>
        </div>

        {/* Divider */}
        <div className="my-16">
          <div className="border-t border-dashed border-white/20"></div>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div key={index}>
              {/* Title */}
              <h3 className="text-center text-3xl font-serif mb-6">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-center text-white/70 max-w-4xl mx-auto leading-relaxed mb-10">
                {step.description}
              </p>

              {/* Image Grid */}
              <div
                className={`grid gap-6 ${
                  step.images === 4
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2"
                }`}
              >
                {[...Array(step.images)].map((_, i) => (
                  <div
                    key={i}
                    className="
                      h-[260px]
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      backdrop-blur-md
                      flex
                      items-center
                      justify-center
                      overflow-hidden
                      transition-all
                      duration-300
                      hover:border-purple-400/40
                    "
                  >
                    {/* Replace with Image */}
                    <div className="w-10 h-10 border border-white/20 rounded flex items-center justify-center text-white/30">
                      🖼
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}