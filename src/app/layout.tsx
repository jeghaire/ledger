import {
  lusitana,
  clash_display,
  open_sans,
  geistSans,
  geistMono,
} from "~/app/fonts";
import type { Metadata } from "next";
import "./globals.css";
import { APP_NAME } from "~/core/constants";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}`,
  },
  description: "The official HEOSL dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lusitana.variable} ${clash_display.variable} ${open_sans.variable} ${geistSans.variable} ${geistMono.variable} font-geist_sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
