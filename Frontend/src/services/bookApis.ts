import { optional } from "zod";
import { Api } from "../Api/api";
import type { IApiResponse, IResponse } from "../Types/data";
import type { IBooks } from "../Types/books";

export const GetAllBookApi = async () => {
  const { data } = await Api.get<IApiResponse<IResponse<IBooks>>>("books");
  return data.data.docs;
};

export const GetByIDBookApi = async (optionId: string) => {
  const { data } = await Api.get<IApiResponse<IBooks>>(`books/${optionId}`);
  return data.data;
};
