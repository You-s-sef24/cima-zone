"use client";

import axios from "axios";
import { AwardIcon } from "lucide-react";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TopRatedSkeleton } from "./loaders/HomePageSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function TopRatedSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
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
    return <TopRatedSkeleton />;
  }

  return (
    <section className="mb-12">
      <h3 className="flex items-center font-bold gap-2">
        <span className="text-amber-400">
          <AwardIcon />
        </span>
        Top Rated
      </h3>
      <div className="relative px-0 my-4">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 p-3">
            {data?.map((movie, i) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4"
              >
                <MovieCard
                  rank={i + 1}
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
