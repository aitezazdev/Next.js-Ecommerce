import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="bg-zinc-950 min-h-[90vh] w-full pt-28 pb-12 flex items-center justify-center px-4">
      <div className="bg-zinc-900/40 border border-zinc-800 w-full sm:w-[420px] rounded-2xl p-6 sm:p-10 shadow-2xl">
        {/* Title */}
        <Skeleton
          height={40}
          width="70%"
          baseColor="#18181b"
          highlightColor="#27272a"
          className="mx-auto mb-3"
        />

        {/* Subtitle */}
        <Skeleton
          height={20}
          width="90%"
          baseColor="#18181b"
          highlightColor="#27272a"
          className="mx-auto mb-5"
        />

        {/* Form fields like password or name */}
        <div className="flex flex-col gap-4 mb-4">
          <Skeleton
            height={45}
            baseColor="#18181b"
            highlightColor="#27272a"
            className="rounded-xl"
          />
          <Skeleton
            height={45}
            baseColor="#18181b"
            highlightColor="#27272a"
            className="rounded-xl"
          />
        </div>

        {/* Button */}
        <Skeleton
          height={50}
          baseColor="#18181b"
          highlightColor="#27272a"
          className="rounded-full mb-3"
        />

        {/* Bottom link */}
        <Skeleton
          height={20}
          width="60%"
          baseColor="#18181b"
          highlightColor="#27272a"
          className="mx-auto"
        />
      </div>
    </div>
  );
}
