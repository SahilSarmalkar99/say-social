import { ArrowUpRight} from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import DashedSeparator from "../DashedSeparator";

export default function ContactSection() {
  return (
    <section
      className="
        bg-[#1A0A26]
        text-white
        py-20
        px-6
      "
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto">
        <h2
          className="
            text-center
            text-5xl
            md:text-7xl
            font-light
            leading-tight
            mb-16
          "
        >
          Start the conversation.
          <br />
          We'll handle the growth.
        </h2>

        {/* Dashed Line */}
        <DashedSeparator />
        {/* Content */}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        <div
          className=" mt-10
            flex
            flex-col
            lg:flex-row
            gap-12
            items-start
            justify-center
          "
        >
          {/* Form Card */}
          <div
            className="
              w-full
              max-w-3xl
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
              md:p-12
              backdrop-blur-md
            "
          >
            <form className="space-y-10">
              {/* Name */}
              <div>
                <label className="text-white/70 text-sm">
                  What is your Name?
                </label>

                <input
                  type="text"
                  className="
                    w-full
                    bg-transparent
                    border-b
                    border-white/30
                    outline-none
                    py-4
                  "
                />
              </div>

              {/* Email + Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white/70 text-sm">
                    Email id
                  </label>

                  <input
                    type="email"
                    className="
                      w-full
                      bg-transparent
                      border-b
                      border-white/30
                      outline-none
                      py-4
                    "
                  />
                </div>

                <div>
                  <label className="text-white/70 text-sm">
                    Phone no
                  </label>

                  <input
                    type="tel"
                    className="
                      w-full
                      bg-transparent
                      border-b
                      border-white/30
                      outline-none
                      py-4
                    "
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="text-white/70 text-sm">
                  Reason For Contacting
                </label>

                <input
                  type="text"
                  className="
                    w-full
                    bg-transparent
                    border-b
                    border-white/30
                    outline-none
                    py-4
                  "
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-white/70 text-sm">
                  Message
                </label>

                <textarea
                  rows={3}
                  className="
                    w-full
                    bg-transparent
                    border-b
                    border-white/30
                    outline-none
                    py-4
                    resize-none
                  "
                />
              </div>

              {/* Button */}
              <button
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  px-8
                  py-4
                  rounded-full
                  border
                  border-white/20
                  hover:bg-white/5
                  transition
                "
              >
                Submit Inquiry

                <span
                  className="
                    w-7
                    h-7
                    rounded-full
                    bg-white
                    text-black
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ArrowUpRight size={14} />
                </span>
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div
            className="
              lg:w-[300px]
              w-full
              pt-4
            "
          >
            <div className="mb-14">
              <h3 className="text-3xl font-medium mb-4">
                Contact Details
              </h3>

              <p className="text-white/70">
                hello@saysocial.in
              </p>

              <p className="text-white/70">
                +91 12345 67890
              </p>
            </div>

            <div className="mb-14">
              <h3 className="text-3xl font-medium mb-4">
                Address
              </h3>

              <p className="text-white/70">
                Mumbai, Maharashtra, India
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="
                  w-10
                  h-10
                  border
                  border-white/20
                  rounded-md
                  flex
                  items-center
                  justify-center
                "
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="
                  w-10
                  h-10
                  border
                  border-white/20
                  rounded-md
                  flex
                  items-center
                  justify-center
                "
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                className="
                  w-10
                  h-10
                  border
                  border-white/20
                  rounded-md
                  flex
                  items-center
                  justify-center
                "
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}