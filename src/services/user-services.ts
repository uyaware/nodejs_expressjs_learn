import { prisma } from "@/config/client";
import { ACCOUNT_TYPE } from "@/config/constant";
import hashPassword from "@/utils/hashPassword";

export async function handleCreateUser(
  fullName: string,
  username: string,
  address: string,
  phone: string,
  avatar: string,
  roleId: number,
) {
  const defaultPassword = await hashPassword("123456");

  await prisma.user.create({
    data: {
      fullName,
      username,
      password: defaultPassword,
      accountType: ACCOUNT_TYPE.SYSTEM,
      address,
      avatar,
      phone,
      roleId,
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
  const roles = await prisma.role.findMany();

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return {
    user,
    roles,
  };
}

export async function handleUpdateUserById(
  id: number,
  fullName: string,
  address: string,
  phone: string,
  avatar: string,
  roleId: number,
) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      fullName,
      address,
      phone,
      avatar,
      roleId,
    },
  });
}
