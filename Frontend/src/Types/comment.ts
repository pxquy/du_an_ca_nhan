import type { IBooks } from "./books";
import type { IUsers } from "./user";

export interface IComments {
  _id: string;
  title: string;
  user_id: IUsers;
  book_id: string;
  content: string;
  star: number;
  createdAt: string;
  updatedAt: string;
}
