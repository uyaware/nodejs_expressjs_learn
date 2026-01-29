import getConnection from "@/config/db";
import { prisma } from "@/config/client";

export async function handleCreateUser(
  name: string,
  email: string,
  address: string,
) {
  await prisma.users.create({
    data: {
      name,
      email,
      address,
    },
  });
}

export async function getAllUsers() {
  return await prisma.users.findMany();
}

export async function handleDeleteUser(id: number) {
  await prisma.users.delete({
    where: {
      id,
    },
  });
}

export async function handleViewUser(id: number) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
}

export async function handleUpdateUserById(
  id: string,
  name: string,
  email: string,
  address: string,
) {
  await prisma.users.update({
    where: {
      id: +id,
    },
    data: {
      name,
      email,
      address,
    },
  });
}
