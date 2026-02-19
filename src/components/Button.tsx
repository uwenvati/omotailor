import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'gold';
    size?: 'small' | 'medium' | 'large';
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    href,
    onClick,
    disabled = false,
    className = '',
    type = 'button',
    fullWidth = false,
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center uppercase font-medium transition-all duration-300 tracking-[1.5px] text-center disabled:opacity-50 disabled:cursor-not-allowed';

    const variants: Record<string, string> = {
        primary: 'bg-black text-white hover:bg-gold',
        secondary: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white',
        outline: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
        white: 'bg-white text-black hover:bg-gold hover:text-white',
        gold: 'bg-gold text-white hover:bg-black',
    };

    const sizes: Record<string, string> = {
        small: 'px-5 py-2 text-xs',
        medium: 'px-8 py-3.5 text-sm',
        large: 'px-12 py-4.5 text-base',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={classes}
        >
            {children}
        </button>
    );
};

export default Button;
