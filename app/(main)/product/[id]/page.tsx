import { db } from "@/lib/db"
import ImageWithSeller from "@/components/product/image-with-seller"
import MoreProducts from "@/components/product/more-products"
import AddToCartSection from "@/components/product/add-to-cart-section"

interface ProductPageProps {
    params: Promise<{ id: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const productId = (await params).id;
    const product = await db.product.findUnique({
        where: {
            id: productId
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })

    if (!product) {
        return <div>Not found</div>
    }

    const moreProducts = await db.product.findMany({
        where: {
            userId: product.userId,
            id: {
                not: product.id
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5,
    })

    return (
        <div className="flex gap-4 justify-center pt-8">
            {/* Product image */}
            <ImageWithSeller img={product.imageUrl} seller={product.user} alt={product.name} />

            {/* Product details */}
            <div className="flex flex-col w-[600px] px-4 gap-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <hr className="h-0.5 bg-slate-300" />
                <h1 className="text-xl">{product.description}</h1>
                <hr className="h-0.5 bg-slate-300" />

                <AddToCartSection productId={product.id} />
                <MoreProducts seller={product.user.name} moreProducts={moreProducts} />
            </div>
        </div>
    )
}

export default ProductPage