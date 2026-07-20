import { Card, CardContent, CardHeader } from "@/components/ui/card/Card";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export default function Loading() {
  return (
    <Card className="border-border/60 shadow-xl">
      <CardHeader className="space-y-4">
        <Skeleton className="mx-auto h-8 w-48" />
        <Skeleton className="mx-auto h-4 w-64" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-11 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>

        <Skeleton className="ml-auto h-4 w-32" />

        <Skeleton className="h-11 w-full" />
      </CardContent>
    </Card>
  );
}