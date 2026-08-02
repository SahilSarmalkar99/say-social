import { useState, useRef, useEffect } from "react";
import { Menu, ArrowRight } from "lucide-react";
import vid from "../../assets/contact/sec.mp4"
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";

export default function ContactForm() {
  const [message, setMessage] = useState("");
const [editing, setEditing] = useState(false);

const textareaRef = useRef(null);

useEffect(() => {
  if (editing && textareaRef.current) {
    textareaRef.current.focus();

    const length = textareaRef.current.value.length;

    textareaRef.current.setSelectionRange(length, length);
  }
}, [editing]);

const heroTextClass = `
  text-[#DCCAB3]
  text-4xl
  md:text-6xl
  lg:text-7xl
  leading-[1.1]
  font-light
  tracking-tight
`;

const textReveal1 = useTextReveal();
const textReveal2 = useTextReveal();
const textReveal3 = useTextReveal();
const textReveal4 = useTextReveal();
const textReveal5 = useTextReveal();
const fadeIn = useFadeUpCards();

  return (
    <section ref={fadeIn} className="relative text-white overflow-hidden  ">
      {/* Grid Lines */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 h-full w-px bg-white/[0.06]" />
        <div className="absolute right-[10%] top-0 h-full w-px bg-white/[0.06]" />
      </div> */}

      {/* ================= HERO ================= */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden border-b border-white/10">
        <video
          autoPlay
          loading="lazy"
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        >
          <source src={vid} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 h-full flex flex-col">

          {/* HERO CONTENT */}
          <div className="flex-1 flex items-end md:py-32">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                <span ref={textReveal1} className="uppercase tracking-[0.3em] text-xl  text-white/100">
                  Available for Projects
                </span>
              </div>

              <h2 ref={textReveal2}
                className="
                  text-[48px]
                  sm:text-[70px]
                  md:text-[90px]
                  lg:text-[120px]
                  leading-[0.9]
                  font-light
                  tracking-tight
                "
              >
                Let's build
                <br />
                something remarkable
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className=" max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* Message Intro */}
        <div className="grid lg:grid-cols-12 gap-16">
  <div className="fade-card lg:col-span-3">
    <div className="sticky top-24">
  <p className="text-sm uppercase tracking-[0.25em] text-white/50 mb-12">
    Start a Conversation
  </p>

  <div className="space-y-10">
    <div>
      <p className="text-white text-xl mb-3 font-medium">
        What are you building?
      </p>
      <p className="text-white/50 text-base leading-relaxed">
        Website, branding, motion or a complete digital experience.
      </p>
    </div>

    <div>
      <p className="text-white text-xl mb-3 font-medium">
        Timeline
      </p>
      <p className="text-white/50 text-base leading-relaxed">
        Launch dates, milestones and priorities.
      </p>
    </div>

    <div>
      <p className="text-white text-xl mb-3 font-medium">
        Response
      </p>
      <p className="text-white/50 text-base leading-relaxed">
        Usually within 24 hours.
      </p>
    </div>
  </div>
</div>
  </div>

  <div className="lg:col-span-9">
        <div className="relative pr-16 border-r border-white/10">
            <div className="relative">
 <div className="relative pl-14">
  {/* Line */}
  <div
    className="
      absolute
      left-0
      top-0
      bottom-0
      w-px
      bg-white/10
    "
  />

  {/* Dot */}
  <div
    className="
      absolute
      left-[-5px]
      top-6
      h-[10px]
      w-[10px]
      rounded-full
      bg-[#DCCAB3]
    "
  />

  <h3 ref={textReveal3} className={heroTextClass}>
    Hi Nexa,
  </h3>

  <div className="mt-6">
    {!editing ? (
      <button
        onClick={() => setEditing(true)}
        className="
          text-left
          w-full
        "
      >
        <span ref={textReveal4}
          className="
            text-white/40
            text-3xl
            md:text-5xl
            lg:text-6xl
            font-light
          "
        >
          Tell us about your project
          <span className="animate-pulse text-[#DCCAB3] ml-1">
            |
          </span>
        </span>
      </button>
    ) : (
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);

          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        rows={1}
        placeholder="Tell us about your project..."
        className="
          w-full
          bg-transparent
          text-white
          text-3xl
          md:text-5xl
          lg:text-6xl
          font-light
          leading-[1.15]
          resize-none
          outline-none
          placeholder:text-white/30
        "
      />
    )}
  </div>
</div>
            </div>
            </div>
          </div>
        </div>

        {/* Fields */}
        {/* <div className="mt-24 grid md:grid-cols-2 gap-x-16 gap-y-14">
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-white/40 mb-5">
              Your Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="
                w-full
                bg-transparent
                border-b border-white/10
                py-4
                text-xl
                outline-none
                transition-all
                focus:border-white
              "
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-white/40 mb-5">
              Email Address
            </label>

            <input
              type="email"
              placeholder="john@company.com"
              className="
                w-full
                bg-transparent
                border-b border-white/10
                py-4
                text-xl
                outline-none
                transition-all
                focus:border-white
              "
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-white/40 mb-5">
              Company
            </label>

            <input
              type="text"
              placeholder="Acme Inc."
              className="
                w-full
                bg-transparent
                border-b border-white/10
                py-4
                text-xl
                outline-none
                transition-all
                focus:border-white
              "
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-white/40 mb-5">
              Budget
            </label>

            <input
              type="text"
              placeholder="$5k - $20k"
              className="
                w-full
                bg-transparent
                border-b border-white/10
                py-4
                text-xl
                outline-none
                transition-all
                focus:border-white
              "
            />
          </div>
        </div> */}
        <div className="mt-20 border-t border-white/10 pt-8"></div>
        {/* Submit */}
          <div className="fade-card flex justify-end pr-4 lg:pr-0">
            <button
    className="
      group
      relative
      overflow-hidden
      rounded-full
      border border-white/15
      px-10 py-5
      text-lg
      backdrop-blur-md
      transition-all
      duration-500
      hover:border-white/40
    "
  >
    <span
      className="
        absolute
        inset-0
        bg-white
        scale-x-0
        origin-left
        transition-transform
        duration-500
        group-hover:scale-x-100
      "
    />

    <span className="relative flex items-center gap-4 group-hover:text-black transition-colors">
      Send Inquiry
      <ArrowRight
        size={20}
        className="group-hover:translate-x-2 transition-transform"
      />
    </span>
            </button>
          </div>




         {/* CONTACT INFO */}
<div className="">
  <div className="py-16">
    <h3 ref={textReveal5}
      className="
        text-3xl
        md:text-5xl
        font-light
        tracking-tight
        text-[#DCCAB3]
      "
    >
      Contact Points
    </h3>
  </div>

  <div className="fade-card grid md:grid-cols-3 border-t border-white/10">
    {/* Card 1 */}
    <div className="p-10 border-b md:border-b-0 md:border-r border-white/10">
      <h4 className="text-xl mb-6">Nexa Studio</h4>

      <p className="text-white/50 leading-relaxed">
        Mumbai, Maharashtra
        <br />
        India
      </p>
    </div>

    {/* Card 2 */}
    <div className="p-10 border-b md:border-b-0 md:border-r border-white/10">
      <h4 className="text-xl mb-6">General Enquiries</h4>

      <a
        href="mailto:hello@nexa.studio"
        className="text-white/50 hover:text-white transition-colors"
      >
        hello@nexa.studio
      </a>
    </div>

    {/* Card 3 */}
    <div className="p-10">
      <h4 className="text-xl mb-6">Projects</h4>

      <a
        href="mailto:projects@nexa.studio"
        className="text-white/50 hover:text-white transition-colors"
      >
        projects@nexa.studio
      </a>
    </div>
  </div>

  <div className="grid md:grid-cols-3 border-t border-white/10">
    {/* Card 4 */}
    <div className="p-10 border-b md:border-b-0 md:border-r border-white/10">
      <h4 className="text-xl mb-6">Partnerships</h4>

      <a
        href="mailto:partners@nexa.studio"
        className="text-white/50 hover:text-white transition-colors"
      >
        partners@nexa.studio
      </a>
    </div>

    {/* Card 5 */}
    <div className="p-10 border-b md:border-b-0 md:border-r border-white/10">
      <h4 className="text-xl mb-6">Careers</h4>

      <a
        href="mailto:careers@nexa.studio"
        className="text-white/50 hover:text-white transition-colors"
      >
        careers@nexa.studio
      </a>
    </div>

    {/* Card 6 */}
    <div className="p-10">
      <h4 className="text-xl mb-6">Availability</h4>

      <p className="text-white/50">
        Currently booking Q4 2026 projects
      </p>
    </div>
  </div>
</div>
      </div>

     
    </section>
  );
}