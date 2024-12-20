import NavBar from "@/components/NavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <NavBar />
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
