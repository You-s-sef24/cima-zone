"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { SearchXIcon } from "lucide-react";
import MovieCard from "@/app/Components/MovieCard";
import SearchPageSkeleton from "@/app/Components/loaders/SearchPageSkeleton";

const TMDB_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGJiODdmODViNDZhN2VlN2U0ZTdmNGM5MDE0OGQwYyIsIm5iZiI6MTc1NTI2MDc4Mi4yODcwMDAyLCJzdWIiOiI2ODlmMjc2ZWJmYWIyZDdlNTg1ZDJhNjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7c5eqGuW7C4e_JyHrcia32Y5Zbrut9aJhLzksC8NEZA";

const IMG = "https://image.tmdb.org/t/p/w185";

export default function SearchPage() {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    const decodedQuery = decodeURIComponent(query || "");

    useEffect(() => {
        if (!decodedQuery) return;
        setLoading(true);

        const headers = { Authorization: `Bearer ${TMDB_TOKEN}` };

        Promise.all([
            axios.get("https://api.themoviedb.org/3/search/movie", {
                headers,
                params: { query: decodedQuery },
            }),
            axios.get("https://api.themoviedb.org/3/search/person", {
                headers,
                params: { query: decodedQuery },
            }),
        ])
            .then(([movieRes, personRes]) => {
                setMovies(movieRes.data.results || []);
                setPeople(personRes.data.results?.slice(0, 6) || []);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, [decodedQuery]);

    if (loading) {
        return <SearchPageSkeleton />;
    }

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <h1 className="text-2xl font-bold mb-2">
                    Search results for <span className="text-yellow-400">&quot;{decodedQuery}&quot;</span>
                </h1>
                <p className="text-gray-500 text-sm mb-10">
                    {movies.length} movie{movies.length !== 1 ? "s" : ""} found
                </p>

                {movies.length === 0 && people.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
                        <SearchXIcon size={48} />
                        <p className="text-lg">No results found for &quot;{decodedQuery}&quot;</p>
                        <p className="text-sm">Try a different title, actor, or keyword.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-14">

                        {people.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold mb-6">People</h2>
                                <div className="flex gap-6 overflow-x-auto py-2">
                                    {people.map((person) => (
                                        <Link
                                            href={`/person/${person.id}`}
                                            key={person.id}
                                            className="flex flex-col items-center gap-2 shrink-0 w-20 group"
                                        >
                                            <div className="w-16 h-16 rounded-full overflow-hidden bg-[#1f1f1f] ring-2 ring-transparent group-hover:ring-yellow-400 transition-all">
                                                {person.profile_path ? (
                                                    <Image
                                                        src={`${IMG}${person.profile_path}`}
                                                        alt={person.name}
                                                        width={64}
                                                        height={64}
                                                        className="object-cover w-full h-full group-hover:scale-110 transition-all"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-lg font-bold text-gray-500">
                                                        {person.name[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-center text-white font-medium leading-tight line-clamp-2 group-hover:text-yellow-400 transition-colors">
                                                {person.name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {movies.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold mb-6">Movies</h2>
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
                            </section>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
}