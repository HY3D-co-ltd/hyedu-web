import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({ children, href, variant = 'primary', size = 'md', className = '', onClick }: ButtonProps) {
  const classes = `inline-block rounded-lg font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button onClick={onClick} className={classes}>{children}</button>;
}
