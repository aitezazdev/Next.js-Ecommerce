"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[90vh] bg-zinc-950 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-xl uppercase tracking-widest font-bold mb-3 text-white">Something went wrong</h1>
      <p className="mb-6 text-zinc-555 text-sm font-light">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-white text-zinc-950 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-zinc-200 cursor-pointer transition shadow-xl"
      >
        Try Again
      </button>
    </div>
  );
}
