"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-elegant py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
                    <img src="/assets/logo.png" alt="Omotailor" className="h-8 lg:h-10 w-auto object-contain" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-10">
                    <Link href="/" className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium">Home</Link>
                    <Link href="/shop" className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium">Shop</Link>
                    <Link href="#" className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium">About</Link>
                    <Link href="#" className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium">Contact</Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-4 lg:space-x-6">
                    <button className="p-2 hover:text-gold transition-colors">
                        <Search size={20} />
                    </button>
                    <button className="hidden sm:block p-2 hover:text-gold transition-colors relative">
                        <Heart size={20} />
                    </button>
                    <Link href="/cart" className="p-2 hover:text-gold transition-colors relative">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-10">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl uppercase tracking-widest font-bold">Home</Link>
                    <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl uppercase tracking-widest font-bold">Shop</Link>
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl uppercase tracking-widest font-bold">About</Link>
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl uppercase tracking-widest font-bold">Contact</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
