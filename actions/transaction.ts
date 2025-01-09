'use server';

import { TransactionSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const createTransaction = async (values: z.infer<typeof TransactionSchema>) => {
    const session = await auth();
    if (!session) {
        return { failure: "Unauthorized" };
    }

    const validatedData = TransactionSchema.parse({
        productId: values.productId,
        quantity: Number(values.quantity),
    });

    const product = await db.product.findUnique({
        where: {
            id: validatedData.productId
        }
    })

    if (!product) {
        throw new Error("Product not found!");
    }

    const transaction = await db.transaction.create({
        data: {
            userId: session.user.id as string,
            productId: validatedData.productId,
            quantity: validatedData.quantity,
            totalPrice: product.price * validatedData.quantity
        }
    })

    return { success: true, transaction }
}