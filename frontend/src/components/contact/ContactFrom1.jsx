import { useState, useRef, useEffect } from "react";
import { ArrowRight, X, Mail, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";
import vid from "../../assets/contact/sec.mp4";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import { submitContactInquiry } from "../../api/contactApi";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [emailError, setEmailError] = useState("");

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

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setStatus("Please enter your name.");
      return false;
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())
    ) {
      setStatus("Please enter a valid email address.");
      return false;
    }

    const phone = form.phone.replace(/\\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setStatus("Please enter a valid 10-digit Indian mobile number.");
      return false;
    }

    if (!message.trim()) {
      setStatus("Please tell us about your project.");
      return false;
    }

    try {
      setSending(true);
      setStatus("");

      await submitContactInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        reason: form.reason.trim(),
        message: message.trim(),
      });

      setStatus(
        "Thank you! Your inquiry has been sent successfully. We’ll get back to you soon."
      );
      alert(
        "Thank you! Your inquiry has been sent successfully. We’ll get back to you soon."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        reason: "",
      });

      setMessage("");
      setEditing(false);
      setShowInquiryModal(false);
      return true;
    } catch (error) {
      console.error("Contact form submission error:", error);

      setStatus(
        error?.response?.data?.message ||
          "Something went wrong while sending your inquiry. Please try again."
      );
      return false;
    } finally {
      setSending(false);
    }
  };
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
                <span
                  ref={textReveal1}
                  className="uppercase tracking-[0.3em] text-xl  text-white/100"
                >
                  Available for Projects
                </span>
              </div>

              <h2
                ref={textReveal2}
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
                    Hi Say Social,
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
                        <span
                          ref={textReveal4}
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
        {/* Contact inquiry CTA */}
        <div className="mt-20 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Have an idea?
              </p>
              <h3 className="mt-4 text-3xl font-light tracking-tight text-[#DCCAB3] md:text-5xl">
                Let’s talk about it.
              </h3>
              <p className="mt-4 text-base leading-7 text-white/45">
                Tell us what you’re building, and our team will get back to you.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setStatus("");
                setShowInquiryModal(true);
              }}
              className="
                group relative inline-flex w-fit items-center gap-4
                overflow-hidden rounded-full
                border border-white/15
                bg-white/[0.03]
                px-7 py-4 text-base font-medium
                text-white
                backdrop-blur-md
                transition-all duration-500
                hover:border-white/35
                hover:bg-white/[0.06]
                hover:-translate-y-0.5
              "
            >
              <span className="relative z-10 flex items-center gap-3">
                <span
                  className="
                    relative flex h-10 w-10 items-center justify-center
                    overflow-hidden rounded-full
                    bg-orange-500 text-white
                  "
                >
                  <Mail
                    size={18}
                    className="absolute transition-all duration-500 group-hover:-translate-y-10 group-hover:translate-x-8 group-hover:opacity-0"
                  />
                  <Send
                    size={18}
                    className="absolute translate-y-10 -translate-x-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </span>

                <span>Contact Us</span>

                <ArrowRight
                  size={19}
                  className="transition-transform duration-500 group-hover:translate-x-1.5"
                />
              </span>
            </button>
          </div>
        </div>

        {status && (
          <p className="mt-6 text-sm text-white/60" role="status">
            {status}
          </p>
        )}

        {/* Inquiry Popup */}
        {showInquiryModal && (
          <div
            className="
              fixed inset-0 z-[9999]
              flex h-[100dvh] w-full items-center justify-center
              overflow-y-auto
              bg-black/75 px-3 py-4
              backdrop-blur-md
              sm:px-6 sm:py-8
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
            onMouseDown={(e) => {
              if (e.target === e.currentTarget && !sending) {
                setShowInquiryModal(false);
              }
            }}
          >
            <div
              className="
                relative my-auto w-full max-w-2xl
                overflow-hidden rounded-3xl
                border border-white/10
                bg-[#0d0d14]
                text-white
                shadow-[0_30px_120px_rgba(0,0,0,0.65)]
              "
            >
              {/* Popup header */}
              <div className="flex items-start justify-between gap-5 border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-400">
                    Contact Us
                  </p>

                  <h3 className="mt-2 text-2xl font-light tracking-tight sm:text-4xl">
                    Tell us about your idea.
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    All fields marked with * are required.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowInquiryModal(false)}
                  disabled={sending}
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-full border border-white/10
                    bg-white/[0.04] text-white/50
                    transition hover:bg-white/10 hover:text-white
                    disabled:opacity-40
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* Popup form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleSubmit();
                }}
                noValidate
                className="px-5 py-6 sm:px-7 sm:py-7"
              >
                {status && !status.includes("successfully") && (
                  <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    {status}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/45">
                      Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-orange-400/50 focus:bg-white/[0.05]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/45">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                      />
                      <input
                          required
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => {
                            const value = e.target.value;

                            setForm((prev) => ({
                              ...prev,
                              email: value,
                            }));

                            if (!value.trim()) {
                              setEmailError("Email address is required.");
                            } else if (
                              !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
                                value.trim()
                              )
                            ) {
                              setEmailError("Please enter a valid email address.");
                            } else {
                              setEmailError("");
                            }
                          }}
                          onBlur={() => {
                            const value = form.email.trim();

                            if (!value) {
                              setEmailError("Email address is required.");
                            } else if (
                              !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
                            ) {
                              setEmailError("Please enter a valid email address.");
                            } else {
                              setEmailError("");
                            }
                          }}
                          placeholder="you@example.com"
                          aria-invalid={Boolean(emailError)}
                          className={`w-full rounded-xl border bg-white/[0.035] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:bg-white/[0.05] ${
                            emailError
                              ? "border-red-400/60 focus:border-red-400"
                              : "border-white/10 focus:border-orange-400/50"
                          }`}
                        />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/45">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                      />
                      <input
                        required
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Allow digits, spaces, +, -, and parentheses while typing.
                          // Do NOT block keyboard input so mobile/desktop typing works normally.
                          if (/^[0-9+\\s()\\-]*$/.test(value)) {
                            setForm((prev) => ({
                              ...prev,
                              phone: value,
                            }));
                          }
                        }}
                        onKeyDown={(e) => {
                          // Keep normal editing/navigation keys working.
                          if (
                            e.ctrlKey ||
                            e.metaKey ||
                            e.altKey ||
                            [
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                              "ArrowUp",
                              "ArrowDown",
                              "Tab",
                              "Home",
                              "End",
                            ].includes(e.key)
                          ) {
                            return;
                          }

                          // Allow only phone characters.
                          if (!/[0-9+()\\-\\s]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.035] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-orange-400/50 focus:bg-white/[0.05]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/45">
                      Reason
                    </label>
                    <input
                      value={form.reason}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          reason: e.target.value,
                        }))
                      }
                      placeholder="Website, branding, AI..."
                      className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-orange-400/50 focus:bg-white/[0.05]"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/45">
                    Project enquiry *
                  </label>

                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    placeholder="Tell us what you want to build, your goals, timeline, or anything else we should know..."
                    className="min-h-[150px] w-full resize-y rounded-xl tracking-wide border border-white/10 bg-white/[0.035] px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-orange-400/50 focus:bg-white/[0.05]"
                  />
                </div>

                {/* Animated send button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="
                    group relative mt-6 flex w-full
                    items-center justify-center gap-3
                    overflow-hidden rounded-xl
                    bg-gradient-to-r from-orange-500 to-orange-400
                    px-6 py-4 text-sm font-semibold text-white
                    shadow-lg shadow-orange-500/10
                    transition-all duration-300
                    hover:brightness-105 hover:shadow-orange-500/20
                    disabled:pointer-events-none disabled:opacity-60
                  "
                >
                  {sending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending your inquiry...
                    </>
                  ) : (
                    <>
                      <span
                        className="
                          relative flex h-7 w-7 items-center justify-center
                          overflow-hidden rounded-full bg-white/15
                        "
                      >
                        <Mail
                          size={15}
                          className="absolute transition-all duration-500 group-hover:-translate-y-7 group-hover:opacity-0"
                        />
                        <Send
                          size={15}
                          className="absolute translate-y-7 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                        />
                      </span>

                      Contact Us
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

       
      </div>
    </section>
  );
}
