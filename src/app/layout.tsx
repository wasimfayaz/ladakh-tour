import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Leh Ladakh Tour Packages | Ladakhtourpackage.com",
  description: "Explore Leh Ladakh with premium, customized tour packages. Book the best deals on Ladakh trips, Pangong Lake camping, Nubra Valley safari & travel guides.",
  keywords: "Ladakh Tour Packages, Ladakh Trip, Leh Ladakh, Pangong Lake, Nubra Valley, Ladakhtourpackage.com, Ladakh Travel Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
