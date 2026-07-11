import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  return (
    <main className="min-h-[80vh] bg-zinc-950 pt-24 px-4">
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-5 mb-5 gap-4 md:gap-0">
        
        {/* Hero product 1 main skeleton */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 w-full md:w-4/6 h-[40vh] md:h-[70vh] md:mx-5 my-2 md:my-0 rounded-xl p-4">
          <Skeleton height="100%" baseColor="#18181b" highlightColor="#27272a" />
        </div>

        {/* Two random product skeletons */}
        <div className="md:w-2/6 w-full flex justify-evenly gap-4 md:block md:space-y-4 mr-5">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900/40 border border-zinc-800/80 w-full h-[28vh] md:h-[33.5vh] rounded-xl p-4"
            >
              <Skeleton height="100%" baseColor="#18181b" highlightColor="#27272a" />
            </div>
          ))}
        </div>
      </div>

      {/* Products carousel skeleton */}
      <div className="w-full overflow-x-auto">
        <div className="bg-zinc-950 flex space-x-4 flex-nowrap mb-5 px-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900/40 border border-zinc-800/80 md:min-w-[450px] min-w-[250px] h-[20vh] md:h-[30vh] rounded-xl p-4"
            >
              <Skeleton height="100%" baseColor="#18181b" highlightColor="#27272a" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
