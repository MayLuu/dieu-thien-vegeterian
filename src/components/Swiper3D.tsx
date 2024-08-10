import "@/styles/swiper3d.css";
import Image from "next/image";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/styles/swiper3d.css";

interface Swiper3DProps {
  data: {
    image: string;
    alt: string;
  }[];
}

const Swiper3D = (props: Swiper3DProps) => {
  const { data } = props;
  return (
    <div className="swiper3d-container">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 2000 }}
        slidesPerView={"auto"}
        initialSlide={2}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ el: ".swiper3d-pagination", clickable: true }}
        modules={[Autoplay, EffectCoverflow]}
        slidesPerGroup={1}
        spaceBetween={100}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Image
              src={item.image}
              alt={item.alt}
              width={600}
              height={500}
              objectFit="cover"
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swiper3D;
