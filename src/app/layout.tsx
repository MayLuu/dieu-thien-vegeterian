import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Head from "next/head";
import { Metadata } from "next";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Nhà hàng Diệu Thiện",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "08 DA1-2",
    "addressLocality": "Mỹ Phước",
    "addressRegion": "Bến Cát, Bình Dương",
    "postalCode": "825560",
    "addressCountry": "VN",
  },
  "telephone": "0856779886",
  "url": "https://amthucchaydieuthien.com/",
  "image":
    "https://lh3.ggpht.com/p/AF1QipPP-6pqrJZMGdEaHUGvNSE4HiXVt_q05T-3x3VG=s1024",
  "servesCuisine": ["Chay"],
  "priceRange": "$$",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Nhà hàng Diệu Thiện",
    default: "Hương vị chay độc đáo | Nhà hàng Diệu Thiện",
  },
  description:
    "Trải nghiệm những món chay độc đáo và phong phú tại nhà hàng chúng tôi, hòa quyện giữa hương vị truyền thống và hiện đại. Tận hưởng bầu không khí yên bình, phục vụ chu đáo và không gian được thiết kế đẹp mắt, mang đến trải nghiệm ăn uống đáng nhớ, làm say mê cả vị giác lẫn tâm hồn.",
  openGraph: {
    title: "Hương vị chay độc đáo | Nhà hàng Diệu Thiện",
    description:
      "Trải nghiệm những món chay độc đáo và phong phú tại nhà hàng chúng tôi, hòa quyện giữa hương vị truyền thống và hiện đại. Tận hưởng bầu không khí yên bình, phục vụ chu đáo và không gian được thiết kế đẹp mắt, mang đến trải nghiệm ăn uống đáng nhớ, làm say mê cả vị giác lẫn tâm hồn.",
    url: "https://amthucchaydieuthien.com/",
    siteName: "Nhà hàng Diệu Thiện",
    images: [
      {
        url: "https://lh3.ggpht.com/p/AF1QipPP-6pqrJZMGdEaHUGvNSE4HiXVt_q05T-3x3VG=s1024",
        width: 800,
        height: 600,
      },
    ],
    locale: "vi-VN",
    type: "website",
  },
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html>
    <head>
      <link rel="icon" href="/logo.svg" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@100;200;300;400;500;600;700;800;900&display=swap"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <meta
        name="keywords"
        content="Nhà hàng chay, món chay, Diệu Thiện, thực đơn chay, ẩm thực chay"
      />
      <link rel="canonical" href="https://amthucchaydieuthien.com" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Ẩm thực chay Diệu Thiện" />
      <meta name="publisher" content="Ẩm thực chay Diệu Thiện" />
    </head>
    <body>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;
