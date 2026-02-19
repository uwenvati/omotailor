"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Instagram, Facebook, Twitter, MessageCircle, Mail, Phone } from 'lucide-react';
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

    const closeMenu = () => setIsMobileMenuOpen(false);

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
                    <Menu size={24} />
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

            {/* ===== MOBILE MENU ===== */}

            {/* Dark Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
                onClick={closeMenu}
            />

            {/* Slide-in Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-black z-[70] lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Close Button */}
                    <div className="flex justify-end p-5">
                        <button
                            onClick={closeMenu}
                            className="text-white hover:text-gold transition-colors p-1"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Separator */}
                    <div className="mx-6 border-t border-white/15" />

                    {/* Navigation Links */}
                    <nav className="flex flex-col py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className={`flex items-center gap-3 px-6 py-4 text-[18px] font-medium uppercase tracking-[2px] transition-all ${isActive(link.href)
                                    ? 'text-gold border-l-2 border-gold bg-white/5'
                                    : 'text-white hover:text-gold hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                                {link.badge && (
                                    <span className="bg-gold text-black text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 leading-none">
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Separator */}
                    <div className="mx-6 border-t border-white/15" />

                    {/* View Cart Button */}
                    <div className="px-6 py-5">
                        <Link
                            href="/cart"
                            onClick={closeMenu}
                            className="flex items-center justify-center gap-2 bg-gold text-black font-bold text-sm uppercase tracking-[2px] h-14 w-full hover:bg-white transition-colors"
                        >
                            <ShoppingBag size={18} />
                            View Cart {cartCount > 0 && `(${cartCount} ${cartCount === 1 ? 'item' : 'items'})`}
                        </Link>
                    </div>

                    {/* Separator */}
                    <div className="mx-6 border-t border-white/15" />

                    {/* Social Icons */}
                    <div className="flex items-center justify-center gap-4 py-6">
                        {[
                            { icon: Instagram, href: 'https://instagram.com/omotailor', label: 'Instagram' },
                            { icon: Facebook, href: 'https://facebook.com/omotailor', label: 'Facebook' },
                            { icon: Twitter, href: 'https://twitter.com/omotailor', label: 'Twitter' },
                            { icon: MessageCircle, href: 'https://wa.me/2349160002472', label: 'WhatsApp' },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-black transition-all"
                                aria-label={social.label}
                            >
                                <social.icon size={16} />
                            </a>
                        ))}
                    </div>

                    {/* Separator */}
                    <div className="mx-6 border-t border-white/15" />

                    {/* Contact Info */}
                    <div className="px-6 py-5 space-y-3">
                        <a href="mailto:support@omotailor.com" className="flex items-center gap-3 text-white/60 text-sm hover:text-gold transition-colors">
                            <Mail size={14} />
                            support@omotailor.com
                        </a>
                        <a href="tel:+2349160002472" className="flex items-center gap-3 text-white/60 text-sm hover:text-gold transition-colors">
                            <Phone size={14} />
                            +234 916 000 2472
                        </a>
                    </div>

                    {/* Footer / Copyright */}
                    <div className="mt-auto px-6 py-5">
                        <p className="text-white/30 text-xs">
                            © 2026 Omotailor. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
