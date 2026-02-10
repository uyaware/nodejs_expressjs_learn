import { isEmailExist } from "@/services/auth-services";
import { z } from "zod";

const emailSchema = z
  .string()
  .email("Email Không đúng định dạng")
  .refine(
    async (email) => {
      const existingUser = await isEmailExist(email);
      return !existingUser;
    },
    {
      message: "Email đã được sử dụng",
      path: ["email"],
    },
  );

export const RegisterSchema = z
  .object({
    fullName: z.string().trim().min(1, { message: "Name không được để trống" }),
    username: emailSchema,
    password: z.string().min(3, { message: "Password tối thiểu 3 ký tự" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password không chính xác",
    path: ["confirmPassword"],
  });


export type TRegisterSchema = z.infer<typeof RegisterSchema>;