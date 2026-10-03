import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { getSiteSettings } from "../api/site-settings";

export default function Navbar({ visible = true }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const lastScrollY = useRef(0);

  // Phone / WhatsApp number
  const phoneNumber = "7021374839";
  const phoneLink = `tel:+91${phoneNumber}`;
  const whatsappLink = `https://wa.me/91${phoneNumber}`;

  // =========================
  // FETCH LOGO
  // =========================
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await getSiteSettings();
        setLogoUrl(response.data.logoUrl);
      } catch (error) {
        console.error("Failed to fetch navbar logo:", error);
      }
    };

    fetchSiteSettings();
  }, []);

  // =========================
  // HANDLE SCROLL
  // =========================
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 50);

      if (current > lastScrollY.current && current > 200) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================
  // LOCK BODY SCROLL
  // WHEN MOBILE MENU IS OPEN
  // =========================
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // =========================
  // NAVIGATION LINKS
  // =========================
  const navLinks = [
    {
      name: "Work",
      path: "/work",
    },
    {
      name: "Team",
      path: "/team",
    },
    {
      name: "Projects",
      path: "/project",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
    {
      name: "Careers",
      path: "/careers",
    },
  ];

  const shouldShow = visible && showNavbar;

  return (
    <>
      {/* =====================================================
          DESKTOP / NORMAL NAVBAR
      ====================================================== */}
      <header
        className={`
          fixed
          top-2 md:top-5
          left-0
          w-full
          z-[9999]
          px-3 sm:px-4 lg:px-6
          transition-all
          duration-700
          ease-out

          ${
            shouldShow
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }

          ${
            mobileOpen
              ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
              : ""
          }
        `}
      >
        <div className="max-w-7xl mx-auto relative">
          {/* Glow */}
          <div
            className="
              absolute
              inset-0
              blur-3xl
              opacity-40
              bg-gradient-to-r
              from-fuchsia-500/20
              via-purple-500/20
              to-cyan-500/20
              -z-10
            "
          />

          {/* =================================================
              MAIN NAVBAR
          ================================================= */}
          <div
            className={`
              relative
              h-20
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-[30px]
              shadow-[0_20px_80px_rgba(0,0,0,0.35)]
              transition-all
              duration-500
              overflow-hidden

              ${scrolled ? "scale-[0.98]" : "scale-100"}
            `}
          >
            {/* Subtle Gradient */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-fuchsia-500/[0.03]
                via-transparent
                to-cyan-500/[0.03]
              "
            />

            <div
              className="
                relative
                h-full
                flex
                items-center
                justify-between
                px-4
                sm:px-6
                lg:px-8
              "
            >
              {/* =================================================
                  LOGO
              ================================================= */}
              <div className="justify-self-start flex items-center">
                <NavLink to="/">
                  <div className="flex items-center group cursor-pointer">
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt="SaySocial"
                        className="
                          w-auto
                          h-10
                          sm:h-11
                          md:h-12
                          max-w-[180px]
                          object-contain
                          object-left
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    )}
                  </div>
                </NavLink>
              </div>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}
              <nav
                className="
                  hidden
                  md:flex
                  justify-self-center
                  items-center
                  gap-10
                "
              >
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className="group"
                  >
                    {({ isActive }) => (
                      <div
                        className={`
                          relative
                          overflow-hidden
                          h-6
                          uppercase
                          text-[12px]
                          tracking-[0.25em]
                          font-medium

                          ${
                            isActive
                              ? "text-white"
                              : "text-white/55"
                          }
                        `}
                      >
                        {/* Normal Text */}
                        <span
                          className="
                            block
                            transition-transform
                            duration-500
                            group-hover:-translate-y-full
                          "
                        >
                          {link.name}
                        </span>

                        {/* Hover Text */}
                        <span
                          className="
                            absolute
                            top-full
                            left-0
                            transition-transform
                            duration-500
                            text-white
                            group-hover:-translate-y-full
                          "
                        >
                          {link.name}
                        </span>
                      </div>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* =================================================
                  RIGHT SIDE
              ================================================= */}
              <div className="justify-self-end">

                {/* =================================================
                    DESKTOP CTA
                ================================================= */}
                <a
                  href={phoneLink}
                  className="
                    hidden
                    md:flex
                    relative
                    overflow-hidden
                    items-center
                    gap-4
                    h-12
                    px-5
                    rounded-full
                    bg-white
                    text-black
                    font-semibold
                    group
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                >
                  {/* Shine Effect */}
                  <span
                    className="
                      absolute
                      inset-0
                      translate-x-[-100%]
                      bg-gradient-to-r
                      from-transparent
                      via-white/70
                      to-transparent
                      transition-transform
                      duration-1000
                      group-hover:translate-x-[100%]
                    "
                  />

                  {/* Icon */}
                  <div
                    className="
                      relative
                      w-8
                      h-8
                      rounded-full
                      bg-black
                      text-white
                      flex
                      items-center
                      justify-center
                      transition-transform
                      duration-500
                      group-hover:rotate-45
                    "
                  >
                    <ArrowUpRight size={14} />
                  </div>

                  {/* Text */}
                  <span className="relative">
                    Book A Call
                  </span>
                </a>

                {/* =================================================
                    MOBILE HAMBURGER
                ================================================= */}
                <button
                  onClick={() => setMobileOpen(true)}
                  className="
                    md:hidden
                    w-12
                    h-12
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.05]
                    backdrop-blur-xl
                    text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    hover:bg-white/10
                  "
                  aria-label="Open menu"
                  aria-expanded={mobileOpen}
                >
                  <Menu size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          FULLSCREEN MOBILE MENU
      ====================================================== */}
      <div
        className={`
          fixed
          inset-0
          z-[10000]
          md:hidden
          bg-black
          overflow-hidden
          transition-all
          duration-500

          ${
            mobileOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      >
        {/* =================================================
            MOBILE MENU HEADER
        ================================================= */}
        <div
          className="
            absolute
            top-0
            left-0
            w-full
            px-5
            sm:px-7
            py-5
            flex
            items-center
            justify-between
          "
        >
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center"
          >
            {logoUrl && (
              <img
                src={logoUrl}
                alt="SaySocial"
                className="
                  h-10
                  sm:h-11
                  w-auto
                  max-w-[170px]
                  object-contain
                "
              />
            )}
          </NavLink>

          {/* Close Button */}
         <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileOpen(false);
  }}
  className="
    relative
    z-[10001]
    w-12
    h-12
    rounded-full
    border
    border-white/10
    bg-white/[0.06]
    backdrop-blur-xl
    text-white
    flex
    items-center
    justify-center
    cursor-pointer
    transition-all
    duration-300
    hover:bg-white/10
    hover:rotate-90
  "
  aria-label="Close menu"
>
  <X size={26} />
</button>
        </div>

        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}
        <div
          className="
            relative
            h-full
            min-h-screen
            flex
            flex-col
            justify-center
            items-center
            gap-6
            sm:gap-7
            px-6
          "
        >
          {/* Decorative Glow */}
          <div
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[350px]
              h-[350px]
              rounded-full
              bg-purple-600/10
              blur-[100px]
              pointer-events-none
            "
          />

          {/* Navigation Links */}
          {navLinks.map((link, index) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`
                relative
                z-10
                text-4xl
                sm:text-5xl
                font-black
                tracking-tight
                text-white/70
                hover:text-white
                transition-all
                duration-300
                ${
                  mobileOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }
              `}
              style={{
                transitionDelay: mobileOpen
                  ? `${index * 60}ms`
                  : "0ms",
              }}
            >
              {link.name}
            </NavLink>
          ))}

          {/* =================================================
              MOBILE WHATSAPP BUTTON
          ================================================= */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className={`
              relative
              z-10
              mt-5
              flex
              items-center
              gap-4
              px-7
              py-4
              rounded-full
              bg-white
              text-black
              font-semibold
              transition-all
              duration-500
              hover:scale-105

              ${
                mobileOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }
            `}
            style={{
              transitionDelay: mobileOpen
                ? `${navLinks.length * 60 + 100}ms`
                : "0ms",
            }}
          >
            <span>WhatsApp Us</span>

            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </>
  );
}