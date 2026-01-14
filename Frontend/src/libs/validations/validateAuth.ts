import { message } from "antd";
import { z } from "zod";

export const validateRegister = z
  .object({
    name: z
      .string()
      .min(1, "Tên người dùng không được để trống")
      .regex(/^[a-zA-Z0-9À-ỹ]+$/, "Tên không được chưa ký tự đặc biệt!"),
    email: z
      .string()
      .min(1, "Email người dùng không được bỏ trống!")
      .regex(/^\S+@\S+\.\S+$/, "Email người dùng phải đúng định dạng!"),
    password: z.string().min(1, "Mật khẩu không được để trống"),
    confirm_password: z.string().min(1, "Nhập lại mật khẩu của bạn!"),
    numberPhone: z
      .string()
      .min(1, "Số điện thoại không được để trống!")
      .max(14, "Số điện thoại tối đa 14 ký tự")
      .regex(/^[0-9\.\-]+$/, "Số điện thoại phải nhập đúng định dạng"),
    image: z.string().optional(),
  })
  .refine((data) => data.confirm_password === data.password, {
    message: "Nhập lại mật khẩu không đúng!",
    path: ["confirm_password"],
  });

export type RegisterValidate = z.infer<typeof validateRegister>;

export const validateLogin = z.object({
  email: z
    .string()
    .min(1, "Email người dùng không được bỏ trống!")
    .regex(/^\S+@\S+\.\S+$/, "Email người dùng phải đúng định dạng!"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

export type LoginValidate = z.infer<typeof validateLogin>;
