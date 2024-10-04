import { ClientComponent } from "@/components";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Noto_Serif } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({ subsets: ["vietnamese"] });

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    <div className={notoSerif.className}>
      <NextIntlClientProvider messages={messages}>
        <ClientComponent>
          {children}
          <SpeedInsights />
        </ClientComponent>
      </NextIntlClientProvider>
    </div>
  );
}
