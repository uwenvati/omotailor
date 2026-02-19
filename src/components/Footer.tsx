import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-border-elegant">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 pb-8">
                {/* Logo */}
                <div className="mb-12">
                    <Link href="/">
                        <img src="/assets/small-logo.svg" alt="Omotailor" className="h-10 mb-4 object-contain" />
                    </Link>
                    <p className="text-text-gray text-sm leading-relaxed max-w-sm">
                        Celebrating Nigerian elegance through bespoke tailored clothing. Where tradition meets modern sophistication.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                    {/* Shop */}
                    <div>
                        <h4 className="text-sm uppercase tracking-[3px] font-bold mb-6">Shop</h4>
                        <ul className="space-y-3 text-sm text-text-gray">
                            <li>
                                <Link href="/shop" className="hover:text-black transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=Agbada" className="hover:text-black transition-colors">
                                    Agbada
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=Senator" className="hover:text-black transition-colors">
                                    Senator
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=Kaftan" className="hover:text-black transition-colors">
                                    Kaftan
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=Accessories" className="hover:text-black transition-colors">
                                    Accessories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="text-sm uppercase tracking-[3px] font-bold mb-6">Customer Care</h4>
                        <ul className="space-y-3 text-sm text-text-gray">
                            <li>
                                <Link href="/contact" className="hover:text-black transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact#faq" className="hover:text-black transition-colors">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact#faq" className="hover:text-black transition-colors">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact#faq" className="hover:text-black transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact#faq" className="hover:text-black transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h4 className="text-sm uppercase tracking-[3px] font-bold mb-6">Follow Us</h4>
                        <div className="flex space-x-4 mb-6">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="https://wa.me/2341234567890?text=Hello!%20I%20have%20a%20question%20about%20your%20products."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-border-elegant flex items-center justify-center text-text-gray hover:bg-gold hover:text-white hover:border-gold transition-all"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle size={18} />
                            </a>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm text-text-gray">
                            <a href="mailto:info@omotailor.com" className="flex items-center space-x-2 hover:text-black transition-colors">
                                <Mail size={14} />
                                <span>info@omotailor.com</span>
                            </a>
                            <a href="tel:+2341234567890" className="flex items-center space-x-2 hover:text-black transition-colors">
                                <Phone size={14} />
                                <span>+234-123-456-7890</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-border-elegant flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400 uppercase tracking-[2px]">
                    <p>© 2026 Omotailor. All rights reserved.</p>
                    <p className="mt-3 md:mt-0">Crafted with Heritage</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
