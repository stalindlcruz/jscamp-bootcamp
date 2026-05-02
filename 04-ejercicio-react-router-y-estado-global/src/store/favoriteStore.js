import { create } from "zustand";

export const useFavoriteStore = create((set, get, store) => ({
  // Initial States
  favorites: [],

  // Actions
  clearFavorites: () => {
    set(store.getInitialState());
  },

  addFavorite: (jobId) =>
    set((state) => ({
      favorites: state.favorites.includes(jobId)
        ? state.favorites
        : [...state.favorites, jobId],
    })),

  removeFavorite: (jobId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== jobId),
    })),

  isFavorite: (jobId) => get().favorites.includes(jobId),

  toggleFavorites: (jobId) => {
    const { addFavorite, removeFavorite, isFavorite } = get();

    const isFav = isFavorite(jobId);
    isFav ? removeFavorite(jobId) : addFavorite(jobId);
  },

  countFavorites: () => get().favorites.length,
}));
