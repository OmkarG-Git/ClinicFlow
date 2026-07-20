import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  width?: number;
  height?: number;
  variant?: "light" | "dark";
  size?: "sm" | "default" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({
  width = 40,
  height = 40,
  variant = "dark",
  size = "default",
  showText = true,
  className,
}: LogoProps) {
  const sizes = {
    sm: {
      image: 32,
      title: "text-base",
      subtitle: "text-[10px]",
      gap: "gap-2",
    },
    default: {
      image: 40,
      title: "text-xl",
      subtitle: "text-xs",
      gap: "gap-3",
    },
    lg: {
      image: 48,
      title: "text-2xl",
      subtitle: "text-sm",
      gap: "gap-4",
    },
  };

  const currentSize = sizes[size];
  const textColor = variant === "light" ? "text-white" : "text-foreground";
  const subtitleColor = variant === "light" ? "text-white/60" : "text-muted-foreground";

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center",
        currentSize.gap,
        "group transition-opacity hover:opacity-80",
        className
      )}
    >
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Image
          src="/logo.png"
          alt="ClinicFlow"
          width={currentSize.image}
          height={currentSize.image}
          priority
          className="relative z-10 rounded-xl"
        />
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <h1
            className={cn(
              "font-bold tracking-tight truncate",
              currentSize.title,
              textColor
            )}
          >
            ClinicFlow
          </h1>
          <p
            className={cn(
              "truncate",
              currentSize.subtitle,
              subtitleColor
            )}
          >
            Clinic Management System
          </p>
        </div>
      )}
    </Link>
  );
}