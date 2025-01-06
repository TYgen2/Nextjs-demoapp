"use client";

import { getMyProduct } from "@/actions/getProduct";
import DashboardHeader from "@/components/dashboard/header";
import MyProduct from "@/components/dashboard/my-product";
import { useCurrentUser } from "@/hooks/use-current-user";
import { MyProductReturnFromDB } from "@/types/product";
import { useEffect, useState } from "react";

const MyProductPage = () => {
    const user = useCurrentUser();

    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<MyProductReturnFromDB[]>([]);

    if (!user) return <div>Not signed in</div>;

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getMyProduct(searchTerm);
            const products = fetchedProducts ?? [];
            setProducts(products);
        }

        fetchProducts();
    }, [searchTerm])

    return (
        <div className="h-full overflow-auto w-full">
            <DashboardHeader onSearch={handleSearch} />
            <MyProduct products={products} userIcon={user.image ?? undefined} />
        </div>
    );
};

export default MyProductPage;
