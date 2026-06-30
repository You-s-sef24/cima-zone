import { PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ id, title, img, rating, date, rank }) {
  return (
    <Link href={`/movie/${id}`}>
      <div className="w-full flex flex-col gap-2 cursor-pointer group hover:scale-105 transition-all">
        <div className="relative rounded-xl overflow-hidden aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${img}`}
            alt={title}
            fill
            className="object-cover"
          />

          {rank && (
            <span className="absolute top-2 left-2 bg-black/60 text-yellow-400 font-bold text-sm px-2 py-0.5 rounded">
              #{rank}
            </span>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
            <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center">
              <PlayIcon />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0.5 px-0.5">
          <p className="text-white font-semibold text-sm leading-tight">
            {title}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 text-yellow-400">
              <StarIcon className="fill-amber-400" size={15} />{" "}
              {rating.toFixed(1)}
            </span>
            <span className="text-gray-400">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
