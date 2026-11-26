import * as React from "react"
import { cn } from "@/lib/utils"
import { fieldClass } from "@/components/ui/input"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return <textarea className={cn(fieldClass, "min-h-[140px] resize-y", className)} ref={ref} {...props} />
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
