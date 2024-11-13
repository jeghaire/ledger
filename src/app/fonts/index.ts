import { Open_Sans, Lusitana } from "next/font/google";
import localFont from "next/font/local";

export const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lusitana",
});

export const clash_display = localFont({
  src: "./ClashDisplay-Variable.woff2",
  display: "swap",
  variable: "--font-clash-display",
});

export const geistSans = localFont({
    src: "./GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
  });
  
  export const geistMono = localFont({
    src: "./GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
  });
