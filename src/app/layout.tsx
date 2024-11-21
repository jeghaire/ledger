import { lusitana, geistSans } from "~/app/fonts";
import "./globals.css";
import type { Metadata } from "next";
import { APP_NAME } from "~/core/constants";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}`,
  },
  description: `The official ${APP_NAME} ERP dashboard`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lusitana.variable} ${geistSans.variable} font-geistSans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
