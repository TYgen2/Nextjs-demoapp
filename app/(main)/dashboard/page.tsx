import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const DashboardPage = async () => {
  const user = await currentUser();

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex h-20 items-center justify-center px-8">
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

      <div className="flex-1 bg-red-300"></div>
    </div>
  );
};

export default DashboardPage;
