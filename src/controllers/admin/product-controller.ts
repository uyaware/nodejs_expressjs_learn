import {
  getAllProducts,
  handleCreateProduct,
  handleDeleteProduct,
  handleDetailProductById,
  handleUpdateProduct,
} from "@/services/product-services";
import { ProductSchema, TProductSchema } from "@/validation/product-schema";
import { Request, Response } from "express";

export async function getAdminProductPage(req: Request, res: Response) {
  const products = await getAllProducts();
  return res.render("admin/product/show.ejs", {
    products,
  });
}

export function getAdminCreateProductPage(req: Request, res: Response) {
  const errors = [];
  const oldData = {
    name: "",
    price: "",
    detailDesc: "",
    shortDesc: "",
    quantity: "",
    factory: "",
    target: "",
  };

  return res.render("admin/product/create.ejs", {
    errors,
    oldData,
  });
}

export async function postCreateProduct(req: Request, res: Response) {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchema;

  const validate = ProductSchema.safeParse(req.body);

  if (!validate.success) {
    const errorsZod = validate.error.issues;

    const errors = errorsZod?.map(
      (error) => `ERROR: ${error.path[0]} - MESSAGE: ${error.message}`,
    );

    const oldData = {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
    };

    return res.render("admin/product/create.ejs", {
      errors,
      oldData,
    });
  }

  let image = req.file ? req.file.filename : "default.png";
  image = "products/" + image;

  await handleCreateProduct(
    name,
    +price,
    detailDesc,
    shortDesc,
    +quantity,
    factory,
    target,
    image,
  );

  return res.redirect("/admin/product");
}

export async function getViewProduct(req: Request, res: Response) {
  const { id } = req.params;
  const product = await handleDetailProductById(+id);
  const errors = []
  return res.render("admin/product/detail.ejs", {
    product, errors
  });
}

export async function postUpdateProduct(req: Request, res: Response) {
  const { id, name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchema;

  let image = req.file ? req.file.filename : 'default.png';
  image = 'products/' + image;

  await handleUpdateProduct(+id, name, +price, detailDesc, shortDesc, +quantity, factory, target, image);

  return res.redirect("/admin/product");
}

export async function postDeleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  await handleDeleteProduct(+id);
  return res.redirect("/admin/product");
}