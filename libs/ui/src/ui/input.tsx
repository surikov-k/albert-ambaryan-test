import { cn } from '@albert-ambaryan/helpers';
import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ suffix, className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-12',
            className,
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="absolute right-0 top-0 size-9 flex items-center justify-center">
            {suffix}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
