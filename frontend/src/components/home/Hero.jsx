import CoverflowCarousel from "./CoverFlowCarousel";

export default function Hero({ heroRef }) {
  return (
    <section
  ref={heroRef}
  className="
  absolute
  inset-0
  z-30

  flex
  flex-col
  items-center
  justify-center

  opacity-0
  "
>
      <CoverflowCarousel />

      
    </section>
  );
}