"use client";

import axios from "axios";
import { FilmIcon } from "lucide-react";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NowPlayingSkeleton } from "./loaders/HomePageSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function NowPlayingSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["now-playing-movies"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      );
      return res.data.results;
    },
  });

  if (isLoading) {
    return <NowPlayingSkeleton />;
  }

  return (
    <section className="mb-12">
      <h3 className="flex items-center font-bold gap-2">
        <span className="text-red-600">
          <FilmIcon />
        </span>
        Now Playing
      </h3>
      <div className="relative px-0 my-4">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 p-3">
            {data?.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4"
              >
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  img={movie.poster_path}
                  rating={movie.vote_average}
                  date={movie.release_date.slice(0, 4)}
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
