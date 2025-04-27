import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "../types";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
      },
      clearUser: () => {
        set({ user: null });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
