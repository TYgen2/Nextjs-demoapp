import Link from "next/link"
import { Button } from "../ui/button"
import AddIcon from "@mui/icons-material/Add";
import { currentUser } from "@/lib/auth";

const DashboardHeader = async () => {
    const user = await currentUser();

    return (
        <div className="flex h-20 items-center justify-center px-8 select-none">
            <h1 className="text-3xl font-bold">Your products</h1>

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