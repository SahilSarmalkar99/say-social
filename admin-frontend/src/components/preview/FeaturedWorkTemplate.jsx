import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const MediaCard = ({ url }) => {
  if (!url) {
    return (
      <div className="overflow-hidden rounded-2xl lg:rounded-[40px] w-full h-full">
        No Preview
      </div>
    );
  }

  const isVideo = /\.(mp4|webm|ogg|mov|m4v)$/i.test(url);

  return (
    <div className="overflow-hidden rounded-[40px] w-full h-full">
      {isVideo ? (
        <video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img src={url} alt="" className="w-full h-full object-cover" />
      )}
    </div>
  );
};

const FeaturedWorkTemplate = ({ formData }) => {
  const media = formData?.videos || [];

  return (
    <div className="rounded-2xl lg:rounded-3xl bg-[#120C18] py-8 sm:py-12 lg:py-16">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        centeredSlides={false}
        loop={false}
        freeMode={true}
        watchOverflow={true}
        resistanceRatio={0.6}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        breakpoints={{
          320: {
            slidesPerView: 1.15,
            spaceBetween: 16,
          },
          480: {
            slidesPerView: 1.4,
            spaceBetween: 18,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.4,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 28,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
      >
        {media.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={`
          transition-all duration-300
          h-[320px]
          sm:h-[400px]
          lg:h-[500px]
          ${index % 2 === 0 ? "mt-0" : "mt-0 md:mt-10 lg:mt-16"}
        `}
            >
              <MediaCard url={item.url} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedWorkTemplate;
