import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
    {
        variants: {
            variant: {
                default: "bg-brand-amber text-brand-forest shadow-sm hover:bg-brand-gold",
                secondary: "bg-brand-forest text-brand-ivory hover:bg-brand-pine",
                outline: "border border-brand-amber/70 bg-transparent text-brand-pine hover:bg-brand-amber/10",
                outlineLight: "border border-brand-amber/70 bg-white/5 text-brand-ivory hover:bg-white/10",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                ghost: "text-brand-pine hover:bg-brand-amber/10",
                link: "text-brand-pine underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-6",
                sm: "h-9 px-4",
                lg: "h-14 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

export function Container({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8", className)}
            {...props}
        >
            {children}
        </div>
    )
}

const sectionTones = {
    cream: "bg-brand-cream text-brand-ink",
    white: "bg-white text-brand-ink",
    ivory: "bg-brand-ivory text-brand-ink",
    forest: "bg-brand-forest text-brand-ivory",
}

export function Section({
    className,
    children,
    tone = "cream",
    ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: keyof typeof sectionTones }) {
    return (
        <section className={cn("py-16 md:py-20 lg:py-24", sectionTones[tone], className)} {...props}>
            {children}
        </section>
    )
}
