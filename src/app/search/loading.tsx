import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  return (
    <div className="flex bg-zinc-950 min-h-[80vh] text-white py-5 pt-24 px-4">
      {}
      <aside className="hidden md:block px-4 pr-10 mr-7 w-40">
        <Skeleton height={16} width={100} baseColor="#18181b" highlightColor="#27272a" />
        <div className="flex flex-col py-2 space-y-2 mt-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={14} width={80} baseColor="#18181b" highlightColor="#27272a" />
          ))}
        </div>
      </aside>

      {}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/40">
            <Skeleton height={200} baseColor="#18181b" highlightColor="#27272a" />
            <Skeleton height={20} className="mt-4" baseColor="#18181b" highlightColor="#27272a" />
            <Skeleton height={20} width={60} className="mt-2" baseColor="#18181b" highlightColor="#27272a" />
            <Skeleton height={36} width={100} className="mt-4" baseColor="#18181b" highlightColor="#27272a" />
          </div>
        ))}
      </div>

      {}
      <aside className="hidden md:block px-8 w-40">
        <Skeleton height={16} width={80} baseColor="#18181b" highlightColor="#27272a" />
        <div className="flex flex-col py-2 space-y-2 mt-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} height={14} width={120} baseColor="#18181b" highlightColor="#27272a" />
          ))}
        </div>
      </aside>
    </div>
  );
}
