import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="w-full min-h-screen p-4 pt-24 pb-12 sm:p-6 md:p-10 bg-zinc-950 flex flex-col md:flex-row gap-6 md:gap-10">
      {/* Product image skeleton */}
      <div className="relative w-full md:w-2/3 h-72 sm:h-96 md:h-[80vh] bg-zinc-900/10 border border-zinc-800 rounded-2xl p-2">
        <Skeleton
          height="100%"
          baseColor="#18181b"
          highlightColor="#27272a"
          className="rounded-2xl"
        />
      </div>

      {/* Product details skeleton */}
      <div className="w-full md:w-1/3 text-white flex flex-col justify-center gap-4 sm:gap-5 mt-6 md:mt-20">
        {/* Title */}
        <Skeleton
          width="70%"
          height={40}
          baseColor="#18181b"
          highlightColor="#27272a"
          className="rounded-lg"
        />

        {/* Price */}
        <Skeleton
          width={100}
          height={30}
          baseColor="#18181b"
          highlightColor="#27272a"
          className="rounded-full"
        />

        {/* border */}
        <Skeleton
          width="100%"
          height={1}
          baseColor="#18181b"
          highlightColor="#27272a"
        />

        {/* Description */}
        <Skeleton
          count={3}
          baseColor="#18181b"
          highlightColor="#27272a"
          className="rounded-lg"
        />

        {/* btn Sizes */}
        <div>
          <Skeleton
            width={80}
            height={20}
            baseColor="#18181b"
            highlightColor="#27272a"
            className="rounded-lg"
          />
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                width={56}
                height={32}
                baseColor="#18181b"
                highlightColor="#27272a"
                className="rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Add to Cart button */}
        <Skeleton
          width={180}
          height={48}
          baseColor="#18181b"
          highlightColor="#27272a"
          className="rounded-full"
        />
      </div>
    </div>
  );
}
