import { Request, Response } from "express";
import {
  getAllRoles,
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUserById,
  handleViewUser,
} from "@/services/user-services";

export async function getHomePage(req: Request, res: Response) {
  const users = await getAllUsers();
  return res.render("home.ejs", {
    users,
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
  // await handleCreateUser(name, email, address);
  // return res.redirect("/");
  return res.redirect("/");
}

export async function postDeleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  await handleDeleteUser(id);
  return res.redirect("/");
}

export async function getViewUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await handleViewUser(id);
  return res.render("view-user.ejs", {
    user: user,
  });
}

export async function postUpdateUser(req: Request, res: Response) {
  const { id, name, email, address } = req.body;
  await handleUpdateUserById(id, name, email, address);
  res.redirect("/");
}
