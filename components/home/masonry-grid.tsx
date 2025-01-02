'use client';

import { getRecentProduct } from "@/actions/getProduct";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import Masonry from 'react-masonry-css';
import { useQuery } from "@tanstack/react-query";

interface Product {
    id: string;
    name: string;
    userId: string;
    description: string;
    price: number;
    imageUrl: string;
    createdAt: Date;
    user: {
        image: string | null;
    };
    userIcon?: string | null;
}

const MasonryGrid = () => {
    const { data: products = [], isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const data = await getRecentProduct();
            return data ?? [];
        }
    });

    const breakpointColumns = {
        default: 5,
        1280: 4, // xl
        1024: 3, // lg
        768: 2,  // md
        640: 2,  // sm
    };

    return (
        <Masonry
            breakpointCols={breakpointColumns}
            className="flex w-full gap-4 p-4 bg-blue-100"
            columnClassName="space-y-4 flex flex-col"
        >
            {products?.map((product) => (
                <div key={product.id} className="break-inside-avoid cursor-pointer relative">
                    <div className="relative aspect-auto w-full">
                        <Image
                            src={product.imageUrl}
                            alt={product.name || 'Product image'}
                            width={500}
                            height={500}
                            className="w-full h-auto object-cover rounded-lg"
                            sizes="(max-width: 640px) 100vw, 
                                   (max-width: 768px) 50vw, 
                                   (max-width: 1024px) 33vw,
                                   25vw"
                        />

                        {/* Overlay with product information */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-start items-center
                            p-4 bg-gradient-to-b from-black/0 to-black/100 rounded-b-lg">
                            <Avatar>
                                <AvatarImage src={product.userIcon || "https://github.com/shadcn.png"} />
                            </Avatar>
                            <div className="flex flex-col ml-2">
                                <h3 className="text-white font-semibold text-lg">{product.name}</h3>
                                <p className="text-white/80 text-sm">{product.description}</p>
                            </div>
                            <p className="text-white/90 font-bold ml-auto mt-auto">${product.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Masonry>
    )
}

export default MasonryGrid