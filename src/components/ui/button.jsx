import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-[#f42c37] to-[#c81e28] text-white shadow-lg shadow-red-500/25 hover:from-[#ff3b46] hover:to-[#dd232e] hover:shadow-red-500/40 hover:-translate-y-0.5',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-border/80 bg-background/50 hover:bg-accent hover:text-accent-foreground backdrop-blur-sm',
        secondary:
          'bg-secondary/80 text-secondary-foreground hover:bg-secondary border border-border/50 hover:-translate-y-0.5 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        executive:
          'border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:-translate-y-0.5',
      },
      size: {
        default: 'h-11 px-6 py-2.5 font-semibold text-sm',
        sm: 'h-9 px-4 text-xs font-semibold',
        lg: 'h-13 px-8 text-base font-semibold',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
