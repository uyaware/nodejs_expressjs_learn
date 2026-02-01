import { prisma } from "./client";

export async function initData() {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();

  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "quan.phongtran521@gmail.com",
          fullName: "Tran Phong Quan",
          password: "123",
          accountType: "SYSTEM",
        },
        {
          username: "hello@hello.com",
          password: "123",
          accountType: "SYSTEM",
        },
      ],
    });
  } else if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "admin can do anything",
        },
        {
          name: "USER",
          description: "normal user",
        },
      ],
    });
  }
}
