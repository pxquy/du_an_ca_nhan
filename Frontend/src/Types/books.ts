import type { IAuthor } from "./authors";
import type { ICategories } from "./categories";

export interface IBooks {
  _id: string;
  name: string;
  publish: string;
  price: number;
  discountPrice: number;
  image: string;
  description: string;
  status: string;
  category_id: ICategories;
  author_id: IAuthor;
}
