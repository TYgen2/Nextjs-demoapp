import { MyProductReturnFromDB, ProductReturnFromDB } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface MoreProductsProps {
    seller: string | null;
    moreProducts: MyProductReturnFromDB[]
}

const MoreProducts = ({ seller, moreProducts }: MoreProductsProps) => {
    return (
        <div className="flex flex-col justify-center items-start gap-2 mt-auto">
            <h1 className="text-md font-bold">More products from {seller}:</h1>
            <div className="flex gap-4">
                {moreProducts.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id}
                        className="flex flex-col justify-center items-center w-[100px] h-[100px]
                            relative hover:opacity-80 transition-all hover:active:opacity-90">
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover rounded-xl" quality={100} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MoreProducts