import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {getSiteSettings} from "../api/site-settings";

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await getSiteSettings();
        setLogoUrl(response.data.logoUrl);
      } catch (error) {
        console.error("Failed to fetch footer logo:", error);
      }
    };

    fetchSiteSettings();
  }, []);

  return (
    <footer className="">
      <div
        className="
          relative
          overflow-hidden
          min-h-[700px]
          px-6
          md:px-12
          lg:px-20
          py-12
          md:py-16
          flex
          flex-col
          justify-between
        "
      >
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Center Glow */}
          <div
            className="
              absolute
              w-[500px]
              h-[300px]
              rounded-full
              blur-[180px]
              opacity-40
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
            "
            style={{
              background: "#51385F",
            }}
          />

          {/* Bottom Left Glow */}
          <div
            className="
              absolute
              w-[400px]
              h-[400px]
              rounded-full
              blur-[140px]
              opacity-50
              left-20
              bottom-0
            "
            style={{
              background: "#51385F",
            }}
          />

          {/* Bottom Right Glow */}
          <div
            className="
              absolute
              w-[500px]
              h-[500px]
              rounded-full
              blur-[150px]
              opacity-40
              right-0
              bottom-0
            "
            style={{
              background: "#51385F",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Contact */}
          <div className="max-w-7xl">
            <div className="flex items-center gap-2 text-[32px] text-gray-300 mb-6">
              <Sparkles size={12} />
              <span>Contact Us</span>
            </div>

            <h2
              className="
                text-white
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-[72px]
                font-medium
                leading-tight
                tracking-tight
              "
            >
              Interested in working together,
              trying our platform or simply
              learning more?
            </h2>
          </div>

          {/* Middle Section */}
          <div
            className="
              mt-16
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-12
            "
          >
            {/* Email */}
            <div>
              <p className="text-gray-400 text-sm mb-3">
                Contact us at:
              </p>

              <a
                href="/contact"
                className="
                  text-white
                  text-xl
                  md:text-2xl
                  flex
                  items-center
                  gap-2
                  hover:text-gray-300
                  transition
                "
              >
                hello@saysocial.in
                <ArrowUpRight size={18} />
              </a>
            </div>

            {/* Navigation */}
            <nav
              className="
                flex
                flex-wrap
                gap-6
                md:gap-10
                text-white
                text-lg
              "
            >
              <a href="/work">Works</a>
              <a href="/team">Team</a>
              <a href="/project">Projects</a>
              <a href="/careers">Careers</a>
            </nav>
          </div>
        </div>

        {/* Dynamic Logo */}
        <div className="relative z-10 mt-20">
          <div
            className="
              flex
              items-end
              justify-start
            "
          >
            {logoUrl && (
              <img
                src={logoUrl}
                alt="SaySocial"
                className="
                  w-auto
                  max-w-[320px]
                  md:max-w-[500px]
                  lg:max-w-[700px]
                  h-auto
                  max-h-[180px]
                  md:max-h-[220px]
                  lg:max-h-[280px]
                  object-contain
                  object-left
                "
              />
            )}
          </div>

          {/* Bottom Bar */}
          <div
            className="
              mt-8
              flex
              flex-col
              md:flex-row
              justify-between
              gap-4
              text-xs
              text-gray-400
            "
          >
            <p>
              © 2026 Datawizz. All rights reserved.
            </p>

            <div className="flex gap-6">
              <a href="#">LinkedIn</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
