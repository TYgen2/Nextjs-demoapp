import { auth, signOut } from "@/auth";
import Link from "next/link";

const NavBar = async () => {
  const session = await auth();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-transparent">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-widest">PATHETIC</h1>
      </Link>

      {/* Links */}
      <nav className="flex gap-4">
        {session && session?.user ? (
          <>
            <Link href="/settings">
              <span>{session.user.name}</span>
            </Link>

            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
