"use client";
import "animate.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/routing";
import { LocalSwitcher } from ".";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type HeaderProps = {
  scrollTop?: number;
};

const Header = ({ scrollTop }: HeaderProps) => {
  const t = useTranslations();
  const [nav, setNav] = useState(false);
  const [visible, setVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    handleScroll();
  }, [scrollTop]);

  const handleScroll = () => {
    const currentScrollPos = scrollTop!;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
    setPrevScrollPos(currentScrollPos);
    // Clear the timer if it exists
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    // Set a timer to show the header after 500ms when scrolling up
    if (prevScrollPos > currentScrollPos) {
      timerRef.current = window.setTimeout(() => {
        setVisible(true);
      }, 500);
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <header
      className={`animate__animated header__container section__container cream-bg ${
        scrollTop! > 5 ? "bg-white" : "bg-transparent"
      } ${visible ? "animate__fadeInDown" : "animate__fadeOutUp"}`}
      style={{
        opacity: visible ? 1 : 0,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        gap: " 1.5rem",
        boxShadow: "2px 4px 12px rgba(206, 145, 44,0.2)",
        top: 0,
      }}
    >
      <div className="header__wrapper">
        {/* Desktop */}
        <div
          className="navbar_desktop header__container section__container cream-bg"
          style={{
            display: "flex",
            opacity: visible ? 1 : 0,
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <div
            className="logo__wrapper"
            style={{ display: "flex", alignItems: "center" }}
          >
            <a href="/">
              <Image
                id="Logo"
                src="/logo.svg"
                alt="logo"
                width={60}
                height={60}
                title="dieu-thien-logo"
                className="website-logo"
              />
              <Image
                src="/logo.png"
                alt="logo"
                width={30}
                height={30}
                className="mobile-logo"
              />
            </a>
          </div>

          {/* Navigation */}
          <div className="header__nav">
            <Link href="/">{t("general.home")}</Link>
            <Link href="/about">{t("general.aboutUs")}</Link>
            <Link href="/menu">{t("general.menu")}</Link>
            <Link href="/order">{t("general.order")}</Link>
            <Link href="/contact">{t("general.contact")}</Link>
            <Link href="/events">{t("general.event")}</Link>
          </div>

          {/* Language & Order */}
          <div
            className="header__language_order"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {/* Language */}
            <LocalSwitcher />

            {/* Order */}
            <Link href="/order" className="header__button--order">
              {t("general.order")}
            </Link>
          </div>

          <div className="navbar_menu-icon" onClick={handleNav}>
            <MenuIcon sx={{ fontSize: 28 }} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        className={nav ? "header__overlay" : "header__overlay-hidden"}
        style={{
          display: nav ? "block" : "none",
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 11,
        }}
      >
        <div
          className={
            nav ? "header__mobile" : "header__mobile header__mobile-hidden"
          }
        >
          {/* Logo */}
          <div className="header__mobile-logo">
            {/* <Link href="/">
              <Image src={"/logo.svg"} alt="" width="87" height="35" />
            </Link> */}
            <div className="header__mobile-close" onClick={() => setNav(false)}>
              <CloseIcon />
            </div>
          </div>

          {/* Navigation */}
          <div className="header__mobile-menu">
            <ul>
              <Link href="/" onClick={() => setNav(false)}>
                <li>{t("general.home")}</li>
              </Link>
              <Link href="/about" onClick={() => setNav(false)}>
                <li>{t("general.aboutUs")}</li>
              </Link>
              <Link href="/menu" onClick={() => setNav(false)}>
                <li>{t("general.menu")}</li>
              </Link>
              <Link href="/order" onClick={() => setNav(false)}>
                <li>{t("general.order")}</li>
              </Link>
              <Link href="/contact" onClick={() => setNav(false)}>
                <li>{t("general.contact")}</li>
              </Link>
            </ul>
          </div>

          {/* Language & Order */}
          <div className="header__language_order">
            {/* Language */}
            {/* <LocalSwitcher /> */}

            {/* Order */}
            <Link href="/order" className="header__button--order">
              {t("general.order")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
