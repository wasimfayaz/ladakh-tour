import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
