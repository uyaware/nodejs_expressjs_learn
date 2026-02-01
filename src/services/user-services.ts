import getConnection from "@/config/db";
import { prisma } from "@/config/client";

export async function handleCreateUser(
  name: string,
  email: string,
  address: string,
) {
  await prisma.user.create({
    data: {
      fullName: name,
      username: email,
      password: "123",
      accountType: "SYSTEM",
      address,
    },
  });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function getAllRoles() {
  return await prisma.role.findMany();
}

export async function handleDeleteUser(id: number) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function handleViewUser(id: number) {
  return await prisma.user.findUnique({
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
  await prisma.user.update({
    where: {
      id: +id,
    },
    data: {
      fullName: name,
      username: email,
      address,
    },
  });
}
