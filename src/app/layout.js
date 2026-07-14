import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisSmoothScroll from "@/components/Extras/LenisSmoothScroll";
import Navbar from "@/components/Home/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Pantry",
  description:
    "The Pantry serves delightful interactive culinary models — transforming simple ingredients into seamless 3D dining experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <LenisSmoothScroll />
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}</body>
    </html>
  );
}
