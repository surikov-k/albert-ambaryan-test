import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from './input';
import * as React from 'react';

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <Input
      className={className}
      {...props}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      suffix={
        showPassword ? (
          <EyeIcon
            className="cursor-pointer text-gray-300 select-none size-5"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <EyeOffIcon
            className="cursor-pointer text-gray-300 select-none size-5"
            onClick={() => setShowPassword(true)}
          />
        )
      }
    />
  );
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
