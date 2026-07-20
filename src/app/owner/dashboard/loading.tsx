import { PageContainer } from "@/components/common/layout/PageContainer";

function Skeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-neutral-800/70 ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <PageContainer>
      {/* Hero */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-3 h-4 w-96" />

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
          >
            <Skeleton className="h-5 w-28" />
            <Skeleton className="mt-6 h-10 w-20" />
            <Skeleton className="mt-4 h-4 w-32" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-6 h-72 w-full rounded-xl" />
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-6 h-72 w-full rounded-xl" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 xl:col-span-2">
          <Skeleton className="h-6 w-40" />

          <div className="mt-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4"
              >
                <Skeleton className="h-12 w-12 rounded-full" />

                <div className="flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="mt-2 h-3 w-32" />
                </div>

                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <Skeleton className="h-6 w-32" />

          <div className="mt-6 space-y-5">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}