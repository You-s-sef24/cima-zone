"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/app/Components/MovieCard";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const TMDB_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGJiODdmODViNDZhN2VlN2U0ZTdmNGM5MDE0OGQwYyIsIm5iZiI6MTc1NTI2MDc4Mi4yODcwMDAyLCJzdWIiOiI2ODlmMjc2ZWJmYWIyZDdlNTg1ZDJhNjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7c5eqGuW7C4e_JyHrcia32Y5Zbrut9aJhLzksC8NEZA";

export default function GenrePage() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [genreName, setGenreName] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://api.themoviedb.org/3/discover/movie?with_genre=${id}&sort_by=popularity.desc&page=${page}`, {
                headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
            })
            .then((res) => {
                setMovies(res.data.results);
                setTotalPages(Math.min(res.data.total_pages, 50));
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, [id, page]);

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/genre/movie/list", {
            headers:{ Authorization: `Bearer ${TMDB_TOKEN}` }
        })
            .then((res) => {
                const found = res.data.genres.find((g) => g.id === Number(id));
                setGenreName(found?.name || "Genre");
            });
    }, [id]);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <h1 className="text-3xl font-bold mb-8 text-white">
                    <span>{genreName}</span>
                </h1>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-2 animate-pulse">
                                <div className="w-full aspect-[2/3] rounded-xl bg-[#1f1f1f]" />
                                <div className="h-3 w-3/4 bg-[#1f1f1f] rounded" />
                                <div className="h-3 w-1/2 bg-[#1f1f1f] rounded" />
                            </div>
                        ))}
                    </div>
                ) : (
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
                )}

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