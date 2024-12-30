import { getMyProduct } from "@/actions/getProduct";
import { currentUser } from "@/lib/auth";
import { Card } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const MyProduct = async () => {
    const products = await getMyProduct();
    const user = await currentUser();

    return (
        <div className="flex-1 flex flex-wrap gap-4 ml-4">
            {products?.map((product) => (
                <Card
                    key={product.id}
                    className="w-[250px] h-[350px] rounded-2xl shadow-xl shadow-blue-200 flex flex-col"
                >
                    <div className="h-[280px] w-full relative">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            objectFit="contain"
                            className="p-4"
                        />
                    </div>

                    <div className="flex-1 justify-start flex items-start mx-4">
                        <Avatar>
                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                            <AvatarFallback className="bg-slate-400">CN</AvatarFallback>
                        </Avatar>
                        <div className="flex justify-center flex-col items-start ml-2">
                            <p className="font-bold">{product.name}</p>
                            <p>{product.description}</p>
                        </div>
                        <p className="ml-auto">${product.price}</p>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default MyProduct