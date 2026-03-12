import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  icon?: React.ElementType
  iconPosition?: "left" | "right"
}

function Input({
  className,
  type,
  icon: Icon,
  iconPosition = "right",
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">

      {Icon && iconPosition === "left" && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-8 w-full rounded-lg border border-border bg-white px-2.5 py-1 text-base outline-none transition",
          "placeholder:text-muted-foreground p-5",
          "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30",
          Icon && iconPosition === "left" && "pl-9",
          Icon && iconPosition === "right" && "pr-9",
          className
        )}
        {...props}
      />

      {Icon && iconPosition === "right" && (
        <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
      )}

    </div>
  )
}

export { Input }