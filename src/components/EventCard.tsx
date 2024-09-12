"use client";

import { useTranslations } from "next-intl"
import React from 'react';
// import './index.css';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Meta from "antd/es/card/Meta";
import { eventBanners } from "./FirstLoadBanner";

interface EventCardProps {
    title?: string;
    src?: string[] | string;
    description?: string;
    startDate?: string;
    endDate?: string
}
const EventCard = (props: EventCardProps) => {
    const t = useTranslations();
    const {
        title,
        src,
        description,
        startDate,
        endDate
    } = props
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src={eventBanners[0].src}
                />
            }
        // actions={[
        //     <SettingOutlined key="setting" />,
        //     <EditOutlined key="edit" />,
        //     <EllipsisOutlined key="ellipsis" />,
        // ]}
        >
            <Meta
                avatar={<Avatar src={eventBanners[0].src} />}
                title={title || "Card title"}
                description={description || "This is the description"}
            />
        </Card>
    )
}

export default EventCard;