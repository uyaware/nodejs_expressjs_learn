import { prisma } from "@/config/client";
import { ACCOUNT_TYPE } from "@/config/constant";
import hashPassword from "@/utils/hashPassword";

export async function isEmailExist(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: email,
    },
  });

  return user ? true : false;
}

export async function handleRegister(
  fullName: string,
  username: string,
  password: string,
) {
  const hashedPassword = await hashPassword(password);

  const userRole = await prisma.role.findUnique({
    where: {
      name: "USER",
    },
  });

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      fullName,
      accountType: ACCOUNT_TYPE.SYSTEM,
      roleId: userRole.id,
    },
  });
}
