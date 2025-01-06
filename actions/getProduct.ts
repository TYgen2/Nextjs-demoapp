"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getMyProduct = async (searchTerm?: string) => {
    const user = await currentUser();
    if (!user) {
        console.log("You have not signed in yet.");
        return null;
    }

    if (searchTerm) {
        console.log("I saw searchTerm!!!");
        try {
            const products = await db.product.findMany({
                where: {
                    userId: user.id,
                    name: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No searchTerm found!!!");
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
    }

    revalidatePath("/dashboard");
}

export const getRecentProduct = async () => {
    try {
        const products = await db.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        image: true
                    }
                }
            }
        });

        const productsWithUserIcon = products.map(product => ({
            ...product,
            userIcon: product.user?.image || null
        }));

        return productsWithUserIcon;
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/");
}