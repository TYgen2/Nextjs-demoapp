import { ProductOrientation } from "@prisma/client";

export type ProductReturnFromDB = {
  name: string;
  description: string;
  price: number;
  orientation: ProductOrientation;
  userId: string;
  id: string;
  imageUrl: string;
  createdAt: Date;
};
