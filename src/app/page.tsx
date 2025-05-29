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
import Link from "next/link";
import "@/styles/home.scss";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FirstLoadBanner from "@/components/FirstLoadBanner";

const Leaf = ({ src, className }: { src: string; className: string }) => (
  <Image
    src={src}
    width={className.includes("leave1-bg") ? 250 : 500}
    height={className.includes("leave1-bg") ? 250 : 500}
    alt="leaf-background"
    className={className}
    title="la-sen"
  />
);

const fadeInUpVariants = {
  hidden: { opacity: 0, y: -70 },
  visible: { opacity: 1, y: 0 }
};

const fadeInDownVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0 }
};

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const swiperData = [
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
  {
    imageHighRes: "/images/home-intro_1.svg",
    imageLowRes: "/images/home-intro_1.png",
    alt: "home slider 1",
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
  {
    image: "/images/special_1.png",
    alt: "special food 6",
  },
  {
    image: "/images/special_2.png",
    alt: "special food 7",
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

const AnimatedSection = ({ 
  children, 
  variants, 
  delay = 0.25, 
  className = "" 
}: { 
  children: React.ReactNode;
  variants: any;
  delay?: number;
  className?: string;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const t = useTranslations();
  const [isHighResLoaded, setHighResLoaded] = useState(false);
  const hasMounted = useRef(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHighResLoaded(true);
    }, 1500); // Reduced from 2000ms for better UX

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      setShowPopup(true);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="main">
      <FirstLoadBanner showPopup={showPopup} closePopup={closePopup} />

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
          {swiperData.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                loading="eager"
                src={isHighResLoaded ? item.imageHighRes : item.imageLowRes}
                alt={item.alt}
                title={item.alt}
                width={1440}
                height={786}
                style={{ objectFit: "cover", width: "100vw", height: "auto" }}
                priority={index === 0}
                unoptimized
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="banner__text">
          <h2 id="title" className={dancingScript.className}>
            Diệu Thiện
          </h2>
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
        <Leaf src="/images/leave1.svg" className="leave1-bg" />
        <Leaf src="/images/leave2.svg" className="leave2-bg" />
        
        <SectionImgText
          title={t("homePage.summary")}
          isHeader={true}
          text={t("homePage.introduce")}
          src={["/images/introduce.svg", "/images/aboutUs_2.svg"]}
          alt={"welcome"}
          width={555}
          height={415}
          stylesImg={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="special-menu">
        <Leaf src="/images/leave1-green.svg" className="leave1-bg" />
        <Leaf src="/images/leave2-green.svg" className="leave2-bg" />
        <Leaf src="/images/leave-green.svg" className="leave-bg" />
        
        <AnimatedSection variants={fadeInUpVariants} className="heading1 cream-text">
          {t("homePage.specialFood")}
        </AnimatedSection>
        
        <AnimatedSection variants={fadeInDownVariants} delay={0.5}>
          <Swiper3D data={swiper3Ddata} />
        </AnimatedSection>
      </div>

      <div className="order section__container column-layout">
        <Leaf src="/images/leave1.svg" className="leave1-bg" />
        <Leaf src="/images/leave2.svg" className="leave2-bg" />
        
        <AnimatedSection variants={fadeInUpVariants} className="heading1 banner__t">
          <h2 id="order" className="heading1">{t("general.order")}</h2>
        </AnimatedSection>
        
        <AnimatedSection variants={fadeInUpVariants}>
          <p dangerouslySetInnerHTML={{ __html: t("homePage.orderDesc") }} />
        </AnimatedSection>
        
        <div className="column-container" style={{ position: "relative" }}>
          {orderData.map((item, index) => (
            <AnimatedSection 
              key={index}
              variants={fadeInDownVariants} 
              delay={0.2 * index}
              className="column"
            >
              <div style={{ position: "relative" }}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={500}
                  height={300}
                  className={index === 1 ? "responsiveImage right" : "responsiveImage left"}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
