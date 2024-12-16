"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.PROVIDER) {
    return { success: "ALLOWED!!!!" };
  }

  return { error: "NOT ALLOWED" };
};
