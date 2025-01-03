import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import AddIcon from "@mui/icons-material/Add";
import { currentUser } from "@/lib/auth";

const DashboardHeader = async () => {
    const user = await currentUser();

    return (
        <div className="flex h-20 items-center justify-center px-8 select-none">
            <Avatar className="mr-2">
                <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                <AvatarFallback className="bg-slate-400">CN</AvatarFallback>
            </Avatar>
            <span className="text-2xl font-bold">{user?.name}'s Dashboard</span>

            <Link href="/dashboard/add-product" className="ml-auto">
                <Button variant="outline" type="button">
                    <AddIcon />
                    Add product
                </Button>
            </Link>
        </div>
    )
}

export default DashboardHeader