import { z } from "zod";

export const validateCategories = z.object({
  name: z
    .string()
    .min(1, "Tên thể loại sách không được để trống!")
    .regex(/^[a-zA-Z0-9À-ỹ\s/]+$/, {
      message: "Tên thể loại sách không được để ký tự đặc biệt",
    }),
  description: z.string().optional(),
});

export type CategoriesValidate = z.infer<typeof validateCategories>;
