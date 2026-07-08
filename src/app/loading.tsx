export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      {/* Navbar skeleton */}
      <div className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="h-8 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="hidden gap-6 md:flex">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-20 animate-pulse rounded bg-zinc-800" />
            ))}
          </div>
          <div className="h-9 w-48 animate-pulse rounded-md bg-zinc-800" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="relative h-[80vh] min-h-[560px] w-full animate-pulse bg-zinc-900">
        <div className="absolute bottom-20 left-8 space-y-4">
          <div className="h-4 w-20 rounded bg-zinc-800" />
          <div className="h-12 w-80 rounded bg-zinc-800" />
          <div className="flex gap-3">
            <div className="h-4 w-16 rounded bg-zinc-800" />
            <div className="h-4 w-16 rounded bg-zinc-800" />
            <div className="h-4 w-16 rounded bg-zinc-800" />
          </div>
          <div className="h-16 w-96 rounded bg-zinc-800" />
          <div className="flex gap-3">
            <div className="h-12 w-28 rounded bg-zinc-800" />
            <div className="h-12 w-28 rounded bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* Row skeletons */}
      {[1, 2, 3].map((row) => (
        <div key={row} className="px-4 py-8 md:px-8">
          <div className="mb-4 h-7 w-48 animate-pulse rounded bg-zinc-800" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-[270px] w-[180px] shrink-0 animate-pulse rounded-md bg-zinc-800 md:h-[300px] md:w-[200px]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
