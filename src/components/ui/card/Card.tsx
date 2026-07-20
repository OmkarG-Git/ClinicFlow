import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm" | "lg"
  variant?: "default" | "elevated" | "outlined" | "ghost"
  interactive?: boolean
}

function Card({
  className,
  size = "default",
  variant = "default",
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-2xl bg-card/90 backdrop-blur-sm text-sm text-card-foreground",
        "transition-all duration-300 ease-out",
        "relative isolate",
        "hover:shadow-xl hover:ring-foreground/10",
        "data-[size=sm]:[--card-spacing:--spacing(3)]",
        "data-[variant=ghost]:shadow-none data-[variant=ghost]:ring-0",
        "data-[variant=ghost]:bg-transparent data-[variant=ghost]:hover:bg-muted/30",
        interactive && "cursor-pointer hover:-translate-y-1",
        interactive && "hover:shadow-2xl hover:ring-primary/20",
        "has-data-[slot=card-footer]:pb-0",
        "has-[>img:first-child]:pt-0",
        "data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        "*:[img:first-child]:rounded-t-2xl *:[img:last-child]:rounded-b-2xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header",
        "grid auto-rows-min items-start gap-2",
        "rounded-t-2xl px-(--card-spacing) pt-(--card-spacing)",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        "[.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-lg leading-snug font-semibold tracking-tight",
        "group-data-[size=sm]/card:text-base",
        "group-data-[size=lg]/card:text-xl",
        "group-data-[variant=ghost]/card:text-foreground/80",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm leading-relaxed text-muted-foreground/80",
        "group-data-[size=sm]/card:text-xs",
        "group-data-[size=lg]/card:text-base",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        "flex items-center gap-1.5",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-(--card-spacing) pb-(--card-spacing)",
        "prose prose-sm max-w-none",
        "data-[size=lg]:prose-base",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-3 rounded-b-2xl",
        "border-t border-border/40",
        "bg-muted/30 px-(--card-spacing) py-(--card-spacing)",
        "backdrop-blur-sm",
        "group-data-[variant=ghost]/card:bg-transparent",
        "group-data-[variant=ghost]/card:border-border/20",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}