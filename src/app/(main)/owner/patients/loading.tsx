import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { cn } from "@/lib/utils";

export default function PatientPageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* ====== HEADER SECTION ====== */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Left side - Icon, Heading, Subtitle */}
        <div className="flex items-start gap-3">
          {/* Icon skeleton */}
          <Skeleton className="h-12 w-12 rounded-xl bg-slate-700/50" />
          
          <div className="space-y-2">
            {/* Heading skeleton */}
            <Skeleton className="h-8 w-48 bg-slate-700/50" />
            {/* Subtitle skeleton */}
            <Skeleton className="h-4 w-32 bg-slate-700/50" />
          </div>
        </div>

        {/* Right side - Two buttons */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-28 rounded-lg bg-slate-700/50" />
          <Skeleton className="h-10 w-28 rounded-lg bg-slate-700/50" />
        </div>
      </div>

      {/* ====== TOOLBAR SECTION ====== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search bar skeleton */}
        <div className="flex-1 max-w-sm">
          <Skeleton className="h-11 w-full rounded-full bg-slate-700/50" />
        </div>
        
        {/* Filter skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-36 rounded-lg bg-slate-700/50" />
          <Skeleton className="h-10 w-10 rounded-lg bg-slate-700/50" />
        </div>
      </div>

      {/* ====== TABLE SECTION ====== */}
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/50 backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-slate-800/60 bg-slate-800/30 px-4 py-3">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24 bg-slate-700/50" />
            <Skeleton className="h-4 w-32 bg-slate-700/50" />
            <Skeleton className="h-4 w-28 bg-slate-700/50" />
            <Skeleton className="h-4 w-20 bg-slate-700/50" />
            <Skeleton className="h-4 w-16 bg-slate-700/50 ml-auto" />
          </div>
        </div>

        {/* Table Body - Multiple rows */}
        <div className="divide-y divide-slate-800/60">
          {/* Row 1 */}
          <div className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-10 w-10 rounded-full bg-slate-700/50" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-32 bg-slate-700/50" />
              <Skeleton className="h-3 w-24 bg-slate-700/50" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full bg-slate-700/50" />
            <Skeleton className="h-4 w-24 bg-slate-700/50" />
            <Skeleton className="h-4 w-16 bg-slate-700/50" />
            <Skeleton className="h-8 w-8 rounded-md bg-slate-700/50 ml-auto" />
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-10 w-10 rounded-full bg-slate-700/50" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-36 bg-slate-700/50" />
              <Skeleton className="h-3 w-20 bg-slate-700/50" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full bg-slate-700/50" />
            <Skeleton className="h-4 w-28 bg-slate-700/50" />
            <Skeleton className="h-4 w-20 bg-slate-700/50" />
            <Skeleton className="h-8 w-8 rounded-md bg-slate-700/50 ml-auto" />
          </div>

          {/* Row 3 */}
          <div className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-10 w-10 rounded-full bg-slate-700/50" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-28 bg-slate-700/50" />
              <Skeleton className="h-3 w-28 bg-slate-700/50" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full bg-slate-700/50" />
            <Skeleton className="h-4 w-20 bg-slate-700/50" />
            <Skeleton className="h-4 w-24 bg-slate-700/50" />
            <Skeleton className="h-8 w-8 rounded-md bg-slate-700/50 ml-auto" />
          </div>

          {/* Row 4 */}
          <div className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-10 w-10 rounded-full bg-slate-700/50" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-40 bg-slate-700/50" />
              <Skeleton className="h-3 w-16 bg-slate-700/50" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full bg-slate-700/50" />
            <Skeleton className="h-4 w-32 bg-slate-700/50" />
            <Skeleton className="h-4 w-20 bg-slate-700/50" />
            <Skeleton className="h-8 w-8 rounded-md bg-slate-700/50 ml-auto" />
          </div>

          {/* Row 5 */}
          <div className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-10 w-10 rounded-full bg-slate-700/50" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-32 bg-slate-700/50" />
              <Skeleton className="h-3 w-24 bg-slate-700/50" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full bg-slate-700/50" />
            <Skeleton className="h-4 w-24 bg-slate-700/50" />
            <Skeleton className="h-4 w-16 bg-slate-700/50" />
            <Skeleton className="h-8 w-8 rounded-md bg-slate-700/50 ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}