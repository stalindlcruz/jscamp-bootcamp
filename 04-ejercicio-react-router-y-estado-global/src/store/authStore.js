import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // Initial States
  isLoggedIn: false,

  //Actions
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
