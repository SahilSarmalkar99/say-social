import React from 'react'

const ContactHero = () => {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <video
        autoPlay
        muted
        loading="lazy"
        loop
        playsInline
        className=" absolute inset-0 w-full h-full object-cover object-center " >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  )
}

export default ContactHero