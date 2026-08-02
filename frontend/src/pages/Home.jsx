import { useRef, useState, useEffect } from "react";

import VideoIntro from "../components/home/VideoIntro";
import Hero from "../components/home/Hero";

import useVideoHeroAnimation from "../hooks/useVideoHeroAnimation";

import TrustedBrand from "../components/home/TrustedBrand";
import WorkResults from "../components/home/WorkResults";
import ContentSection from "../components/home/ContentSection";
import BrandingSection from "../components/home/BrandingSection";
import Testimonial from "../components/home/Testimonail";
import VideoCoverflow from "../components/home/VideoCoverflow";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashedSeparator from "../components/DashedSeparator";

export default function Home() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const heroRef = useRef(null);

  const [showNavbar, setShowNavbar] = useState(false);

  useVideoHeroAnimation(
    sectionRef,
    videoRef,
    overlayRef,
    heroRef,
    setShowNavbar
  );

  useEffect(() => {
    const handleScroll = () => {
      // Adjust this value until navbar appears
      // exactly when Hero becomes visible
      setShowNavbar(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <Navbar visible={showNavbar} />

      <section
        ref={sectionRef}
        className="relative h-[180vh]"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <VideoIntro
            videoRef={videoRef}
            overlayRef={overlayRef}
          />

          <Hero heroRef={heroRef} />
        </div>
      </section>
      <DashedSeparator />
      <TrustedBrand />
      <DashedSeparator />
      <WorkResults />
      <DashedSeparator />
      <ContentSection />
      <DashedSeparator />
      <BrandingSection />
      <DashedSeparator />
      <VideoCoverflow />
      <DashedSeparator />
      <Testimonial />
      <Footer />
    </>
  );
}