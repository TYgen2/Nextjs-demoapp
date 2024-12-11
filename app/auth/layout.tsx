import type { Metadata } from "next";
import "../globals.css";
import BackgroundImage from "./BackgroundImage";
import AuthNavBar from "../../components/auth/AuthNavBar";

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
    <div className="relative h-full bg-black">
      <BackgroundImage />
      <AuthNavBar />
      {children}
    </div>
  );
}
