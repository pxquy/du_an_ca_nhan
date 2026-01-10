import { z } from "zod";

export const validateAuthors = z.object({
  name: z
    .string()
    .min(1, "Tên tác giả không được để trống!")
    .trim()
    .regex(/^[a-zA-Z0-9À-ỹ\s/]+$/, {
      message: "Tên tác giả không được chứa ký tự đặc biệt!",
    }),
  email: z
    .string()
    .min(1, "Email tác giả không được bỏ trống!")
    .trim()
    .regex(/^\S+@\S+\.\S+$/, {
      message: "email phải đúng định dạng!",
    }),
  birthday: z.string().optional(),
  numberPhone: z
    .string()
    .min(1, "Số điện thoại tác giả không được để trống!")
    .max(14, "Số điện thoại tối đa 11 ký tự!")
    .regex(/^[0-9\-\.]+$/, "Số điện thoại phải nhập đúng định dạng!"),
});

export type AuthorsValidate = z.infer<typeof validateAuthors>;
