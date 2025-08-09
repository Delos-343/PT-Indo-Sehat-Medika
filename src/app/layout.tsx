import type { Metadata } from "next";
import { Raleway, Poppins } from "next/font/google";
import "./globals.css";

const raleWay = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const popPins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "100"
});

export const metadata: Metadata = {
  title: "PT INDO SEHAT MEDIKA",
  description: "For Tante Yenny",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleWay.variable} ${popPins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
