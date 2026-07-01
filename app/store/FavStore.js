import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavStore = create(
    persist(
        (set, get) => ({
            fav: [],

            toggleFav: (movie) => {
                const exists = get().fav.some((i) => i.id === movie.id);
                set((state) => ({
                    fav: exists
                        ? state.fav.filter((i) => i.id !== movie.id)
                        : [...state.fav, movie],
                }));
            },

            isFav: (id) => get().fav.some((i) => i.id === id),
        }),
        {
            name: "cimazone-favorites",
        }
    )
);