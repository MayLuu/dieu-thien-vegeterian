"use client";
import { OrderFormComponent } from "@/components";
import "@/styles/order.scss";
import { Mail, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

const OrderPage = () => {
  const t = useTranslations();
  const localActive = useLocale();

  return (
    <div className="order-page">
      <div className="order-content">
        <div className="order-content__left--info order-page--flex">
          <h1>{t("orderPage.orderNow")}</h1>
          <p id="order-description">{t("orderPage.howToOrder")}</p>
          <div className="column-container" style={{ gap: "1rem" }}>
            <div className="text--border order-content--contact">
              <div className="avatar order-content--icon">
                <Phone size={45} color="white" />
              </div>
              <p className="title">{t("orderPage.contactNow")}</p>
              <p className="content">085-677-9886</p>
            </div>

            <div className="text--border order-content--contact">
              <div className="avatar order-content--icon">
                <Mail size={45} color="white" />
              </div>
              <p className="title">{t("orderPage.feedback")}</p>
              <p className="content">dieuthien@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="order-content__right--form ">
          <OrderFormComponent />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
