import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizes = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function PageContainer({
  children,
  className,
  size = "xl",
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "w-full ",
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}