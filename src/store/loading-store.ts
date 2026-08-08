import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  progress: number;

  start: () => void;
  finish: () => void;
  setProgress: (
        updater:
        | number
        | ((prev: number) => number)
    ) => void;
}

export const useLoadingStore =
  create<LoadingState>((set) => ({
    loading: false,
    progress: 0,

    start: () =>
      set({
        loading: true,
        progress: 5,
      }),

    finish: () => {
        set({ progress: 100 });
        setTimeout(() => set({ loading: false, progress: 0 }), 200);
    },

   setProgress: (updater) =>
    set((state) => ({
        progress:
        typeof updater === "function"
            ? updater(state.progress)
            : updater,
    })),
  }));