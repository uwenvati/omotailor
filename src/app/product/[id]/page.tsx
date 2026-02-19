"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { products, formatNaira } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { Star, Truck, RefreshCcw, Package, Heart, Minus, Plus, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = useMemo(() => products.find(p => p.id === id), [id]);

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [isAdded, setIsAdded] = useState(false);
    const [mainImage, setMainImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Initialize selections once product is loaded
    React.useEffect(() => {
        if (product) {
            setSelectedSize(product.sizes[0]);
            setSelectedColor(product.colors[0].name);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="pt-40 pb-24 text-center">
                <h1 className="text-3xl font-bold mb-6 uppercase">Product Not Found</h1>
                <p className="text-text-gray mb-8">The product you're looking for doesn't exist.</p>
                <Link href="/shop" className="luxury-button">Back to Shop</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product, 1, selectedSize, selectedColor);
        }
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 3000);
    };

    const displayPrice = product.salePrice || product.price;
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="pt-24 pb-24">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 mb-10">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
                    <ChevronRight size={12} />
                    <Link href={`/shop?category=${product.category}`} className="hover:text-black transition-colors">{product.category}</Link>
                    <ChevronRight size={12} />
                    <span className="text-black font-bold truncate max-w-[200px]">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Side: Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-zoom-in group">
                            <img
                                src={product.images[mainImage]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {product.badge && (
                                <div className={`absolute top-4 right-4 px-4 py-2 text-xs uppercase tracking-widest font-bold ${product.badge === 'Sale' ? 'bg-gold text-white' : 'bg-black text-white'
                                    }`}>
                                    {product.badge}
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(idx)}
                                    className={`aspect-[4/5] bg-neutral-100 overflow-hidden border-2 transition-colors ${mainImage === idx ? 'border-black' : 'border-transparent hover:border-neutral-300'
                                        }`}
                                >
                                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Product Info */}
                    <div className="space-y-8">
                        {/* Title & Price */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-4">
                                {product.salePrice ? (
                                    <div className="flex items-center gap-3">
                                        <span className="text-text-gray line-through text-xl">
                                            {formatNaira(product.price)}
                                        </span>
                                        <span className="text-3xl font-bold">
                                            {formatNaira(product.salePrice)}
                                        </span>
                                        <span className="bg-gold text-white text-xs px-2 py-1 uppercase tracking-widest font-bold">
                                            Save {Math.round((1 - product.salePrice / product.price) * 100)}%
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-3xl font-bold">
                                        {formatNaira(product.price)}
                                    </span>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-2">
                                <div className="flex text-gold">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={16} fill={star <= Math.floor(product.rating) ? 'currentColor' : 'none'} />
                                    ))}
                                </div>
                                <span className="text-sm text-text-gray">
                                    {product.rating}/5 ({product.reviewCount} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="h-px bg-border-elegant" />

                        {/* Color Selector */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[2px] mb-3">
                                Color: <span className="text-text-gray font-normal">{selectedColor}</span>
                            </h4>
                            <div className="flex space-x-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${selectedColor === color.name ? 'border-black' : 'border-transparent hover:border-neutral-300'
                                            }`}
                                        title={color.name}
                                    >
                                        <div
                                            className="w-full h-full rounded-full border border-neutral-200"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[2px] mb-3">
                                Size: <span className="text-text-gray font-normal">{selectedSize}</span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`min-w-[48px] py-2.5 px-3 text-xs font-bold uppercase tracking-widest border transition-all ${selectedSize === size
                                            ? 'bg-black text-white border-black'
                                            : size === 'Custom'
                                                ? 'border-gold text-gold hover:bg-gold hover:text-white'
                                                : 'border-neutral-200 hover:border-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {selectedSize === 'Custom' && (
                                <p className="text-xs text-gold mt-2 font-medium">
                                    Contact us for custom measurements after placing your order.
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[2px] mb-3">Quantity</h4>
                            <div className="flex items-center border border-neutral-200 w-fit">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:text-gold transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                    className="p-3 hover:text-gold transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-border-elegant" />

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdded}
                                className={`w-full py-4 text-sm uppercase tracking-[2px] font-bold transition-all duration-300 relative overflow-hidden ${isAdded
                                    ? 'bg-success text-white'
                                    : 'bg-black text-white hover:bg-gold'
                                    }`}
                            >
                                <span className={`flex items-center justify-center space-x-2 transition-transform duration-300 ${isAdded ? '-translate-y-12' : 'translate-y-0'}`}>
                                    <span>Add to Cart — {formatNaira(displayPrice * quantity)}</span>
                                </span>
                                <span className={`absolute inset-0 flex items-center justify-center space-x-2 transition-transform duration-300 ${isAdded ? 'translate-y-0' : 'translate-y-12'}`}>
                                    <Check size={18} />
                                    <span>Added to Cart!</span>
                                </span>
                            </button>

                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`w-full py-3.5 text-sm uppercase tracking-[2px] font-medium border transition-all flex items-center justify-center space-x-2 ${isWishlisted
                                    ? 'border-gold text-gold bg-gold/5'
                                    : 'border-neutral-200 text-black hover:border-black'
                                    }`}
                            >
                                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                                <span>{isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
                            </button>
                        </div>

                        {/* Quick Info */}
                        <div className="flex items-center gap-6 text-xs text-text-gray">
                            <span className="flex items-center gap-1.5">
                                <Truck size={14} />
                                Free Shipping Over ₦50,000
                            </span>
                            <span className="flex items-center gap-1.5">
                                <RefreshCcw size={14} />
                                30-Day Returns
                            </span>
                        </div>

                        <div className="h-px bg-border-elegant" />

                        {/* Tabs */}
                        <div>
                            <div className="flex space-x-8 border-b border-border-elegant mb-6">
                                {['description', 'fabric & care', 'shipping'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-xs font-bold uppercase tracking-[2px] pb-4 border-b-2 transition-all ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="text-sm text-neutral-600 leading-relaxed min-h-[120px]">
                                {activeTab === 'description' && (
                                    <div>
                                        <p className="mb-4">{product.description}</p>
                                        <ul className="space-y-2">
                                            {product.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <Check size={14} className="text-gold flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 'fabric & care' && (
                                    <div className="space-y-3">
                                        <p><strong>Fabric:</strong> {product.fabric}</p>
                                        <p><strong>Care:</strong> {product.care}</p>
                                        <p><strong>Made in:</strong> Nigeria</p>
                                        <p><strong>SKU:</strong> {product.sku}</p>
                                    </div>
                                )}
                                {activeTab === 'shipping' && (
                                    <div className="space-y-3">
                                        <p>Free standard shipping on orders over ₦50,000.</p>
                                        <p>Standard delivery: 5-7 business days within Nigeria.</p>
                                        <p>Express delivery: 2-3 business days (₦15,000).</p>
                                        <p>30-day returns on unworn items with tags attached.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-border-elegant">
                        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-10">
                            Complete the Look
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;
