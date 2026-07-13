import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outlineLight' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) => {
  const variantClasses: Record<string, string> = {
    primary: 'bg-copper text-porcelain-paper shadow-card hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:shadow-card',
    secondary: 'bg-espresso text-porcelain-paper hover:bg-espresso-2 hover:-translate-y-0.5 active:translate-y-0',
    outline: 'bg-transparent border border-ink/25 text-ink hover:border-copper hover:text-copper hover:-translate-y-0.5 active:translate-y-0',
    outlineLight: 'bg-transparent border border-porcelain-paper/35 text-porcelain-paper hover:border-copper-glow hover:text-copper-glow hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'bg-transparent text-ink hover:text-copper px-0'
  };
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-[0.95rem] rounded-lg',
    lg: 'px-8 py-4 text-base rounded-xl'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClasses[variant]} ${variant === 'ghost' ? '' : sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};
