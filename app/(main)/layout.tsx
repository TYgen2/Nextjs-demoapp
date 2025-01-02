import NavBar from "@/components/NavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <NavBar />
      <main className="h-[calc(100vh-80px)]">
        {children}
      </main>
    </div>
  );
}
