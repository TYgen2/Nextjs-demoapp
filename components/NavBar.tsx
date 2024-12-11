import { auth } from "@/auth";
import Link from "next/link";
import { UserButton } from "./auth/_components/user-button";

const NavBar = async () => {
  const session = await auth();

  return (
    <header className="flex items-center justify-between bg-green-100 px-8 py-4">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-widest">PATHETIC</h1>
      </Link>

      {/* Links */}
      <nav className="flex items-center gap-4">
        {session && session?.user ? (
          <>
            <Link href="/settings">
              <span>{session.user.name}</span>
            </Link>

            <UserButton />
          </>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
