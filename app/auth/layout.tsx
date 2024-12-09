import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Link from "next/link";
import BackgroundImage from "./BackgroundImage";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Auth page",
  description: "Demo app's auth pages",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen bg-black`}
      >
        <BackgroundImage />

        <header className="flex justify-between items-center px-8 py-4 bg-transparent relative">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-widest text-white">PATHETIC</h1>
          </Link>
        </header>

        {children}

      </body>
    </html>
  );
}
