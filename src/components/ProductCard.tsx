"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    return (
        <div className="group relative flex flex-col bg-white overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlays */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                    <button
                        onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                        className="flex-1 bg-black text-white py-3 text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 hover:bg-neutral-800 transition-colors"
                    >
                        <ShoppingCart size={14} />
                        <span>Add to Cart</span>
                    </button>
                    <Link
                        href={`/product/${product.id}`}
                        className="w-12 bg-white text-black py-3 flex items-center justify-center hover:bg-neutral-100 transition-colors border border-neutral-200"
                    >
                        <Eye size={16} />
                    </Link>
                </div>

                {/* 3D Visual Badge */}
                {product.model3D && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-100 shadow-sm">
                        <span className="text-[10px] uppercase tracking-widest font-bold flex items-center">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                            3D Ready
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="py-4 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-medium text-neutral-900 group-hover:text-gold transition-colors">
                        <Link href={`/product/${product.id}`}>
                            {product.name}
                        </Link>
                    </h3>
                    <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">{product.category}</p>

                {/* Dynamic Color Dots */}
                <div className="flex space-x-1.5 mt-3">
                    {product.colors.map((color) => (
                        <div
                            key={color}
                            className="w-2.5 h-2.5 rounded-full border border-neutral-200"
                            style={{ backgroundColor: color === 'charcoal' ? '#36454F' : color === 'gold' ? '#D4AF37' : color }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
