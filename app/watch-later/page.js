"use client";

import MovieCard from "../Components/MovieCard";
import { Bookmark } from "lucide-react";
import { useWatchLaterStore } from "../store/WatchLaterStore";

export default function WatchLaterPage() {
    const watchLater = useWatchLaterStore((state) => state.watchLater);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">Watch Later</h1>

                {watchLater.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
                        <Bookmark size={48} />
                        <p className="text-lg">No movies to watch later</p>
                        <p className="text-sm">Add a movie to your watch later list.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {watchLater.map((movie) => (
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