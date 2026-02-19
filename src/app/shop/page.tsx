"use client";

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, formatNaira } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = ['All', 'Agbada', 'Senator', 'Kaftan', 'Accessories'];
const PRICE_RANGES = [
    { label: 'Under ₦20,000', min: 0, max: 20000 },
    { label: '₦20,000 - ₦50,000', min: 20000, max: 50000 },
    { label: '₦50,000 - ₦100,000', min: 50000, max: 100000 },
    { label: 'Over ₦100,000', min: 100000, max: Infinity },
];
const SORT_OPTIONS = ['Featured', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low'];
const PRODUCTS_PER_PAGE = 12;

const ShopPage = () => {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [activeCategory, setActiveCategory] = useState<string>(
        categoryParam
            ? CATEGORIES.find(c => c.toLowerCase() === categoryParam.toLowerCase()) || 'All'
            : 'All'
    );
    const [activePriceRange, setActivePriceRange] = useState<number | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Featured');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (activePriceRange !== null) {
            const range = PRICE_RANGES[activePriceRange];
            result = result.filter(p => {
                const price = p.salePrice || p.price;
                return price >= range.min && price < range.max;
            });
        }

        switch (sortBy) {
            case 'Price: Low to High':
                result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
                break;
            case 'Price: High to Low':
                result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
                break;
            case 'Newest Arrivals':
                result.reverse();
                break;
        }

        return result;
    }, [activeCategory, activePriceRange, sortBy]);

    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredProducts.length;

    const clearAllFilters = () => {
        setActiveCategory('All');
        setActivePriceRange(null);
        setVisibleCount(PRODUCTS_PER_PAGE);
    };

    const hasActiveFilters = activeCategory !== 'All' || activePriceRange !== null;

    return (
        <div className="pt-28 pb-24">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 mb-8">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <span className="text-black font-bold">Shop</span>
                </nav>

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-6 md:space-y-0">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                            {activeCategory === 'All' ? 'All Products' : activeCategory}
                        </h1>
                        <p className="text-text-gray font-light mt-2">
                            Discover our complete collection of tailored Nigerian clothing
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden flex items-center space-x-2 text-xs font-bold uppercase tracking-widest border border-neutral-200 px-4 py-2.5 hover:bg-neutral-50 transition-colors"
                        >
                            <SlidersHorizontal size={16} />
                            <span>Filters</span>
                        </button>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest border border-neutral-200 px-4 py-2.5 hover:bg-neutral-50 transition-colors min-w-[220px] justify-between"
                            >
                                <span>Sort: {sortBy}</span>
                                <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isSortOpen && (
                                <div className="absolute right-0 top-full mt-1 w-full bg-white border border-neutral-100 shadow-xl z-20">
                                    {SORT_OPTIONS.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSortBy(option);
                                                setIsSortOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors ${sortBy === option ? 'bg-neutral-50 font-bold' : ''
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        <span className="text-xs text-text-gray uppercase tracking-widest">Active Filters:</span>
                        {activeCategory !== 'All' && (
                            <button
                                onClick={() => setActiveCategory('All')}
                                className="flex items-center gap-1 px-3 py-1 bg-neutral-100 text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                            >
                                {activeCategory} <X size={12} />
                            </button>
                        )}
                        {activePriceRange !== null && (
                            <button
                                onClick={() => setActivePriceRange(null)}
                                className="flex items-center gap-1 px-3 py-1 bg-neutral-100 text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                            >
                                {PRICE_RANGES[activePriceRange].label} <X size={12} />
                            </button>
                        )}
                        <button
                            onClick={clearAllFilters}
                            className="text-xs uppercase tracking-widest font-bold text-text-gray hover:text-black border-b border-text-gray hover:border-black transition-colors ml-2"
                        >
                            Clear All
                        </button>
                    </div>
                )}

                {/* Product count */}
                <div className="text-xs text-text-gray uppercase tracking-widest mb-8">
                    Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} products
                </div>

                <div className="flex gap-12">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-56 flex-shrink-0 space-y-10 sticky top-28 self-start">
                        {/* Categories */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[3px] mb-5">Categories</h4>
                            <div className="flex flex-col space-y-3">
                                {CATEGORIES.map((cat) => {
                                    const count = cat === 'All'
                                        ? products.length
                                        : products.filter(p => p.category === cat).length;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setActiveCategory(cat);
                                                setVisibleCount(PRODUCTS_PER_PAGE);
                                            }}
                                            className={`text-sm text-left transition-all ${activeCategory === cat
                                                ? 'text-black font-bold border-l-2 border-black pl-4'
                                                : 'text-text-gray hover:text-black hover:pl-2'
                                                }`}
                                        >
                                            {cat} ({count})
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[3px] mb-5">Price Range</h4>
                            <div className="flex flex-col space-y-3">
                                {PRICE_RANGES.map((range, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setActivePriceRange(activePriceRange === idx ? null : idx);
                                            setVisibleCount(PRODUCTS_PER_PAGE);
                                        }}
                                        className={`text-sm text-left transition-all ${activePriceRange === idx
                                            ? 'text-black font-bold border-l-2 border-gold pl-4'
                                            : 'text-text-gray hover:text-black hover:pl-2'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[3px] mb-5">Colors</h4>
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    { name: 'Black', hex: '#000000' },
                                    { name: 'White', hex: '#FFFFFF' },
                                    { name: 'Gold', hex: '#D4AF37' },
                                    { name: 'Navy', hex: '#000080' },
                                    { name: 'Brown', hex: '#8B4513' },
                                    { name: 'Cream', hex: '#FFFDD0' },
                                ].map((color) => (
                                    <button
                                        key={color.name}
                                        className="w-7 h-7 rounded-full border border-neutral-200 hover:scale-110 transition-transform hover:shadow-md"
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {visibleProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10">
                                    {visibleProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {hasMore && (
                                    <div className="text-center mt-16">
                                        <button
                                            onClick={() => setVisibleCount(prev => prev + PRODUCTS_PER_PAGE)}
                                            className="luxury-button-outline px-12 py-4"
                                        >
                                            Load More
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-24 text-center">
                                <p className="text-text-gray font-light text-lg mb-4">No products found matching your selection.</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="luxury-button"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`absolute right-0 top-0 bottom-0 w-80 bg-white p-8 transition-transform duration-500 overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-lg font-bold uppercase tracking-[3px]">Filters</h2>
                        <button onClick={() => setIsSidebarOpen(false)} aria-label="Close filters">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-10">
                        {/* Categories */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[3px] mb-4 text-text-gray">Categories</h4>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${activeCategory === cat
                                            ? 'bg-black text-white border-black'
                                            : 'border-neutral-200 hover:border-black'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[3px] mb-4 text-text-gray">Price Range</h4>
                            <div className="flex flex-col space-y-3">
                                {PRICE_RANGES.map((range, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActivePriceRange(activePriceRange === idx ? null : idx)}
                                        className={`text-sm text-left transition-all px-3 py-2 border ${activePriceRange === idx
                                            ? 'bg-black text-white border-black'
                                            : 'border-neutral-200 hover:border-black'
                                            }`}
                                    >
                                        {range.label}
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

export default function ShopPageWrapper() {
    return (
        <Suspense fallback={
            <div className="pt-40 pb-24 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full mx-auto" />
            </div>
        }>
            <ShopPage />
        </Suspense>
    );
}
