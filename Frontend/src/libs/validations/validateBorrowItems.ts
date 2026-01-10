import { z } from "zod";

export const validateBorrowItems = z.object({
  book_id: z.string().min(1, "Thông tin sách được mượn không được để trống!"),
  dateBorrow_id: z.string().min(1, "Thông tin người mượn không được để trống!"),
  quantity: z.number().min(1, "Số lượng phải lớn hơn hoặc bằng 1!"),
  status: z.string().min(1, "Trạng thái sách mượn không được để trống!"),
  description: z.string().optional(),
});

export type BorrowItemsValidate = z.infer<typeof validateBorrowItems>;
