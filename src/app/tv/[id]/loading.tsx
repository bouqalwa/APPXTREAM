export default function TVLoading() {
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      {/* Navbar skeleton */}
      <div className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="h-8 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="h-9 w-48 animate-pulse rounded-md bg-zinc-800" />
        </div>
      </div>

      {/* Detail skeleton */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-12 pt-28 md:grid-cols-[300px_1fr] md:px-8">
        <div className="col-span-full">
          <div className="h-4 w-16 animate-pulse rounded bg-zinc-800" />
        </div>
        <div className="h-[450px] w-full animate-pulse rounded-lg bg-zinc-800" />
        <div className="space-y-4">
          <div className="h-10 w-72 animate-pulse rounded bg-zinc-800" />
          <div className="flex gap-3">
            <div className="h-6 w-16 animate-pulse rounded bg-zinc-800" />
            <div className="h-6 w-16 animate-pulse rounded bg-zinc-800" />
            <div className="h-6 w-24 animate-pulse rounded bg-zinc-800" />
          </div>
          <div className="flex gap-2">
            <div className="h-7 w-20 animate-pulse rounded-full bg-zinc-800" />
            <div className="h-7 w-24 animate-pulse rounded-full bg-zinc-800" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
            <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
          </div>
          <div className="flex gap-3">
            <div className="h-11 w-36 animate-pulse rounded-lg bg-zinc-800" />
            <div className="h-11 w-44 animate-pulse rounded-lg bg-zinc-800" />
            <div className="h-11 w-36 animate-pulse rounded-lg bg-zinc-800" />
          </div>
          {/* Episode list skeleton */}
          <div className="mt-4 space-y-2">
            <div className="h-6 w-40 animate-pulse rounded bg-zinc-800" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 w-full animate-pulse rounded-lg bg-zinc-800/50" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
