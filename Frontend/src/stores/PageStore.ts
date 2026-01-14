import { create } from "zustand";
import type { IPageStore } from "../Types/storeType";

export const usePageStore = create<IPageStore>((set) => ({
  page: 1,
  pageSize: 5,
  setPage: (page) =>
    set(() => ({
      page,
    })),
  setPageSize: (pageSize) =>
    set(() => ({
      pageSize,
    })),
}));
