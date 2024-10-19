"use client";
import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { eventBanners } from "./FirstLoadBanner";

interface EventCardProps {
  title?: string;
  src?: string[] | string;
  description?: string;
  startDate?: string;
  endDate?: string;
}
const EventCard = (props: EventCardProps) => {
  const t = useTranslations();
  const { title, src, description, startDate, endDate } = props;
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <Image
          alt="example"
          src={eventBanners[0].src}
          width={300}
          height={300}
        />
      }
    >
      <Meta
        avatar={<Avatar src={eventBanners[0].src} />}
        title={title || "Card title"}
        description={description || "This is the description"}
      />
    </Card>
  );
};

export default EventCard;
