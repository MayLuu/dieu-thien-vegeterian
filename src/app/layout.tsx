import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

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

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const locale = params?.locale || "vi";

  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    messages = {};
  }

  return (
    <html lang={locale} className={notoSerif.className}>
      <head>
        <link rel="icon" href="/logo.svg" />
        {/* Removed the font <link> tag */}
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
        <NextIntlClientProvider
          messages={messages}
          timeZone={process.env.NEXT_PUBLIC_TIME_ZONE || "UTC"}
        >
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
