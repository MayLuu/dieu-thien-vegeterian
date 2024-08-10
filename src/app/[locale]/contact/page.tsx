import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import "./contact.css";
import PlaceIcon from "@mui/icons-material/Place";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";

const ContactPage = () => {
  const t = useTranslations();

  return (
    <div className="contact">
      <Image
        loading="eager"
        src={"/images/contact.png"}
        alt={"logo"}
        width={1024}
        height={700}
        style={{ width: "100%", height: "auto" }}
      />
      <div className="contactInfo">
        <h1 className="heading1" style={{ marginBottom: `4rem ` }}>
          {t("general.contactUs")}
        </h1>

        <div className="content">
          <div className="content-info">
            <a
              className="column"
              href="https://maps.app.goo.gl/qy7BD4LF6tcTuQHi6"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PlaceIcon sx={{ fontSize: 48 }} />
              {/* <h5 className="heading3">{t("general.address")}</h5> */}
              <p>8 DA1-2, Mỹ Phước, Bến Cát, Bình Dương</p>
            </a>
            <a
              className="column"
              href="callto:0856779886"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SmartphoneIcon sx={{ fontSize: 48 }} />
              {/* <h5 className="heading3"> {t("general.phoneNumber")}</h5> */}
              <p>085-677-9886</p>
            </a>
            <a
              className="column"
              href="mailto:dieuthien@gmail.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <EmailIcon sx={{ fontSize: 48 }} />
              {/* <h5 className="heading3">{t("general.email")}</h5> */}
              <p>dieuthien@gmail.com</p>
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
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
