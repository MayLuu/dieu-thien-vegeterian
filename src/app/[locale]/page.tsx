"use client";
import SectionImgText from "@/components/SectionImgText";
import { Dancing_Script } from "@next/font/google";
import { useTranslations } from "next-intl";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Swiper3D } from "@/components/swiper";
import { Link } from "@/navigation";
import "@/styles/home.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const dancingScript = Dancing_Script({ subsets: ["latin"] });
const swiperData = [
  {
    imageHighRes: "/images/home-intro_1.svg",
    imageLowRes: "/images/home-intro_1.png",
    alt: "home slider 1",
  },
  {
    imageHighRes: "/images/home-intro_2.svg",
    imageLowRes: "/images/home-intro_2.png",
    alt: "home slider 2",
  },
  {
    imageHighRes: "/images/home-intro_3.svg",
    imageLowRes: "/images/home-intro_3.png",
    alt: "home slider 3",
  },
];

const swiper3Ddata = [
  {
    image: "/images/special_1.png",
    alt: "special food 1",
  },
  {
    image: "/images/special_2.png",
    alt: "special food 2",
  },
  {
    image: "/images/special_3.png",
    alt: "special food 3",
  },
  {
    image: "/images/special_4.png",
    alt: "special food 4",
  },
  {
    image: "/images/special_5.png",
    alt: "special food 5",
  },
];

const orderData = [
  {
    image: "/images/home-order_1.png",
    alt: "order 1",
  },
  {
    image: "/images/home-order_2.png",
    alt: "order 2",
  },
  {
    image: "/images/home-order_3.png",
    alt: "order 3",
  },
];

export default function Home() {
  const t = useTranslations();
  const [isHighResLoaded, setHighResLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHighResLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main">
      <div className="slider">
        <Swiper
          className="home-slider-introduce"
          loop={true}
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
        >
          {swiperData.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  loading="eager"
                  src={isHighResLoaded ? item.imageHighRes : item.imageLowRes}
                  alt={item.alt}
                  width={1440}
                  height={786}
                  style={{ objectFit: "cover", width: "100vw", height: "auto" }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="banner__text">
          <h1 id="title" className={dancingScript.className}>
            Diệu Thiện
          </h1>
          <p
            className="slogan"
            dangerouslySetInnerHTML={{ __html: t("homePage.slogan") }}
          />
          <Link className="menu-button" href="/menu">
            {t("general.viewMenu")}
          </Link>
        </div>
      </div>

      <div className="welcome">
        <Image
          src={"/images/leave1.svg"}
          width={500}
          height={500}
          alt="leave-background"
          className="leave1-bg"
        />

        <Image
          src={"/images/leave2.svg"}
          width={500}
          height={500}
          alt="leave-background"
          className="leave2-bg"
        />
        <SectionImgText
          title={t("homePage.summary")}
          text={t("homePage.introduce")}
          src={"/images/introduce.svg"}
          alt={"welcome"}
          width={555}
          height={415}
          stylesImg={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="special-menu">
        <Image
          src={"/images/leave1-green.svg"}
          width={250}
          height={250}
          alt="leave-background"
          className="leave1-bg"
        />

        <Image
          src={"/images/leave2-green.svg"}
          width={500}
          height={500}
          alt="leave-background"
          className="leave2-bg"
        />
        <Image
          src={"/images/leave-green.svg"}
          width={500}
          height={500}
          alt="leave-background"
          className="leave-bg"
        />
        <motion.h1
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          className="heading1 cream-text"
        >
          {t("homePage.specialFood")}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <Swiper3D data={swiper3Ddata} />
        </motion.div>
      </div>

      <div className="order section__container column-layout">
        <motion.h1
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          id="order"
        >
          {t("general.order")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          dangerouslySetInnerHTML={{ __html: t("homePage.orderDesc") }}
        />
        <div className="column-container" style={{ position: "relative" }}>
          {orderData.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1 * index,
                  delay: 1 * index,
                  ease: "easeOut",
                }}
                className="column"
                key={index}
                style={{ position: "relative" }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={500}
                  height={300}
                  className={"responsiveImage"}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
