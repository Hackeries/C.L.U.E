import * as React from "react"
import { cn } from "../../lib/utils"

const Dialog = ({ children, open, onOpenChange }) => {
  return open ? <div>{children}</div> : null
}

const DialogTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} className={cn(className)} {...props} />
))
DialogTrigger.displayName = "DialogTrigger"

const DialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("bg-white p-6 rounded-lg shadow-lg", className)} {...props} />
))
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("mb-4", className)} {...props} />
)

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
DialogTitle.displayName = "DialogTitle"

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle }
