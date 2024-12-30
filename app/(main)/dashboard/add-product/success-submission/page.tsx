import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const SuccessSubmissionPage = async ({
  searchParams,
}: {
  searchParams: { productDetails: string };
}) => {
  const { productDetails } = await searchParams;

  if (!productDetails) return <div>Something went wrong!!</div>;

  // Parse the productDetails string
  const productData = JSON.parse(decodeURIComponent(productDetails));

  return (
    <Card className="flex h-[600px] w-[600px] flex-col">
      <CardHeader className="h-20 items-center justify-center">
        <span className="text-3xl font-bold">
          Product published successfully
        </span>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        {/* Product image */}
        <div className="h-[200px] w-full relative">
          <Image
            src={productData.imageUrl}
            alt="Product"
            objectFit="contain"
            fill
          />
        </div>

        <div className="flex-1 w-full flex-col items-start justify-center flex">
          {/* Product details */}
          <div className="flex flex-row items-center">
            <p className="text-lg font-semibold">Product Name:</p>
            <p className="text-lg ml-2">{productData.name}</p>
          </div>

          <div className="flex flex-row items-center">
            <p className="text-lg font-semibold">Description:</p>
            <p className="text-lg ml-2">{productData.description}</p>
          </div>

          <div className="flex flex-row items-center">
            <p className="text-lg font-semibold">Price:</p>
            <p className="text-lg ml-2">{productData.price}</p>
          </div>

          <div className="flex flex-row items-center">
            <p className="text-lg font-semibold">Published date:</p>
            <p className="text-lg ml-2">{productData.createdAt.slice(0, 10)}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="h-20 items-center justify-center gap-4 ">
        <Button className="flex-1">
          <Link href="/dashboard">View the product in my dashboard </Link>
        </Button>

        <Button className="flex-1">
          <Link href="/">Return home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuccessSubmissionPage;
