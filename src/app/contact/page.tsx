import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import "./contact.scss";
import { MapPin, Smartphone, Mail } from "lucide-react";

const ContactPage = () => {
  const t = useTranslations();

  return (
    <div className="contact">
      <Image
        loading="eager"
        src={"/images/contact.png"}
        alt={"Contact banner"}
        width={1024}
        height={700}
        style={{ width: "100%", height: "auto" }}
        priority
      />
      <div className="contactInfo">
        <Image
          src={"/images/leave1.svg"}
          width={500}
          height={500}
          alt="Decorative leaf background"
          className="leave1-bg"
        />

        <Image
          src={"/images/leave1.svg"}
          width={500}
          height={500}
          alt="Decorative leaf background"
          className="leave2-bg"
        />
        <h1 className="heading1">
          {t("general.contactUs")}
        </h1>

        <div className="content">
          <div className="content-info">
            <a
              className="column"
              href="https://maps.app.goo.gl/qy7BD4LF6tcTuQHi6"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="View our location on Google Maps"
            >
              <MapPin size={48} />
              <p>8 DA1-2, Mỹ Phước, Bến Cát, Bình Dương</p>
            </a>
            <a
              className="column"
              href="callto:0856779886"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Call our restaurant"
            >
              <Smartphone size={48} />
              <p>085-677-9886</p>
            </a>
            <a
              className="column"
              href="mailto:amthucchaydieuthien@gmail.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Email us"
            >
              <Mail size={48} />
              <p>amthucchaydieuthien@gmail.com</p>
            </a>
          </div>
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1957.3612563319764!2d106.61448259999999!3d11.134032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174cd1028f9c937%3A0xc438142dbf416a24!2z4bqobSB0aOG7sWMgY2hheSBEaeG7h3UgVGhp4buHbg!5e0!3m2!1svi!2s!4v1722583100981!5m2!1svi!2s"
            width="800"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dieu Thien Restaurant Location"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
