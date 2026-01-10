import { z } from "zod";

export const validateDateBorrows = z.object({
  user_id: z.string().min(1, "Thông tin người mượn không được để trống!"),
  borrow_date: z.string().min(1, "Ngày mượn không được để trống!"),
  return_date: z.string().min(1, "Ngày phải trả không được để trống!"),
});

export type DateBorrowsValidate = z.infer<typeof validateDateBorrows>;
