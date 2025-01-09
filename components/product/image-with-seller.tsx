import Image from "next/image"
import { Avatar, AvatarImage } from "../ui/avatar"

interface ImageWithSellerProps {
    img: string;
    seller: {
        name: string | null;
        image: string | null;
    };
    alt: string;
}

const ImageWithSeller = ({ img, seller, alt }: ImageWithSellerProps) => {
    return (
        <div className="relative max-w-[600px] h-[600px]">
            <Image
                src={img}
                alt={alt}
                width={600}
                height={600}
                className="max-w-[600px] max-h-[600px] w-auto h-auto object-contain"
            />
            <div className="flex justify-start items-center gap-1 mt-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={seller.image || "https://github.com/shadcn.png"} />
                </Avatar>

                <p className="font-semibold underline text-blue-500">{seller.name}</p>
            </div>
        </div>
    )
}

export default ImageWithSeller