import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "@/styles/popup_layer.css";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "@/routing";
interface SectionProps {
  title?: string;
  text?: string;
  src?: string[] | string;
  alt?: string;
  width?: number;
  height?: number;
  stylesImg?: React.CSSProperties;
  stylesText?: React.CSSProperties;
  reverse?: boolean;
  showPopup?: boolean;
  closePopup?: () => void;
}

export const eventBanners = [
  {
    src: "https://firebasestorage.googleapis.com/v0/b/dieuthien-production.appspot.com/o/others%2Fmid_autumn_banner1.png?alt=media&token=7ec4b801-8e75-4b7a-b420-3983c0a1379d",
    alt: "Banner 1",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/dieuthien-production.appspot.com/o/others%2Fmid_autumn_banner2.png?alt=media&token=09cd5304-1b55-4f90-801d-46bf9bc8cf8a",
    alt: "Banner 2",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/dieuthien-production.appspot.com/o/others%2Fmid_autumn_banner3.png?alt=media&token=60048fac-cd04-4ef3-8e6a-21d466cf4d2d",
    alt: "Banner 3",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/dieuthien-production.appspot.com/o/others%2Fmid_autumn_banner4.png?alt=media&token=35ee3f4e-aed1-4e86-a04e-e12bb9bc776a",
    alt: "Banner 4",
  },
];

const FirstLoadBanner = (props: SectionProps) => {
  const {
    title,
    text,
    src,
    alt,
    width,
    height,
    stylesImg,
    stylesText,
    reverse,
    closePopup,
    showPopup,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAutumn = new Date().getMonth() == 8;

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (showPopup) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % eventBanners.length;
          if (nextIndex === eventBanners.length - 1) {
            clearInterval(intervalRef.current!);
          }
          return nextIndex;
        });
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [showPopup]);

  return (
    showPopup &&
    isAutumn && (
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-button" onClick={closePopup}>
            <CloseIcon />
          </button>
          <Link href="/events">
            <Image
              className="current-image"
              width={412}
              height={346}
              src={eventBanners[currentIndex].src}
              alt="Popup Image"
            />
          </Link>
        </div>
      </div>
    )
  );
};

export default FirstLoadBanner;
