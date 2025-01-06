import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full w-full">
            <AppSidebar />
            {children}
        </div>
    );
}
