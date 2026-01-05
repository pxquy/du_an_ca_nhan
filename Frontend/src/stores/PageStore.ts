import { create } from "zustand";
import type { IPageStore } from "../Types/page";

export const usePageStore = create<IPageStore>((set) => ({
  page: 1,
  pageSize: 1,
  setPage: (page) =>
    set(() => ({
      page,
    })),
  setPageSize: (pageSize) =>
    set(() => ({
      pageSize,
    })),
}));
