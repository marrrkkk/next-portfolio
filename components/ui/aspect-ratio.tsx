import * as React from "react";
import { cn } from "@/lib/utils";

export function AspectRatio({ ratio = 1, className, ...props }: React.ComponentProps<"div"> & { ratio?: number }) {
  return <div data-slot="aspect-ratio" className={cn("relative w-full", className)} style={{ aspectRatio: ratio }} {...props} />;
}
