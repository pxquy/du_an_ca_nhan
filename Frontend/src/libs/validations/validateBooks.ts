import { data } from "react-router";
import { z } from "zod";

export const createBook = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Tên sách không được để trống!")
      .max(50, "Tên sách không đượ quá 50 ký tự!")
      .regex(
        /^[a-zA-Z0-9À-ỹ\s/]+$/,
        "Tên sách không được chứa ký tự đặc biệt!"
      ),
    publish: z.string().min(1, "Ngày không được để trống!"),
    price: z.number().min(200, "Giá tiền phải lớn hơn hoặc bằng 200 VND!"),
    discountPrice: z.number().min(1, "Giá giảm không được âm!").optional(),
    image: z.union([z.string(), z.any()]).refine(
      (val) => {
        return (
          typeof val === "string" || (val instanceof FileList && val.length > 0)
        );
      },
      {
        message: "Ảnh sách không được để trống!",
      }
    ),
    description: z.string().optional(),
    status: z.string().min(1, "Trạng thái sách không được để trống!"),
    category_id: z.string().min(1, "Thể loại sách không được để trống!"),
    author_id: z.string().min(1, "Tác giả sách sách không được để trống!"),
  })
  .refine(
    (data) =>
      data.discountPrice === undefined || data.discountPrice < data.price,
    {
      message: "Giá giảm phải nhỏ hơn giá mượn của sách",
      path: ["discountPrice"],
    }
  );

export type CreateBook = z.infer<typeof createBook>;

export const updateBook = z
  .object({
    name: z
      .string()
      .min(1, "Tên sách không được để trống!")
      .max(50, "Tên sách không đượ quá 50 ký tự!")
      .regex(
        /^[a-zA-Z0-9À-ỹ\s/]+$/,
        "Tên sách không được chứa ký tự đặc biệt!"
      ),
    publish: z.string().min(1, "Ngày không được để trống!"),
    price: z.number().min(200, "Giá tiền phải lớn hơn hoặc bằng 200 VND!"),
    discountPrice: z.number().optional(),
    image: z.union([z.string(), z.any()]).optional(),
    description: z.string().optional(),
    status: z.string().min(1, "Trạng thái sách không được để trống!"),
    category_id: z.string().min(1, "Thể loại sách không được để trống!"),
    author_id: z.string().min(1, "Tác giả sách sách không được để trống!"),
  })
  .refine(
    (data) =>
      data.discountPrice === undefined || data.discountPrice < data.price,
    {
      message: "Giá giảm phải nhỏ hơn giá mượn của sách",
      path: ["discountPrice"],
    }
  );

export type UpdateBook = z.infer<typeof updateBook>;
