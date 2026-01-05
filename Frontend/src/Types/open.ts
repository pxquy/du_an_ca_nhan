export interface IOpen {
  openAdd: boolean;
  openEdit: boolean;
  openDetail: boolean;
  setOpenAdd: (openAdd: boolean) => void;
  setOpenEdit: (openEdit: boolean) => void;
  setOpenDetail: (openDetail: boolean) => void;
}
