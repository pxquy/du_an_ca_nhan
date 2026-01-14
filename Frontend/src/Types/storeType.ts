import type { ReactNode } from "react";

export interface IEyeOpen {
  eye: boolean;
  eyeConfirm: boolean;
  setEye: (eye: boolean) => void;
  setEyeConfirm: (eyeConfirm: boolean) => void;
}

export interface IOpen {
  openAdd: boolean;
  openEdit: boolean;
  openDetail: boolean;
  openId: string | null;
  setOpenAdd: (openAdd: boolean) => void;
  setOpenEdit: (openEdit: boolean) => void;
  setOpenDetail: (openDetail: boolean) => void;
  setOpenId: (openId: string | null) => void;
}

export interface IPageStore {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

export type TGlobalProps<T = {}> = {
  children: ReactNode;
} & T;
