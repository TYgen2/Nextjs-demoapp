import { getMyProduct } from "@/actions/getProduct";
import { currentUser } from "@/lib/auth";
import { Card } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";

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
                    <div className="h-[280px] relative flex items-center justify-center">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={product.width}
                            height={product.height}
                            className="object-contain max-h-[280px] w-auto p-2"
                            priority={true}
                        />
                    </div>

                    <div className="flex-1 justify-start flex items-center w-full px-2 select-none">
                        <Avatar>
                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
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