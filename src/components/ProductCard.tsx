"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product, formatNaira } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1, product.sizes[0], product.colors[0].name);
    };

    const displayPrice = product.salePrice || product.price;

    return (
        <div className="group relative flex flex-col bg-white overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                {/* Quick Actions on Hover */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-black text-white py-3 text-xs uppercase tracking-widest font-medium flex items-center justify-center space-x-2 hover:bg-gold transition-colors"
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

                {/* Badge */}
                {product.badge && (
                    <div className={`absolute top-3 right-3 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold ${product.badge === 'Sale' ? 'bg-gold text-white' : 'bg-black text-white'
                        }`}>
                        {product.badge}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="pt-4 pb-2 flex flex-col">
                <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium text-neutral-900 group-hover:text-gold transition-colors line-clamp-2 mb-2">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 mb-2">
                    {product.salePrice ? (
                        <>
                            <span className="text-text-gray line-through text-sm">
                                {formatNaira(product.price)}
                            </span>
                            <span className="font-bold text-base">
                                {formatNaira(product.salePrice)}
                            </span>
                        </>
                    ) : (
                        <span className="font-bold text-base">
                            {formatNaira(product.price)}
                        </span>
                    )}
                </div>

                {/* Color Dots */}
                <div className="flex space-x-1.5 mt-1">
                    {product.colors.map((color) => (
                        <div
                            key={color.name}
                            className="w-3 h-3 rounded-full border border-neutral-200"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
