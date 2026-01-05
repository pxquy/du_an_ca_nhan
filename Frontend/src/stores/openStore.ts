import { create } from "zustand";
import type { IOpen } from "../Types/open";

export const useOpen = create<IOpen>((set) => ({
  openAdd: false,
  openEdit: false,
  openDetail: false,
  openId: null,
  setOpenAdd: (openAdd) =>
    set(() => ({
      openAdd,
    })),
  setOpenEdit: (openEdit) =>
    set(() => ({
      openEdit,
    })),
  setOpenDetail: (openDetail) =>
    set(() => ({
      openDetail,
    })),
  setOpenId: (openId) => set({ openId }),
}));
