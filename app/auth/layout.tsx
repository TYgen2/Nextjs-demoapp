import type { Metadata } from "next";
import "../globals.css";
import BackgroundImage from "./BackgroundImage";
import AuthNavBar from "../components/auth/AuthNavBar";

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
    <div className="h-full bg-black relative">
      <BackgroundImage />
      <AuthNavBar />
      {children}
    </div>
  );
}
