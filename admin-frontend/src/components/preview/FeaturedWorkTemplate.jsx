import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const MediaCard = ({ url }) => {
  if (!url) {
    return (
      <div className="w-full h-full bg-zinc-800 rounded-[40px] flex items-center justify-center text-white">
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
        <img
          src={url}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

const FeaturedWorkTemplate = ({ formData }) => {
  const media = formData?.videos || [];

  return (
    <div className="bg-[#120C18] rounded-3xl py-16">

      <Swiper
        modules={[Autoplay]}
        centeredSlides={true}
        slidesPerView={4}
        spaceBetween={40}
        loop={true}
        speed={3500}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {media.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={`transition-all duration-500
              h-[520px]
              ${
                index % 2 === 0
                  ? "mt-0"
                  : "mt-16"
              }`}
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