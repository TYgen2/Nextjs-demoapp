import { auth } from "@/auth";
import Link from "next/link";
import { UserButton } from "./auth/user-button";

const NavBar = async () => {
  const session = await auth();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-green-100">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-widest">PATHETIC</h1>
      </Link>

      {/* Links */}
      <nav className="flex gap-4 items-center">
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
