import { Calendar, Home, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { currentUser } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

// Menu items.
const items = [
    {
        title: "My products",
        url: "/dashboard/my-product",
        icon: Home,
    },
    {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: AutoGraphIcon,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export async function AppSidebar() {
    const user = await currentUser();
    if (!user) return null;

    return (
        <Sidebar className="mt-20">
            <SidebarContent className="bg-blue-100">
                <SidebarGroup>
                    <SidebarGroupLabel className="h-16">
                        <Avatar className="mr-2">
                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                            <AvatarFallback className="bg-slate-400">CN</AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-black text-base">{user.name}'s Dashboard</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
