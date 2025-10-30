import * as React from "react"
import { cn } from "../../lib/utils"

const Switch = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    ref={ref}
    className={cn(
      "inline-flex h-6 w-11 items-center rounded-full transition-colors",
      checked ? "bg-primary" : "bg-gray-300",
      className
    )}
    onClick={() => onCheckedChange?.(!checked)}
    {...props}
  >
    <span
      className={cn(
        "inline-block h-4 w-4 rounded-full bg-white transition-transform",
        checked ? "translate-x-6" : "translate-x-1"
      )}
    />
  </button>
))
Switch.displayName = "Switch"

export { Switch }
