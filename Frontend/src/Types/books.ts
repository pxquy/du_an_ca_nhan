import type { IAuthor } from "./authors";

export interface IBooks {
  _id: string;
  name: string;
  publish: string;
  price: number;
  discountPrice: number;
  image: string;
  description: string;
  status: IAuthor;
  category_id: string;
  author_id: string;
}
