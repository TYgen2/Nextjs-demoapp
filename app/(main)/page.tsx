import { getRecentProduct } from "@/actions/getProduct";
import MasonryGrid from "@/components/home/masonry-grid";
import { ProductReturnFromDB } from "@/types/product";
import React from "react";

const HomePage = async () => {
  const fetchedProducts = await getRecentProduct();
  const products: ProductReturnFromDB[] = fetchedProducts ?? [];

  return (
    <div className="h-full overflow-auto">
      <div className="h-20 flex items-center justify-center select-none">
        <h1 className="text-3xl font-bold">Recent posters</h1>
      </div>

      <MasonryGrid products={products} />
    </div>
  );
};

export default HomePage;
