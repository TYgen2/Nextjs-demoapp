"use client";

import { useState } from "react";
import QuantityCounter from "./quantity-counter";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createTransaction } from "@/actions/transaction";
import { Button } from "../ui/button";

interface AddToCartSectionProps {
    productId: string;
}

const AddToCartSection = ({ productId }: AddToCartSectionProps) => {
    const user = useCurrentUser();
    const [count, setCount] = useState(0);
    const handleCount = (type: string) => {
        if (type === 'add') {
            setCount(count + 1);
        } else if (type === 'subtract') {
            setCount(count - 1);
        }
    }

    {/* Now simulate as actually bought the product */ }
    const handleAddToCart = async () => {
        if (!user) {
            return toast("Unauthorized! Please sign in first!!");
        }

        if (count === 0) {
            return toast("Please select a quantity!!");
        }

        const newTransaction = await createTransaction({ productId, quantity: count });
        if (newTransaction.success) {
            toast("Successfully added to cart!");
        } else {
            toast("Failed to add to cart!");
        }
    }

    return <div className="flex items-center justify-center gap-2">
        <QuantityCounter count={count} handleCount={handleCount} />
        <Button type="button" className="h-12 w-40 rounded-3xl flex-1 hover:active:opacity-90"
            onClick={handleAddToCart}>
            Add to cart
        </Button>
    </div>
};

export default AddToCartSection;