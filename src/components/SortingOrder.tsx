"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

const SortingOrder = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const createSortLink = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }
    return `${pathname}?${params.toString()}`;
  };

  const options = [
    { value: "", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <aside className="w-full md:w-auto md:px-8 shrink-0">
      {/* Desktop view */}
      <div className="hidden md:block">
        <strong className="text-zinc-550 uppercase tracking-widest text-[10px] font-bold block mb-3">Sort by</strong>
        <div className="flex flex-col space-y-2">
          {options.map((opt) => {
            const isActive = currentSort === opt.value;
            return (
              <Link
                key={opt.value}
                className={`text-xs uppercase tracking-wider transition-colors duration-250 ${
                  isActive ? "text-white font-semibold" : "text-zinc-450 hover:text-white"
                }`}
                href={createSortLink(opt.value)}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile view: horizontal scroll of pills */}
      <div className="md:hidden px-4 mb-6 overflow-x-auto scrollbar-none flex gap-2 w-full py-1">
        {options.map((opt) => {
          const isActive = currentSort === opt.value;
          return (
            <Link
              key={opt.value}
              className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border transition-all shrink-0 ${
                isActive
                  ? "bg-white text-zinc-950 border-white shadow-md"
                  : "bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-zinc-700"
              }`}
              href={createSortLink(opt.value)}
            >
              {opt.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default SortingOrder;
