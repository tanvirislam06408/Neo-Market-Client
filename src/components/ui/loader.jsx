import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const loaderVariants = cva(
  "animate-spin text-primary",
  {
    variants: {
      size: {
        xs: "size-3.5",
        sm: "size-5",
        default: "size-8",
        lg: "size-10",
        xl: "size-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Loader({
  className,
  size = "default",
  text,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="loader"
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      {...props}
    >
      <Loader2
        data-slot="loader-icon"
        className={cn(loaderVariants({ size }))}
      />
      {text && (
        <p data-slot="loader-text" className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </Comp>
  )
}

function PageLoader({
  text = "Loading...",
  className,
  ...props
}) {
  return (
    <div
      data-slot="page-loader"
      className={cn("flex items-center justify-center min-h-[60vh]", className)}
      {...props}
    >
      <Loader size="xl" text={text} />
    </div>
  )
}

function Spinner({
  className,
  size = "default",
  ...props
}) {
  return (
    <Loader2
      data-slot="spinner"
      className={cn(loaderVariants({ size }), className)}
      {...props}
    />
  )
}

function LoadingOverlay({
  text = "Loading...",
  className,
  ...props
}) {
  return (
    <div
      data-slot="loading-overlay"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <Loader size="lg" text={text} />
    </div>
  )
}

export { Loader, PageLoader, Spinner, LoadingOverlay, loaderVariants }
