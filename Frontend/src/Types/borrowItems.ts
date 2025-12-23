import type { IBooks } from "./books";
import type { IDateBorrows } from "./dateBorrows";

export interface IBorrowItems {
  _id: string;
  book_id: IBooks;
  dateBorrow_id: IDateBorrows;
  description: string;
  quantity: number;
  totalPrice: number;
  status: string;
}
