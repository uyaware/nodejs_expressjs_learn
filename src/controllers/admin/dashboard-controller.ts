import { getAllUsers } from "@/services/user-services";
import { Request, Response } from "express";

export function getDashboardPage(req: Request, res: Response) {
  return res.render("admin/dashboard/show.ejs");
}

export async function getAdminUserPage(req: Request, res: Response) {
  const users = await getAllUsers();
  return res.render("admin/user/show.ejs", {
    users
  });
}

export function getAdminProductPage(req: Request, res: Response) {
  return res.render("admin/product/show.ejs");
}

export function getAdminOrderPage(req: Request, res: Response) {
  return res.render("admin/order/show.ejs");
}