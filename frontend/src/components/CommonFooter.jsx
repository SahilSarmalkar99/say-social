import React from 'react'
import { ArrowUpRight } from "lucide-react";

const CommonFooter = () => {
  return (
    <footer className="border-t bg-black text-white  border-white/10">
            <div
              className="
              max-w-[1400px]
              mx-auto
              px-6
              py-12
            "
            >
              <div
                className="
                flex
                flex-col
                lg:flex-row
                items-center
                justify-between
                gap-10
              "
              >
                {/* Logo */}
                <div className="text-3xl font-semibold">
                  SAY SOCIAL
                </div>
    
                {/* Nav */}
                <div
                  className="
                  flex
                  flex-wrap
                  justify-center
                  gap-8
                  text-white/70
                "
                >
                  <a href="#">Home</a>
                  <a href="#">About</a>
                  <a href="#">Work</a>
                  <a href="#">Contact</a>
                </div>
    
                {/* CTA */}
                <button
                  className="
                  px-8
                  py-4
                  rounded-full
                  border
                  border-white/20
                  flex
                  items-center
                  gap-3
                  hover:bg-white/5
                  transition
                "
                >
                  Contact Us Now
    
                  <span
                    className="
                    w-8
                    h-8
                    rounded-full
                    bg-white
                    text-black
                    flex
                    items-center
                    justify-center
                  "
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              </div>
    
              {/* Bottom */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
                <div className="hidden md:block"></div>
    
                <div className="flex justify-center gap-4">
                    <div className="w-10 h-10 border border-white/20 rounded-md" />
                    <div className="w-10 h-10 border border-white/20 rounded-md" />
                    <div className="w-10 h-10 border border-white/20 rounded-md" />
                </div>
    
                <div className="flex justify-center md:justify-end">
                    <p className="text-white/40 text-sm text-center md:text-right">
                    © 2026 Say Social. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
          </footer>
  )
}

export default CommonFooter