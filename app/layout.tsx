import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chase 524 Tracker",
  description: "Track your Chase 5/24 status",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        defer
        async
        src="https://analytics.xyspg.moe/script.js"
        data-website-id="0b73997c-d0f2-4a56-b92d-600fc06c5bbf"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans  bg-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
