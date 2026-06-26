import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', fullWidth, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-150 whitespace-nowrap border-2',
        variant === 'primary' && 'bg-primary text-white border-primary hover:bg-primary-hover hover:border-primary-hover',
        variant === 'outline' && 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
