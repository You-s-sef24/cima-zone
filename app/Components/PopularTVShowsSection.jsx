"use client";

import axios from "axios";
import { TvIcon } from "lucide-react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PopularTVShowsSkeleton } from "./loaders/HomePageSkeleton";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGJiODdmODViNDZhN2VlN2U0ZTdmNGM5MDE0OGQwYyIsIm5iZiI6MTc1NTI2MDc4Mi4yODcwMDAyLCJzdWIiOiI2ODlmMjc2ZWJmYWIyZDdlNTg1ZDJhNjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7c5eqGuW7C4e_JyHrcia32Y5Zbrut9aJhLzksC8NEZA";

export default function PopularTVShowsSectionSection() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.themoviedb.org/3/tv/popular", {
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      })
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <PopularTVShowsSkeleton />;
  }
  return (
    <section className="mb-12">
      <h3 className="flex items-center font-bold gap-2">
        <span className="text-red-600">
          <TvIcon />
        </span>
        Popular TV Shows
      </h3>
      <div className="relative px-0 my-4">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 p-3">
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4"
              >
                <MovieCard
                  id={movie.id}
                  title={movie.name}
                  img={movie.poster_path}
                  rating={movie.vote_average}
                  date={movie.first_air_date?.slice(0, 4)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-black hover:text-amber-400" />
          <CarouselNext className="right-2 bg-black hover:text-amber-400" />
        </Carousel>
      </div>
    </section>
  );
}
