import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import React from "react";
import { Validate } from "@/utils/validate";

type MenuItemThumbProps = {
  items: any[];
  locale: string;
  thumbsSwiper: any;
  isDrinkMenu: boolean;
  setThumbsSwiper: (swiper: any) => void;
};

const MenuItemThumb: React.FC<MenuItemThumbProps> = ({
  items,
  locale,
  thumbsSwiper,
  isDrinkMenu,
  setThumbsSwiper,
}) => {
  return (
    <div className="menu--info__img">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={100}
        loop={true}
        thumbs={{ swiper: thumbsSwiper || null }}
        modules={[FreeMode, Thumbs]}
        className="swiper--item-info"
      >
        {items?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="item-info">
              <div className="item-info__img">
                <Image
                  className={`swiper--item-img ${isDrinkMenu ? "drink" : ""}`}
                  src={item.img}
                  alt="food"
                  width={isDrinkMenu ? 400 : 450}
                  height={isDrinkMenu ? 400 : 350}
                  style={{
                    objectFit: "cover",
                    objectPosition: "50% 75%",
                  }}
                />
                {item.bestSeller && (
                  <Image
                    className="item-favorite"
                    src="/images/bestSeller.svg"
                    alt="favorite"
                    width={65}
                    height={65}
                  />
                )}
              </div>
              <div className="item-info__text">
                <h2 id="menu-item--title">{item.name[locale]}</h2>
                {!isDrinkMenu && (
                  <p id="menu-item--desc">{item.desc[locale]}</p>
                )}
                <p id="menu-item--price">
                  {Validate.unit(Number(item.price))}₫
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) =>
          setThumbsSwiper((prev: any) => ({
            ...prev,
            [locale]: swiper,
          }))
        }
        spaceBetween={10}
        slidesPerView="auto"
        freeMode={true}
        watchSlidesProgress={true}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`swiper--list-item ${isDrinkMenu ? "drink" : ""}`}
      >
        {items?.map((item, index) => (
          <SwiperSlide key={index}>
            <Image
              src={item.img}
              alt={item.name}
              width={100}
              height={isDrinkMenu ? 100 : 83}
              style={{
                objectFit: "cover",
                objectPosition: "50% 75%",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MenuItemThumb;
