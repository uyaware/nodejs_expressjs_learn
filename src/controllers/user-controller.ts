import { Request, Response } from "express";
import {
  getAllRoles,
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUserById,
  handleViewUser,
} from "@/services/user-services";
import { getAllProducts } from "@/services/product-services";

export async function getHomePage(req: Request, res: Response) {
  const products = await getAllProducts();

  return res.render("client/home/show.ejs", {
    products
  });
}

export async function getCreateUserPage(req: Request, res: Response) {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", {
    roles,
  });
}

export async function postCreateUser(req: Request, res: Response) {
  const { fullName, username, phone, role, address } = req.body;

  const avatar = req.file ? req.file.filename : "default.png";

  await handleCreateUser(fullName, username, address, phone, avatar, +role);

  return res.redirect("/admin/user");
}

export async function postDeleteUser(req: Request, res: Response) {
  const { id } = req.params;
  await handleDeleteUser(+id);
  return res.redirect("/admin/user");
}

export async function getViewUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user, roles } = await handleViewUser(id);
  return res.render("admin/user/detail.ejs", {
    user,
    roles,
  });
}

export async function postUpdateUser(req: Request, res: Response) {
  const { id, fullName, phone, role, address } = req.body;

  const avatar = req.file ? req.file.filename : "default.png";

  await handleUpdateUserById(+id, fullName, address, phone, avatar, +role);

  return res.redirect("/admin/user");
}
