import { create } from "zustand";
import type { ITokenStore } from "../Types/storeType";

const accessToken = localStorage.getItem("token") || "";
export const tokenStore = create<ITokenStore>((set) => ({
  token: accessToken,
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
    set({ token });
  },
  removeToken: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
