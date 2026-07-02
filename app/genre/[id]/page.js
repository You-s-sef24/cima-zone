"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/app/Components/MovieCard";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import GenrePageSkeleton from "@/app/Components/loaders/GenrePageSkeleton";

export default function GenrePage() {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const { data: movieData, isLoading } = useQuery({
        queryKey: ["genre-movies", id, page],
        queryFn: async () => {
            const res = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?with_genre=${id}&sort_by=popularity.desc&page=${page}`,
                {
                    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
                },
            );
            return res.data;
        }
    });

    const { data: genres } = useQuery({
        queryKey: ["genre-list"],
        queryFn: async () => {
            const res = await axios.get(
                "https://api.themoviedb.org/3/genre/movie/list",
                {
                    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
                }
            );
            return res.data.genres;
        },
    });

    if (isLoading) {
        return <GenrePageSkeleton />;
    }

    const genreName = genres?.find((g) => g.id === Number(id))?.name || "Genre";
    const movies = movieData?.results || [];
    const totalPages = Math.min(movieData?.total_pages || 1, 50);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <h1 className="text-3xl font-bold mb-8 text-white">
                    <span>{genreName}</span>
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies.map((movie) => (
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

                <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#1a1a1a] text-sm text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                        <ChevronLeftIcon size={16} /> Prev
                    </button>

                    <span className="text-sm text-gray-400 bg-[#1a1a1a] px-4 py-2 rounded-full">
                        {page} / {totalPages}
                    </span>

                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#1f1f1f] text-sm text-white font-semibold hover:bg-[#2a2a2a] disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                        Next <ChevronRightIcon size={16} />
                    </button>
                </div>

            </div>
        </div>
    );
}