"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { HeroSkeleton } from "./loaders/HomePageSkeleton";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGJiODdmODViNDZhN2VlN2U0ZTdmNGM5MDE0OGQwYyIsIm5iZiI6MTc1NTI2MDc4Mi4yODcwMDAyLCJzdWIiOiI2ODlmMjc2ZWJmYWIyZDdlNTg1ZDJhNjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7c5eqGuW7C4e_JyHrcia32Y5Zbrut9aJhLzksC8NEZA";

export default function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.themoviedb.org/3/trending/movie/week", {
        headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
      })
      .then((res) => setMovie(res.data.results[0]))
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <HeroSkeleton />;
  }

  const year = movie.release_date?.slice(0, 4);
  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-end mb-12">
      <Image
        src={backdrop}
        alt={movie.title}
        fill
        className="object-cover object-top brightness-50"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-10 px-6 pb-12 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          {movie.title}
        </h1>

        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-yellow-400 font-semibold">
            <StarIcon size={16} className="fill-yellow-400" />
            {movie.vote_average?.toFixed(1)}
          </span>
          <span className="text-gray-300">{year}</span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
          {movie.overview}
        </p>

        <Link
          href={`/movie/${movie.id}`}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-6 py-3 rounded-full cursor-pointer w-45"
        >
          <PlayIcon size={16} className="fill-white" />
          View Details
        </Link>
      </div>
    </section>
  );
}
