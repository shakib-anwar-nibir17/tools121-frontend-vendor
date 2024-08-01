"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "/lib/utils";

const Progress = React.forwardRef(
  ({ className, fill = "#0d6efd", vertical = false, value, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        vertical
          ? "relative h-full w-6 overflow-hidden rounded-md bg-slate-200"
          : "relative h-4 w-full overflow-hidden rounded-md bg-slate-200",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1  transition-all`}
        style={{
          transform: vertical
            ? `translateY(${100 - (value || 0)}%)`
            : `translateX(-${100 - (value || 0)}%)`,
          background: `${fill}`,
        }}
      />
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
