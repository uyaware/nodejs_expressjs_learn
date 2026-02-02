import { prisma } from "@/config/client";

export async function handleCreateProduct(
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  image: string,
) {
  await prisma.product.create({
    data: {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
      image,
    },
  });
}

export async function getAllProducts() {
  return await prisma.product.findMany();
}

export async function handleDetailProductById(id: number) {
  return await prisma.product.findFirst({
    where: {
      id,
    },
  });
}

export async function handleUpdateProduct(
  id: number,
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  image: string,
) {
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
      image,
    },
  });
}

export async function handleDeleteProduct(id: number) {
  return await prisma.product.delete({
    where: { id },
  });
}
