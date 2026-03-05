import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MessageCircle } from 'lucide-react';

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52V6.75a4.81 4.81 0 0 1-1-.06z" />
    </svg>
);


const Footer = () => {
    return (
        <footer className="border-t border-border-elegant">
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
                            <li>
                                <Link href="/ai-try-on" className="hover:text-black transition-colors flex items-center gap-1.5">
                                    AI Virtual Try-On
                                    <span className="bg-gold text-white text-[8px] uppercase tracking-wider font-bold px-1 py-0.5 leading-none">Soon</span>
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
                                href="https://instagram.com/omotailor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://facebook.com/omotailorlondon1967"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="https://tiktok.com/@omotailorlondon"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                aria-label="TikTok"
                            >
                                <TikTokIcon size={18} />
                            </a>
                            <a
                                href="https://wa.me/2347061024594?text=Hello!%20I%20have%20a%20question%20about%20your%20products."
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
                            <a href="mailto:omotailorlondon@gmail.com" className="flex items-center space-x-2 hover:text-black transition-colors">
                                <Mail size={14} />
                                <span>omotailorlondon@gmail.com</span>
                            </a>
                            <a href="tel:+2347061024594" className="flex items-center space-x-2 hover:text-black transition-colors">
                                <Phone size={14} />
                                <span>0706 102 4594</span>
                            </a>
                            <a href="tel:+2348156952012" className="flex items-center space-x-2 hover:text-black transition-colors">
                                <Phone size={14} />
                                <span>0815 695 2012</span>
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
