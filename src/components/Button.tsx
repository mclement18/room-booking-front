import React, { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...other }, ref) => {
    return (
      <button
        ref={ref}
        {...other}
        className={`
          border border-electric-green-700 px-1
          hover:bg-electric-green-600 hover:border-electric-green-400
          active:bg-electric-green-700 active:border-electric-green-500
          disabled:text-electric-green-600 disabled:border-electric-green-800 disabled:hover:bg-transparent
          disabled:hover:border-electric-green-800
          ${className === undefined ? '' : className}
        `}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
