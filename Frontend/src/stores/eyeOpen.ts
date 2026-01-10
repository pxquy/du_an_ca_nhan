import { create } from "zustand";
import type { IEyeOpen } from "../Types/eyeOpen";

export const useEyeStore = create<IEyeOpen>((set) => ({
  eye: false,

  eyeConfirm: false,
  setEye: (eye) => {
    set(() => ({
      eye,
    }));
  },

  setEyeConfirm: (eyeConfirm) =>
    set(() => ({
      eyeConfirm,
    })),
}));
