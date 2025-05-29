import { Metadata } from "next"
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const locale = cookies().get('language')?.value || 'vi';

  let messages;
  try {
    messages = await import(`../../../messages/${locale}.json`);
  } catch (error) {
    messages = await import(`../../../messages/vi.json`);
  }

  const title = messages.default.metadata.aboutUs.title;
  const description = messages.default.metadata.aboutUs.desc;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: "https://amthucchaydieuthien.com/",
      siteName: "Nhà hàng Diệu Thiện",
      images: [
        {
          url: "https://lh3.ggpht.com/p/AF1QipPP-6pqrJZMGdEaHUGvNSE4HiXVt_q05T-3x3VG=s1024",
          width: 800,
          height: 600,
        },
      ],
      locale: locale === 'vi' ? "vi-VN" : locale === 'en' ? "en-US" : "zh-CN",
      type: "website",
    },
    metadataBase: new URL("https://amthucchaydieuthien.com"),
    alternates: {
      canonical: "/about",
      languages: {
        vi: "/",
        en: "/en",
        zh: "/zh",
      },
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>   
        
  )
}

