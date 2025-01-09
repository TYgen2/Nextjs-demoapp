'use client';

import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import Masonry from 'react-masonry-css';
import { motion } from "framer-motion";
import { ProductReturnFromDB } from "@/types/product";
import Link from "next/link";

const ContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, }
};

interface MasonryGridProps {
    products: ProductReturnFromDB[];
}

const MasonryGrid = ({ products }: MasonryGridProps) => {
    const breakpointColumns = {
        default: 5,
        1280: 4, // xl
        1024: 3, // lg
        768: 2,  // md
        640: 2,  // sm
    };

    return (
        <motion.div initial="hidden" animate="visible" variants={ContainerVariants}>
            <Masonry
                breakpointCols={breakpointColumns}
                className="flex w-full gap-4 p-4"
                columnClassName="space-y-4 flex flex-col"
            >
                {products?.map((product) => (
                    <motion.div key={product.id} className="relative aspect-auto w-full transition-all hover:scale-105
                 break-inside-avoid cursor-pointer" variants={itemVariants}>
                        <Link href={`/product/${product.id}`}>
                            <Image
                                src={product.imageUrl}
                                alt={product.name || 'Product image'}
                                width={product.width}
                                height={product.height}
                                className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition-all"
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
                                    <h3 className="text-white font-semibold text-lg select-none">{product.name}</h3>
                                    <p className="text-white/80 text-sm select-none">{product.description}</p>
                                </div>
                                <p className="text-white/90 font-bold ml-auto mt-auto select-none">${product.price}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </Masonry>
        </motion.div>

    )
}

export default MasonryGrid