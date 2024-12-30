"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getMyProduct = async () => {
    const user = await currentUser();
    if (!user) {
        console.log("You have not signed in yet.");
        return null;
    }

    try {
        const products = await db.product.findMany({
            where: {
                userId: user.id,
            },
        });
        return products;
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/dashboard");
}