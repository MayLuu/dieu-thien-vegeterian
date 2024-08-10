import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SectionProps {
  title: string;
  text: string;
  src: string[] | string;
  alt: string;
  width: number;
  height: number;
  stylesImg?: React.CSSProperties;
  stylesText?: React.CSSProperties;
  reverse?: boolean;
}

const SectionImgText = (props: SectionProps) => {
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
  } = props;

  const renderImages = () => {
    if (Array.isArray(src)) {
      const limitedSrc = src.slice(0, 2);
      return (
        <div className="section__images">
          {limitedSrc.map((imageSrc, index) => (
            <Image
              key={index}
              className={
                index == 0
                  ? "double image--border lower--image"
                  : "double image--border higher--image"
              }
              src={imageSrc}
              alt={`${alt}-${index}`}
              width={width}
              height={height}
            />
          ))}
        </div>
      );
    } else {
      return (
        <Image
          className="image--border-tlbr"
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      );
    }
  };

  return (
    <div className="section">
      <div
        className="section__content"
        style={{
          flexDirection: reverse ? "row-reverse" : "row",
        }}
      >
        <div className="section__text" style={stylesText}>
          <motion.h1
            style={stylesText}
            className="heading1"
            dangerouslySetInnerHTML={{ __html: title }}
            initial={{ opacity: 0, y: -70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          ></motion.h1>
          <motion.p
            style={{ textAlign: reverse ? "start" : "justify" }}
            dangerouslySetInnerHTML={{ __html: text }}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          ></motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 120, y: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
        >
          {renderImages()}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionImgText;
