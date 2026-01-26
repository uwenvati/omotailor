import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-luxury-black text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <img src="/assets/logo.png" alt="Omotailor" className="h-8 mb-6 brightness-0 invert" />
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                            Revolutionizing fashion with AI-powered 3D visualization. See the fit, feel the style, before you buy.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Featured</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Lookbook</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Connect</h4>
                        <div className="flex space-x-6 mb-8">
                            <Link href="#" className="text-neutral-400 hover:text-white transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="text-neutral-400 hover:text-white transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="text-neutral-400 hover:text-white transition-colors"><Facebook size={20} /></Link>
                        </div>
                        <p className="text-sm text-neutral-400">Join our newsletter for exclusive previews.</p>
                        <div className="mt-4 flex">
                            <input type="email" placeholder="email@example.com" className="bg-transparent border-b border-neutral-700 py-2 text-sm focus:outline-none focus:border-white transition-colors w-full" />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 uppercase tracking-widest">
                    <p>© 2026 Omotailor. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Crafted for Excellence</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
