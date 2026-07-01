"use client";

import MovieCard from "../Components/MovieCard";
import { useFavStore } from "../store/FavStore";
import { HeartIcon } from "lucide-react";

export default function FavoritesPage() {
    const fav = useFavStore((state) => state.fav);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">Favorites</h1>

                {fav.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
                        <HeartIcon size={48} />
                        <p className="text-lg">No favorites yet</p>
                        <p className="text-sm">Heart a movie to save it here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {fav.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                img={movie.poster_path}
                                rating={movie.vote_average}
                                date={movie.release_date?.slice(0, 4)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}