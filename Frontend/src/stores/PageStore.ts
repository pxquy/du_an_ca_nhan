import { create } from "zustand";

interface IPageStore {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

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
