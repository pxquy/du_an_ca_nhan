import { Api } from "../Api/api";
import type { IBorrowItems } from "../Types/borrowItems";
import type { IApiResponse, IResponse } from "../Types/data";

export const GetAllBorrowItems = async () => {
  const { data } = await Api.get<IApiResponse<IResponse<IBorrowItems>>>(
    "borrowItems"
  );
  return data.data.docs;
};
