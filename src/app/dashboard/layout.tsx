import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Nhà hàng Diệu Thiện",
    default: "Danh sách đặt bàn | Nhà hàng Diệu Thiện",
  },
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html>
    <head>
      <link rel="icon" href="/logo.svg" />
    </head>
    <body>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;
