"use client";

import Link from "next/link";
import { UserButton } from "./auth/_components/user-button";
import { Button } from "./ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";

const NavBar = () => {
  const user = useCurrentUser();

  return (
    <nav className="sticky top-0 flex h-20 items-center justify-between bg-black px-8 z-10">
      <Link
        href="/"
        className="text-2xl font-bold tracking-widest text-white transition-all hover:scale-110"
      >
        PATHETIC
      </Link>

      <div className="flex items-center">
        {user ? (
          <>
            <Link
              href="/settings"
              className="flex h-20 items-center justify-center gap-1 px-4 text-xl text-white transition-all hover:bg-gradient-to-b hover:from-slate-900 hover:to-slate-700"
            >
              <SettingsIcon />
              Settings
            </Link>

            <Link
              href="/admin"
              className="flex h-20 items-center justify-center gap-1 px-4 text-xl text-white transition-all hover:bg-gradient-to-b hover:from-slate-900 hover:to-slate-700"
            >
              Admin
            </Link>

            <Link
              href="/server"
              className="flex h-20 items-center justify-center gap-1 px-4 text-xl text-white transition-all hover:bg-gradient-to-b hover:from-slate-900 hover:to-slate-700"
            >
              Server
            </Link>

            <Link
              href="/client"
              className="flex h-20 items-center justify-center gap-1 px-4 text-xl text-white transition-all hover:bg-gradient-to-b hover:from-slate-900 hover:to-slate-700"
            >
              Client
            </Link>

            <Link
              href="/dashboard"
              className="flex h-20 items-center justify-center gap-1 px-4 text-xl text-white transition-all hover:bg-gradient-to-b hover:from-slate-900 hover:to-slate-700"
            >
              <DashboardIcon />
              Dashboard
            </Link>

            <UserButton />
          </>
        ) : (
          <Link href="/auth/login">
            <Button type="button" className="shadow-none">
              <span className="font-bold text-white">Login</span>
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
