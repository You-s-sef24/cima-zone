"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { CalendarIcon, GlobeIcon, ExternalLinkIcon, StarIcon } from "lucide-react";
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "@/app/Components/MovieCard";
import PersonPageSkeleton from "@/app/Components/loaders/PersonPageSkeleton";
import Link from "next/link";

const TMDB_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGJiODdmODViNDZhN2VlN2U0ZTdmNGM5MDE0OGQwYyIsIm5iZiI6MTc1NTI2MDc4Mi4yODcwMDAyLCJzdWIiOiI2ODlmMjc2ZWJmYWIyZDdlNTg1ZDJhNjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7c5eqGuW7C4e_JyHrcia32Y5Zbrut9aJhLzksC8NEZA";

const IMG = "https://image.tmdb.org/t/p/w500";

export default function PersonPage() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const headers = { Authorization: `Bearer ${TMDB_TOKEN}` };

        Promise.all([
            axios.get(`https://api.themoviedb.org/3/person/${id}`, { headers }),
            axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits`, { headers }),
            axios.get(`https://api.themoviedb.org/3/person/${id}/images`, { headers }),
        ])
            .then(([personRes, creditsRes, imagesRes]) => {
                setPerson(personRes.data);
                setCredits(creditsRes.data.cast || []);
                setImages(imagesRes.data.profiles?.slice(0, 8) || []);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <PersonPageSkeleton />
    }

    if (!person) return null;

    const externalIds = person.external_ids || {};
    const birthday = person.birthday
        ? new Date(person.birthday).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : null;

    const knownFor = [...credits]
        .filter((c) => c.poster_path)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10);

    const filmography = [...credits]
        .sort((a, b) => {
            const dateA = a.release_date || a.first_air_date || "";
            const dateB = b.release_date || b.first_air_date || "";
            return dateB.localeCompare(dateA);
        });

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-14">

                <div className="flex flex-col md:flex-row gap-10">
                    {person.profile_path && (
                        <div className="shrink-0 w-full max-w-[200px] md:w-[280px] rounded-xl overflow-hidden">
                            <Image
                                src={`${IMG}${person.profile_path}`}
                                alt={person.name}
                                width={280}
                                height={420}
                                className="object-cover w-full"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl md:text-5xl font-bold">{person.name}</h1>

                        <div className="flex items-center gap-4 flex-wrap text-sm text-gray-300">
                            {person.known_for_department && (
                                <span className="text-yellow-400 font-semibold">{person.known_for_department}</span>
                            )}
                            {birthday && (
                                <span className="flex items-center gap-1">
                                    <CalendarIcon size={14} /> {birthday}
                                </span>
                            )}
                            {person.place_of_birth && (
                                <span className="flex items-center gap-1">
                                    <GlobeIcon size={14} /> {person.place_of_birth}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {person.imdb_id && (
                                <a
                                    href={`https://www.imdb.com/name/${person.imdb_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-yellow-400 text-black text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-yellow-300 transition"
                                >
                                    IMDb <ExternalLinkIcon size={13} />
                                </a>
                            )}
                            {externalIds.instagram_id && (
                                <a
                                    href={`https://instagram.com/${externalIds.instagram_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-[#1f1f1f] flex items-center justify-center hover:bg-[#2a2a2a] transition"
                                >
                                    IG
                                </a>
                            )}
                            {externalIds.twitter_id && (
                                <a
                                    href={`https://twitter.com/${externalIds.twitter_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-[#1f1f1f] flex items-center justify-center hover:bg-[#2a2a2a] transition"
                                >
                                    TW
                                </a>
                            )}
                        </div>

                        {person.biography && (
                            <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                                {person.biography}
                            </p>
                        )}
                    </div>
                </div >

                {
                    knownFor.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold mb-6">Known For</h2>
                            <Carousel className="w-full">
                                <CarouselContent className="-ml-1">
                                    {knownFor.map((item) => (
                                        <CarouselItem key={`${item.id}-${item.credit_id}`} className="basis-1/3 pl-1 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                                            <MovieCard
                                                id={item.id}
                                                title={item.title || item.name}
                                                img={item.poster_path}
                                                rating={item.vote_average}
                                                date={(item.release_date || item.first_air_date)?.slice(0, 4)}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2 bg-black hover:text-yellow-400" />
                                <CarouselNext className="right-2 bg-black hover:text-yellow-400" />
                            </Carousel>
                        </section>
                    )
                }

                {
                    filmography.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold mb-4">Filmography</h2>
                            <div className="border border-white/10 rounded-xl overflow-hidden">
                                {filmography.map((item, i) => {
                                    const year = (item.release_date || item.first_air_date)?.slice(0, 4);
                                    const isTV = item.media_type === "tv";
                                    return (
                                        <Link href={`/movie/${item.id}`}
                                            key={`${item.id}-${item.credit_id}`}
                                            className={`flex items-center justify-between px-5 py-3 text-sm ${i !== 0 ? "border-t border-white/5" : ""} hover:bg-white/5 transition`}
                                        >
                                            <div className="flex items-center gap-6">
                                                <span className="text-gray-500 w-10 shrink-0">{year || "—"}</span>
                                                <span className="text-white font-medium">{item.title || item.name}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {item.character && (
                                                    <span className="text-gray-500 hidden sm:block">{item.character}</span>
                                                )}
                                                {item.vote_average > 0 && (
                                                    <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                                                        <StarIcon size={12} className="fill-yellow-400" />
                                                        {item.vote_average.toFixed(1)}
                                                    </span>
                                                )}
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isTV ? "bg-blue-600" : "bg-red-600"}`}>
                                                    {isTV ? "TV" : "Film"}
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )
                }

                {images.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-6">Photos</h2>
                        <Carousel className="w-full">
                            <CarouselContent className="-ml-2">
                                {images.map((img, i) => (
                                    <CarouselItem key={i} className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                                        <div className="rounded-xl overflow-hidden">
                                            <Image
                                                src={`${IMG}${img.file_path}`}
                                                alt={`${person.name} photo ${i + 1}`}
                                                width={180}
                                                height={270}
                                                className="object-cover w-full hover:scale-105 transition-all"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden sm:block left-2 bg-black hover:text-yellow-400" />
                            <CarouselNext className="hidden sm:block right-2 bg-black hover:text-yellow-400" />
                        </Carousel>
                    </section>
                )}

            </div >
        </div >
    );
}