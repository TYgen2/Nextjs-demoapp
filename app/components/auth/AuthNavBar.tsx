import Link from "next/link";

export default function AuthNavBar() {
    return (
        <header className="flex justify-start items-center px-8 py-4 absolute z-10">
            <Link href="/">
                <h1 className="text-2xl font-bold tracking-widest text-white">PATHETIC</h1>
            </Link>
        </header>
    );
}