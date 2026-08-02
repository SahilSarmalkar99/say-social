import { useEffect } from "react";
import gsap from "gsap";

export default function use3DCarousel() {
  useEffect(() => {
    const images = document.querySelectorAll(".ring img");

    if (!images.length) return;

    const total = images.length;
    const angle = 360 / total;
    const radius = 550;

    images.forEach((img, i) => {
      const currentAngle = i * angle;

      img.dataset.angle = currentAngle;

      img.style.transform = `
        rotateY(${currentAngle}deg)
        translateZ(${radius}px)
      `;
    });

    gsap.to(".ring", {
      rotateY: -360,
      duration: 18,
      repeat: -1,
      ease: "none",
    });

    function updateEffects() {
      images.forEach((img) => {
        const rect = img.getBoundingClientRect();

        const centerX = window.innerWidth / 2;
        const imgCenter = rect.left + rect.width / 2;

        const distance = Math.abs(centerX - imgCenter);

        const progress = Math.max(
          0,
          1 - distance / (window.innerWidth / 2)
        );

        const brightness = 0.3 + progress * 0.7;
        const grayscale = 1 - progress;
        const scale = 0.75 + progress * 0.35;

        img.style.filter = `
          brightness(${brightness})
          grayscale(${grayscale})
        `;

        img.style.transform = `
          rotateY(${img.dataset.angle}deg)
          translateZ(${radius}px)
          scale(${scale})
        `;
      });
    }

    gsap.ticker.add(updateEffects);

    return () => {
      gsap.ticker.remove(updateEffects);
    };
  }, []);
}