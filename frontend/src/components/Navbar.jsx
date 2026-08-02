import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar({ visible = true }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);

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

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

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
              ${
                scrolled
                  ? "scale-[0.98]"
                  : "scale-100"
              }
            `}
          >
            {/* subtle gradient */}
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

            <div className="relative h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
              {/* LOGO */}
              <div className="justify-self-start flex items-center gap-5">
                <NavLink to="/">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    {/* Dummy Symbol */}
                    <div className="relative w-11 h-11">
                      <div
                        className="
                          absolute
                          inset-0
                          rounded-full
                          border
                          border-white/20
                          transition-all
                          duration-700
                          group-hover:rotate-180
                        "
                      />

                      <div
                        className="
                          absolute
                          top-1/2
                          left-1/2
                          -translate-x-1/2
                          -translate-y-1/2
                          w-3
                          h-3
                          rounded-full
                          bg-gradient-to-r
                          from-fuchsia-400
                          via-purple-400
                          to-cyan-400
                        "
                      />
                    </div>

                    <div className="leading-none">
                      <h1
                        className="
                          text-white
                          text-xl
                          lg:text-2xl
                          font-black
                          tracking-[-0.04em]
                        "
                      >
                        SAY SOCIAL
                      </h1>

                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.45em]
                          text-white/35
                          mt-1
                        "
                      >
                        CREATIVE AGENCY
                      </p>
                    </div>
                  </div>
                </NavLink>

                
              </div>

              {/* DESKTOP NAV */}
              <nav className="hidden md:flex justify-self-center items-center gap-10">
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

              {/* CTA */}
              <div className="justify-self-end">
                <NavLink
                  to="/book"
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

                  <span className="relative">
                    Book A Call
                  </span>
                </NavLink>

                {/* Mobile Button */}
                <button
                  onClick={() =>
                    setMobileOpen(!mobileOpen)
                  }
                  className="md:hidden text-white"
                >
                  {mobileOpen ? (
                    <X size={30} />
                  ) : (
                    <Menu size={30} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`
          fixed
          inset-0
          z-[9998]
          md:hidden
          bg-black/90
          backdrop-blur-3xl
          transition-all
          duration-500
          ${
            mobileOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      >
        <div className="h-full flex flex-col justify-center items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                text-4xl
                font-black
                tracking-tight
                text-white/70
                hover:text-white
                transition-all
              "
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/book"
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              mt-8
              flex
              items-center
              gap-4
              px-6
              py-4
              rounded-full
              bg-white
              text-black
              font-semibold
            "
          >
            Book A Call

            <ArrowUpRight size={18} />
          </NavLink>
        </div>
      </div>
    </>
  );
}