import Link from "next/link";

export default function AuthNavBar() {
  return (
    <header className="absolute z-10 flex items-center justify-start px-8 py-4">
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-widest text-white">
          PATHETIC
        </h1>
      </Link>
    </header>
  );
}
