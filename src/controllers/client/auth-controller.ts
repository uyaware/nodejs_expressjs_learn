import { handleRegister } from "@/services/auth-services";
import { RegisterSchema, TRegisterSchema } from "@/validation/register-schema";
import { Request, Response } from "express";

export async function getLoginPage(req: Request, res: Response) {
  return res.render("client/auth/login.ejs");
}

export async function getRegisterPage(req: Request, res: Response) {
  const errors = [];
  const oldData = {};

  return res.render("client/auth/register.ejs", {
    errors, oldData
  });
}

export async function postRegister(req: Request, res: Response) {
  const { fullName, username, password, confirmPassword } = req.body as TRegisterSchema;

  const validate = await RegisterSchema.safeParseAsync(req.body);

  if(!validate.success) {
    const errorsZod = validate.error.issues;

    const errors = errorsZod?.map(
      (error) => `ERROR: ${error.path[0]} - MESSAGE: ${error.message}`,
    );

    const oldData = {
      fullName, username, password, confirmPassword
    };

    return res.render("client/auth/register.ejs", {
      errors,
      oldData,
    });
  }

  await handleRegister(fullName, username, password);

  return res.redirect("/login");
}