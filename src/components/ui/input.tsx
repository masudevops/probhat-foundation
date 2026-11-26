import * as React from "react"
import { cn } from "@/lib/utils"

/** Shared look for text inputs, textareas and selects. */
export const fieldClass =
    "w-full rounded-2xl border border-brand-sand bg-brand-cream px-4 py-3 text-base text-brand-ink placeholder:text-brand-sage/60 transition-colors focus-visible:border-brand-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/40 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-600"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return <input type={type} className={cn(fieldClass, "h-12", className)} ref={ref} {...props} />
    }
)
Input.displayName = "Input"

export { Input }
