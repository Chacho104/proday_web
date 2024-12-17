import { cn } from "@/lib/util";
import { forwardRef } from "react";

// A reusable button component which allows dynamic content to be passed in as label
// In screens larger than 1020px, button has a fixed width of 736px. In smaller screens,
// the button occupies 90% of available width
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          `bg-dark-blue hover:bg-light-blue p-4 rounded-lg text-button-text text-sm font-bold flex items-center justify-center gap-x-2 w-[90%] lg:w-[736px]`,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
