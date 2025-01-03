export type ProductReturnFromDB = {
  name: string;
  description: string;
  price: number;
  userId: string;
  id: string;
  imageUrl: string;
  createdAt: Date;
  width: number;
  height: number;
  user: {
    image: string | null;
  };
  userIcon?: string | null;
};
