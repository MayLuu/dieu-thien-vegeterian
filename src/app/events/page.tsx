"use client";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import "./event.scss";
import { eventBanners } from "@/components/FirstLoadBanner";

const EventPage = () => {
  const t = useTranslations();

  return (
    <div className="contact">
      <Image
        loading="eager"
        src="/images/contact.png"
        alt="Events page banner"
        width={1024}
        height={700}
        style={{ width: "100%", height: "auto" }}
        priority
      />
      
      <div className="contactInfo">
        <Image
          src="/images/leave1.svg"
          width={500}
          height={500}
          alt="Decorative leaf background"
          className="leave1-bg"
        />

        <Image
          src="/images/leave1.svg"
          width={500}
          height={500}
          alt="Decorative leaf background"
          className="leave2-bg"
        />
        
        <h1 className="heading1">
          {t("general.eventTitle")}
        </h1>

        <div className="event-wrapper">
          <h3>
            {t("eventPage.midAutumn.title")}
          </h3>
          
          <p className="date">
            {t("eventPage.midAutumn.startDate")}-{t("eventPage.midAutumn.endDate")}
          </p>
          
          <div className="images">
            {eventBanners.map((image, index) => (
              <Image
                className="event-image"
                key={index}
                src={image.src}
                alt={image.alt || `Event image ${index + 1}`}
                width={320}
                height={320}
                unoptimized
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
