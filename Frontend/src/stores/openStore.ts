import { create } from "zustand";

interface IOpen {
  openAdd: boolean;
  openEdit: boolean;
  openDetail: boolean;
  setOpenAdd: (openAdd: boolean) => void;
  setOpenEdit: (openEdit: boolean) => void;
  setOpenDetail: (openDetail: boolean) => void;
}

export const useOpen = create<IOpen>((set) => ({
  openAdd: false,
  openEdit: false,
  openDetail: false,
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
}));
