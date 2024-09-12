"use client";

import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import "./event.css";
import { eventBanners } from "@/components/FirstLoadBanner";
import EventCard from "@/components/EventCard";

const EventPage = () => {
  const t = useTranslations();


  return (
    <div className="contact"
    >

      <Image
        loading="eager"
        src={"/images/contact.png"}
        alt={"logo"}
        width={1024}
        height={700}
        style={{ width: "100%", height: "auto" }}
      />
      <div className="contactInfo">
        <Image
          src={"/images/leave1.svg"}
          width={500}
          height={500}
          alt="leave-background"
          className="leave1-bg"
        />

        <Image
          src={"/images/leave1.svg"}
          width={500}
          height={500}
          alt="leave-background"
          className="leave2-bg"
        />
        <h1 className="heading1" style={{ marginBottom: `2rem ` }}>
          {t("general.eventTitle")}
        </h1>


        {/* <EventCard title=""/> */}
        <div className="event-wrapper">
          <h3 style={{ marginBottom: "0rem" }}>
            {t("eventPage.midAutumn.title")}
          </h3>
          <p className="date" style={{ "textAlign": "center" }}>{t("eventPage.midAutumn.startDate")}-{t("eventPage.midAutumn.endDate")}</p>
          <div className="images">
            {eventBanners.map((image, index) => (
              <Image
                className="event-image"
                key={index}
                src={image.src}
                alt={image.alt}
                width={320}
                height={320}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
