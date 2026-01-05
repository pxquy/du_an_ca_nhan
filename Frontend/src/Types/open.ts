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
