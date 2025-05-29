import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.scss";
import { ClientComponent } from "@/components";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cookies } from "next/headers";

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

export async function generateMetadata(): Promise<Metadata> {
  const locale = cookies().get('language')?.value || 'vi';
  
    let messages;
    try {
      messages = await import(`../../messages/${locale}.json`);
    } catch (error) {
      messages = await import(`../../messages/vi.json`);
    }
  
    const title = messages.default.metadata.home.title;
    const description = messages.default.metadata.home.desc;
  
  return {
    title: title,
    description: description,
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
  }
};

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const locale = await getLocale();
  const messages = await getMessages();

  const locales = ['en', 'vi', 'zh'];
  const baseUrl = 'https://amthucchaydieuthien.com';

  return (
    <html lang={locale} className={notoSerif.className}>
      <head>
        <link rel="icon" href="./favicon.ico" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Meta Tags */}
        <meta
          name="keywords"
          content="Nhà hàng chay, món chay, Diệu Thiện, thực đơn chay, ẩm thực chay"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Ẩm thực chay Diệu Thiện" />
        <meta name="publisher" content="Ẩm thực chay Diệu Thiện" />

        {/* Canonical Tag */}
        <link rel="canonical" href={baseUrl} />

        {/* Hreflang Tags */}
        {locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={baseUrl}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      </head>

      <body>
        <NextIntlClientProvider
          messages={messages}
          timeZone={process.env.NEXT_PUBLIC_TIME_ZONE || "UTC"}
        >
            <ClientComponent>
              {children}
              <SpeedInsights />
            </ClientComponent>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
