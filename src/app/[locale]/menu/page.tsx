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
  const [isHighResLoaded, setHighResLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHighResLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (width && width <= 950) {
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
        },
        isDrinkMenu: boolean
      ) => {
        return Object.keys(menu).map((key, i) => ({
          icon: (
            <Image
              src={menu[key].icon}
              alt={key}
              className="svg-icon"
              width={80}
              height={80}
            />
          ),
          label: t(`${key}`),
          key: String(i + 1),
          children: (
            <div className="menu-list">
              <h2 className="menu-category">{t(`${key}`)}</h2>
              <div className="menu--info">
                {key == "coffee" || key == "softdrink" ? (
                  <div>
                    {menu[key].items?.map((item: any, index: number) => (
                      <div key={index * 100} className="drink-text-menu">
                        <p className="drink-text">{item.name[localActive]}</p>
                        <p className="drink-price">
                          {Validate.unit(Number(item.price))}₫
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
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
                                className={`swiper--item-img ${isDrinkMenu ? "drink" : ""
                                  }`}
                                src={item.img}
                                alt="food"
                                width={isDrinkMenu ? 400 : 450}
                                height={isDrinkMenu ? 400 : 350}
                              />
                            </div>
                            <div className="item-info__text">
                              <h2 id="menu-item--title">
                                {item.name[localActive]}
                              </h2>

                              {key !== "thaiTea" && (
                                <p id="menu-item--desc">
                                  <span className="ingredient-title">
                                    {t("ingredient") + " "}
                                  </span>
                                  : {item.desc[localActive]}
                                </p>
                              )}

                              <div
                                className="row"
                                style={{
                                  justifyContent: item.isSpicy
                                    ? "space-between"
                                    : "flex-end",
                                }}
                              >
                                {item.isSpicy && (
                                  <div className="menu-item--isSpicy">
                                    <Image
                                      src="/images/isSpicy.svg"
                                      alt="isSpicy"
                                      width={50}
                                      height={30}
                                    />
                                    <p id="menu-item--isSpicy-note">
                                      {t("adjustable")}
                                    </p>
                                  </div>
                                )}
                                <p id="menu-item--price">
                                  {Validate.unit(Number(item.price))}₫
                                </p>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

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
                      className={`swiper--list-item ${isDrinkMenu ? "drink" : ""
                        }`}
                    >
                      {menu[key].items?.map((item: any, index: number) => (
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
                            className="tabs-image"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>
            </div>
          ),
        }));
      },
    [t, localActive]
  )

  const foodMenuItems = renderMenuItems(
    menu.food,
    foodThumbsSwiper,
    setFoodThumbsSwiper,
    false
  )
  const drinkMenuItems = renderMenuItems(
    menu.drink,
    drinkThumbsSwiper,
    setDrinkThumbsSwiper,
    true
  )

  return (
    <div className="menu"
    >
      <Image
        className="banner"
        loading="eager"
        src={isHighResLoaded == false ? "/images/menu-banner.svg" : "/images/menu.png"}
        alt="menu"
        width={1024}
        height={768}
        style={{ width: "100%", height: "auto" }} />

      <div className="menu--title">
        <h1 className="menu--title">{t("food")}</h1>
      </div>
      <div className="menu--content">
        <Tabs tabPosition={tabPosition} type="card" items={foodMenuItems} />
      </div>
      <div className="menu--title">
        <h1 className="menu--title">{t("beverage")}</h1>
      </div>
      <div className="menu--content drink">
        <Tabs tabPosition={tabPosition} type="card" items={drinkMenuItems} />
      </div>

    </div>
  );
};

export default Menu;
