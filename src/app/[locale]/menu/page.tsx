"use client";
import { useMenu } from "@/context/MenuContext";
import useWindowDimensions from "@/hook/useWindowDimensions";
import "@/styles/menu.css";
import { Validate } from "@/utils/validate";
import { Tabs } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type TabPosition = "left" | "top";

const Menu = () => {
  const t = useTranslations("menuPage");
  const localActive = useLocale();
  const { menu } = useMenu();

  const { width } = useWindowDimensions();
  const [foodThumbsSwiper, setFoodThumbsSwiper] = useState<any>({});
  const [drinkThumbsSwiper, setDrinkThumbsSwiper] = useState<any>({});
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");

  useEffect(() => {
    if (width && width <= 768) {
      setTabPosition("top");
    } else {
      setTabPosition("left");
    }
  }, [width]);

  const renderMenuItems = useMemo(
    () =>
      (
        menu: { [x: string]: any },
        thumbsSwiper: { [x: string]: any },
        setThumbsSwiper: {
          (value: any): void;
          (value: any): void;
          (arg0: (prev: any) => any): void;
        }
      ) => {
        return Object.keys(menu).map((key, i) => ({
          icon: (
            <Image
              src={menu[key].icon}
              alt={key}
              className="svg-icon"
              width={40}
              height={40}
            />
          ),
          label: t(`${key}`),
          key: String(i + 1),
          children: (
            <div className="menu-list">
              <h2>{t(`${key}`)}</h2>
              <div className="menu--info">
                <div className="menu--info__img">
                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={100}
                    loop={true}
                    thumbs={{ swiper: thumbsSwiper[key] || null }}
                    modules={[FreeMode, Thumbs]}
                    className="swiper--item-info"
                  >
                    {menu[key].items?.map((item: any, index: number) => (
                      <SwiperSlide key={index}>
                        <div className="item-info">
                          <div className="item-info__img">
                            <Image
                              className="swiper--item-img"
                              src={item.img}
                              alt="food"
                              width={450}
                              height={350}
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
                            <h2 id="menu-item--title">
                              {item.name[localActive]}
                            </h2>
                            <p id="menu-item--desc">
                              {t("ingredient")}: {item.desc[localActive]}
                            </p>
                            <p id="menu-item--price">
                              {Validate.unit(Number(item.price))}₫
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <Swiper
                  onSwiper={(swiper) =>
                    setThumbsSwiper((prev: any) => ({
                      ...prev,
                      [key]: swiper,
                    }))
                  }
                  spaceBetween={10}
                  slidesPerView="auto"
                  freeMode={true}
                  watchSlidesProgress={true}
                  navigation={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="swiper--list-item"
                >
                  {menu[key].items?.map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={100}
                        height={83}
                        objectFit="cover"
                        objectPosition="50% 75%"
                        style={{
                          objectFit: "cover",
                          objectPosition: "50% 75%",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ),
        }));
      },
    [t, localActive]
  );

  const foodMenuItems = renderMenuItems(
    menu.food,
    foodThumbsSwiper,
    setFoodThumbsSwiper
  );
  const drinkMenuItems = renderMenuItems(
    menu.drink,
    drinkThumbsSwiper,
    setDrinkThumbsSwiper
  );

  return (
    <div className="menu">
      <Image
        loading="eager"
        src={"/images/menu.png"}
        alt="menu"
        width={1024}
        height={768}
        style={{ width: "100%", height: "auto" }}
      />

      <div className="menu--title">
        <h1 className="menu--title">{t("food")}</h1>
      </div>
      <div className="menu--content">
        <Tabs tabPosition={tabPosition} type="card" items={foodMenuItems} />
      </div>
      <div className="menu--title">
        <h1 className="menu--title">{t("beverage")}</h1>
      </div>
      <div className="menu--content">
        <Tabs tabPosition={tabPosition} type="card" items={drinkMenuItems} />
      </div>
    </div>
  );
};

export default Menu;
