import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { download } from "@/utils/openLink";

function SSR({ data }) {
  const [loading, setLoading] = useState(true);

  const handleLoadImg = () => {
    setLoading(false);
  };

  const handleClick = (img) => {
    if (!loading) {
      download(img, "Waifu", img.split(".").pop());
    }
  };

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true, type: "fraction" }}
      modules={[Navigation, Pagination]}
      scrollbar={{ draggable: true }}
      className="relative w-full max-w-[200px] md:max-w-[300px] mx-auto mySwiper"
    >
      {Array.isArray(data) ? (
        data.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={`relative w-full h-[400px] md:h-[500px] rounded-lg shadow-md ${loading && "bg-gray-500 animate-pulse"}`}>
              <img
                src={img}
                alt="Waifu"
                className={`w-full h-full rounded-lg shadow-md shadow-base-content object-cover transition-opacity duration-300 ease-in-out ${loading ? "opacity-0" : "opacity-100"}`}
                onLoad={handleLoadImg}
                onClick={() => handleClick(img)}
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div className={`relative w-full h-[400px] md:h-[500px] rounded-lg shadow-md ${loading ? "bg-gray-500 animate-pulse" : ""}`}>
            <img
              src={data}
              alt="Waifu"
              className={`w-full h-full rounded-lg shadow-md shadow-base-content object-cover transition-opacity duration-300 ease-in-out ${loading ? "opacity-0" : "opacity-100"}`}
              onLoad={handleLoadImg}
              onClick={() => handleClick(data)}
            />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}

export default SSR;
