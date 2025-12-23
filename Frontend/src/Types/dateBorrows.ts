import type { IUsers } from "./user";

export interface IDateBorrows {
  _id: string;
  user_id: IUsers;
  borrow_date: string;
  return_date: string;
}
