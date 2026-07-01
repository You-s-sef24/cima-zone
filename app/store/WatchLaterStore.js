import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWatchLaterStore = create(
    persist(
        (set, get) => ({
            watchLater: [],
            toggleWatchLater: (movie) => {
                const exists = get().watchLater.find((m) => m.id === movie.id);
                set((state) => ({
                    watchLater: exists
                        ? state.watchLater.filter((m) => m.id !== movie.id)
                        : [...state.watchLater, movie]
                }));
            },
            isWatchLater: (id) => get().watchLater.find((m) => m.id === id)
        }),
        {
            name: "cimazone-watch-later"
        }
    )
);