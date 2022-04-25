import prisma from "../database.js";
import { User } from "@prisma/client";
export async function findbyEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

type UserData = Omit<User, "id">;
export async function insert(data: UserData) {
  await prisma.user.create({ data });
}
