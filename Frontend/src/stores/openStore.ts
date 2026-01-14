import { create } from "zustand";
import type { IOpen } from "../Types/storeType";

export const useOpen = create<IOpen>((set) => ({
  openMenu1: false,
  openMenu2: false,
  openAdd: false,
  openEdit: false,
  openDetail: false,
  openId: null,
  setOpenMenu1: (openMenu1) => set({ openMenu1 }),
  setOpenMenu2: (openMenu2) => set({ openMenu2 }),
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
