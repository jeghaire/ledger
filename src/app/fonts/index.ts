import { Lusitana } from "next/font/google";
import localFont from "next/font/local";

export const headingFont = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const bodyFont = localFont({
  src: "./GeistVF.woff",
  variable: "--font-body",
  weight: "100 900",
});
