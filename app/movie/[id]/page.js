"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { StarIcon, ClockIcon, CalendarIcon, PlayIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import MovieCard from "@/app/Components/MovieCard";
import MoviePageSkeleton from "@/app/Components/loaders/MoviePageSkeleton";
import Link from "next/link";

const TMDB_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGJiODdmODViNDZhN2VlN2U0ZTdmNGM5MDE0OGQwYyIsIm5iZiI6MTc1NTI2MDc4Mi4yODcwMDAyLCJzdWIiOiI2ODlmMjc2ZWJmYWIyZDdlNTg1ZDJhNjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7c5eqGuW7C4e_JyHrcia32Y5Zbrut9aJhLzksC8NEZA";

const IMG = "https://image.tmdb.org/t/p/w500";
const IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

export default function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [videos, setVideos] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const headers = { Authorization: `Bearer ${TMDB_TOKEN}` };

        Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${id}`, { headers }),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, { headers }),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, { headers }),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, { headers }),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, { headers }),
        ])
            .then(([movieRes, creditsRes, videosRes, reviewsRes, similarRes]) => {
                setMovie(movieRes.data);
                setCast(creditsRes.data.cast.slice(0, 10));
                setVideos(videosRes.data.results.filter((v) => v.site === "YouTube").slice(0, 3));
                setReviews(reviewsRes.data.results.slice(0, 5));
                setSimilar(similarRes.data.results.slice(0, 10));
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <MoviePageSkeleton />;

    const year = movie.release_date?.slice(0, 4);
    const runtime = movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : null;

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">

            <div className="relative w-full h-[70vh] min-h-[500px]">
                {movie.backdrop_path && (
                    <Image
                        src={`${IMG_ORIGINAL}${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover object-top brightness-40"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-10 left-6 md:left-12 flex gap-8 items-end max-w-4xl">
                    {movie.poster_path && (
                        <div className="hidden md:block shrink-0 w-[200px] rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src={`${IMG}${movie.poster_path}`}
                                alt={movie.title}
                                width={200}
                                height={300}
                                className="object-cover w-full"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>

                        {movie.tagline && (
                            <p className="text-gray-400 text-sm italic">{movie.tagline}</p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-300 flex-wrap">
                            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                                <StarIcon size={15} className="fill-yellow-400" />
                                {movie.vote_average?.toFixed(1)}
                            </span>
                            {runtime && (
                                <span className="flex items-center gap-1">
                                    <ClockIcon size={14} /> {runtime}
                                </span>
                            )}
                            {year && (
                                <span className="flex items-center gap-1">
                                    <CalendarIcon size={14} /> {year}
                                </span>
                            )}
                        </div>

                        {movie.genres?.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                {movie.genres.map((g) => (
                                    <Link href={`/genre/${g.id}`}
                                        key={g.id}
                                        className="border border-white/20 text-white text-xs px-3 py-1 rounded-full hover:border-amber-400 cursor-pointer transition-all"
                                    >
                                        {g.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-14">

                {cast.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-6">Cast</h2>
                        <Carousel className="w-full">
                            <CarouselContent className="-ml-3">
                                {cast.map((person) => (
                                    <Link href={`/person/${person.id}`} key={person.id}>
                                        <CarouselItem className="pl-3 basis-1/4 sm:basis-1/6 md:basis-[12%]">
                                            <div className="flex flex-col items-center gap-2 group">
                                                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#1f1f1f] shrink-0 ring-2 ring-transparent group-hover:ring-amber-400 transition-all">
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
                                                <p className="text-xs text-center text-white font-medium leading-tight line-clamp-2 group-hover:text-amber-400 transition-colors">
                                                    {person.name}
                                                </p>
                                                <p className="text-xs text-center text-gray-500 leading-tight line-clamp-2">
                                                    {person.character}
                                                </p>
                                            </div>
                                        </CarouselItem>
                                    </Link>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 bg-black hover:text-yellow-400" />
                            <CarouselNext className="right-2 bg-black hover:text-yellow-400" />
                        </Carousel>
                    </section>
                )}

                {videos.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-6">Trailers & Videos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {videos.map((video) => (
                                <a
                                    key={video.id}
                                    href={`https://www.youtube.com/watch?v=${video.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative rounded-xl overflow-hidden aspect-video bg-[#1f1f1f]"
                                >
                                    <Image
                                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                        alt={video.name}
                                        fill
                                        className="object-cover brightness-60 group-hover:brightness-75 transition"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center">
                                            <PlayIcon size={18} className="fill-white text-white ml-1" />
                                        </div>
                                    </div>
                                    <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-white px-2 line-clamp-1">
                                        {video.name}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                {reviews.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-6">Reviews</h2>
                        <div className="flex flex-col gap-4">
                            {reviews.map((review) => {
                                const isExpanded = expanded[review.id];
                                const isLong = review.content.length > 300;
                                return (
                                    <div key={review.id} className="bg-[#1a1a1a] rounded-xl p-5 flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-sm shrink-0">
                                                    {review.author[0].toUpperCase()}
                                                </div>
                                                <p className="font-semibold text-sm">{review.author}</p>
                                            </div>
                                            {review.author_details?.rating && (
                                                <span className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                                                    <StarIcon size={13} className="fill-yellow-400" />
                                                    {review.author_details.rating.toFixed(1)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {isExpanded || !isLong
                                                ? review.content
                                                : review.content.slice(0, 300) + "..."}
                                        </p>
                                        {isLong && (
                                            <button
                                                onClick={() => setExpanded((prev) => ({ ...prev, [review.id]: !isExpanded }))}
                                                className="text-yellow-400 text-sm text-left hover:underline"
                                            >
                                                {isExpanded ? "Show less" : "Read more"}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {similar.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-6">Similar Movies</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                            {similar.map((m, i) => (
                                <MovieCard
                                    key={m.id}
                                    title={m.title}
                                    img={m.poster_path}
                                    rating={m.vote_average}
                                    date={m.release_date?.slice(0, 4)}
                                />
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}