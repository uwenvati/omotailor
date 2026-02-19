"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks: { href: string; label: string; badge?: string }[] = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/ai-try-on', label: 'AI Try-On', badge: 'Soon' },
    { href: '/contact', label: 'Contact' },
];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.1)] py-3'
                : 'bg-white py-5'
                }`}
        >
            <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
                    <img
                        src="/assets/small-logo.svg"
                        alt="Omotailor"
                        className="h-10 w-auto object-contain lg:hidden"
                    />
                    <img
                        src="/assets/logo.svg"
                        alt="Omotailor"
                        className="hidden lg:block h-12 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link text-[13px] uppercase tracking-[2px] pb-1 transition-colors font-medium flex items-center gap-1.5 ${isActive(link.href) ? 'active text-black' : 'text-neutral-600 hover:text-black'
                                }`}
                        >
                            {link.label}
                            {link.badge && (
                                <span className="bg-gold text-white text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 leading-none">
                                    {link.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Right Section */}
                <div className="flex items-center space-x-4 lg:space-x-6">
                    <button className="p-2 hover:text-gold transition-colors" aria-label="Search">
                        <Search size={20} />
                    </button>
                    <Link href="/cart" className="p-2 hover:text-gold transition-colors relative" aria-label="Shopping cart">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black z-40 transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-3xl uppercase tracking-[4px] font-light transition-colors flex items-center gap-3 ${isActive(link.href) ? 'text-gold' : 'text-white hover:text-gold'
                                }`}
                        >
                            {link.label}
                            {link.badge && (
                                <span className="bg-gold text-black text-[9px] uppercase tracking-wider font-bold px-2 py-1 leading-none">
                                    {link.badge}
                                </span>
                            )}
                        </Link>
                    ))}

                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={28} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
