import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "@/styles/popup_layer.css";
import CloseIcon from '@mui/icons-material/Close';
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

const eventBanners = [
    {
        src: "https://firebasestorage.googleapis.com/v0/b/dieuthien-production.appspot.com/o/others%2Fmid_autumn_banner1.png?alt=media&token=7ec4b801-8e75-4b7a-b420-3983c0a1379d",
        alt: "Banner 1"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/dieuthien-production.appspot.com/o/others%2Fmid_autumn_banner2.png?alt=media&token=23f0330a-6825-4152-ae3f-6a006d32c8d1",
        alt: "Banner 2"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/dieuthien-production.appspot.com/o/others%2Fmid_autumn_banner3.png?alt=media&token=0f09f1d2-673f-4cd8-b8a1-c7c764eae1ec",
        alt: "Banner 3"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/dieuthien-production.appspot.com/o/others%2Fmid_autumn_banner4.png?alt=media&token=91bf1565-f379-4956-9939-2c0371cb0edc",
        alt: "Banner 4"
    }
]

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
        showPopup
    } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isAutumn = new Date().getMonth() == 8;

    useEffect(() => {
        console.log('show')
        if (showPopup) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % eventBanners.length);
            }, 3000);

            return () => {
                if (eventBanners.length == currentIndex + 1) {
                    clearInterval(intervalRef.current || 0);
                } else {
                }
            };
        }
    }, [showPopup, eventBanners.length]);

    return (
        showPopup && isAutumn && <div className="popup-overlay" >
            <div className="popup-content">
                <button className="close-button" onClick={closePopup}>
                    <CloseIcon />
                </button>
                <img className="current-image" width={412} height={346} src={eventBanners[currentIndex].src} alt="Popup Image" />


            </div>


        </ div>
    );
};

export default FirstLoadBanner;
