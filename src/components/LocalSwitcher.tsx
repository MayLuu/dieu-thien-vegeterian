"use client";
import setLanguageValue from "@/lib/setLanguage";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

const LocalSwitcher = () => {
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguageValue(lang);
  };

  return (
    <div className="header__button--language"
      style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
      <Image
        src={
          localActive === "vi"
            ? "/images/flags/Vietnam.svg"
            : localActive === "en"
              ? "/images/flags/England.svg"
              : "/images/flags/China.svg"
        }
        height={20}
        width={30}
        alt="lang"
        style={{ borderRadius: '3px' }}
      />
      <div className="custom-select-wrapper">
        <select
          aria-label="lang"
          value={localActive}
          onChange={(e) => onSelectChange(e)}
        >
          <option value="vi">VI</option>
          <option value="en">EN</option>
          <option value="zh">CHI</option>
        </select>
      </div>
    </div>
  );
};

export default LocalSwitcher;
