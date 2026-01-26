"use client";

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

const ShopPage = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Featured');

    const categories = ['All', 'Men', 'Women', 'Unisex'];

    const filteredProducts = useMemo(() => {
        let result = [...products];
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (sortBy === 'Price: Low-High') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Price: High-Low') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [activeCategory, sortBy]);

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Shop All</h1>
                        <p className="text-neutral-500 font-light max-w-md">
                            Discover our AI-enhanced collection of sustainable, minimalist essentials.
                        </p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden flex items-center space-x-2 text-sm font-bold uppercase tracking-widest border border-neutral-200 px-4 py-2 hover:bg-neutral-50 transition-colors"
                        >
                            <SlidersHorizontal size={16} />
                            <span>Filters</span>
                        </button>

                        <div className="relative group">
                            <button className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest border border-neutral-200 px-4 py-2 hover:bg-neutral-50 transition-colors min-w-[180px] justify-between">
                                <span>Sort by: {sortBy}</span>
                                <ChevronDown size={16} />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-full bg-white border border-neutral-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                {['Featured', 'New Arrivals', 'Price: Low-High', 'Price: High-Low'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setSortBy(option)}
                                        className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-12">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0 space-y-12">
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Categories</h4>
                            <div className="flex flex-col space-y-4">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`text-sm text-left transition-all ${activeCategory === cat ? 'text-black font-bold border-l-2 border-black pl-4' : 'text-neutral-500 hover:text-black hover:pl-2'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Price Range</h4>
                            <div className="space-y-4">
                                <input type="range" className="w-full accent-black" />
                                <div className="flex justify-between text-xs text-neutral-500 uppercase tracking-widest">
                                    <span>$0</span>
                                    <span>$500</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Sizes</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button key={size} className="border border-neutral-200 py-2 text-[10px] font-bold hover:border-black transition-colors uppercase">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Colors</h4>
                            <div className="flex flex-wrap gap-3">
                                {['black', 'white', 'gray', 'charcoal', 'gold'].map((color) => (
                                    <button
                                        key={color}
                                        className={`w-6 h-6 rounded-full border border-neutral-200 hover:scale-110 transition-transform`}
                                        style={{ backgroundColor: color === 'charcoal' ? '#36454F' : color === 'gold' ? '#D4AF37' : color }}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="py-24 text-center">
                                <p className="text-neutral-500 font-light">No products found matching your selection.</p>
                                <button
                                    onClick={() => setActiveCategory('All')}
                                    className="mt-6 text-sm font-bold uppercase tracking-widest border-b border-black"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`absolute right-0 top-0 bottom-0 w-80 bg-white p-8 transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-xl font-bold uppercase tracking-widest">Filters</h2>
                        <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
                    </div>

                    <div className="space-y-10">
                        {/* Mobile filter content (simplified) */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-neutral-400">Categories</h4>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-black text-white border-black' : 'border-neutral-200'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="w-full luxury-button mt-8"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
