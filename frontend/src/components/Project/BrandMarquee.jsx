import "../../styles/BrandMarquee.css";

export default function BrandMarquee() {
  const topText = [
    "Visually driven strategies",
    "Creative direction",
    "Digital experiences",
    "Brand storytelling",
  ];

  const bottomText = [
    "We build brands",
    "We create impact",
    "We design experiences",
    "We craft identities",
  ];

  return (
   <section className="relative w-full overflow-hidden py-20 md:py-30">
      {/* Top Strip */}
      <div className="marquee-strip marquee-top">
        <div className="marquee">
          {[...topText, ...topText, ...topText].map((item, i) => (
            <div key={i} className="marquee-item">
              <span>{item}</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="marquee-strip marquee-bottom">
        <div className="marquee-reverse">
          {[...bottomText, ...bottomText, ...bottomText].map((item, i) => (
            <div key={i} className="marquee-item">
              <span>{item}</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}