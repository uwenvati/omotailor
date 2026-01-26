"use client";

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import Product3DViewer from '@/components/Product3DViewer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { Star, Truck, RefreshCcw, Box, Heart, Minus, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ProductDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const product = useMemo(() => products.find(p => p.id === id), [id]);

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [isAdded, setIsAdded] = useState(false);

    // Initialize selections once product is loaded
    React.useEffect(() => {
        if (product) {
            setSelectedSize(product.sizes[0]);
            setSelectedColor(product.colors[0]);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="pt-40 pb-24 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Link href="/shop" className="luxury-button">Back to Shop</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 3000);
    };

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="pt-24 pb-24">
            <div className="container mx-auto px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 mb-12">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
                    <ChevronRight size={12} />
                    <span className="text-black font-bold">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Side: 3D Viewer + Gallery */}
                    <div className="lg:col-span-7 space-y-8">
                        <Product3DViewer
                            modelPath={product.model3D}
                            color={selectedColor}
                            autoRotate={false}
                            height="h-[500px] lg:h-[700px]"
                        />

                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 cursor-pointer hover:border-black transition-colors">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            {/* Optional: Add more product images if available, else placeholders */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 cursor-pointer hover:border-black transition-colors flex items-center justify-center">
                                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Detail {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Product Info */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold uppercase tracking-tight leading-tight">{product.name}</h1>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                                <div className="flex items-center space-x-2">
                                    <div className="flex text-gold">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={14} fill={star <= Math.floor(product.rating) ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                    <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">({product.reviews} Reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-elegant w-full"></div>

                        {/* Color Selector */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest flex justify-between">
                                <span>Color: <span className="text-neutral-500">{selectedColor}</span></span>
                            </h4>
                            <div className="flex space-x-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                                    >
                                        <div
                                            className="w-full h-full rounded-full border border-neutral-200"
                                            style={{ backgroundColor: color === 'charcoal' ? '#36454F' : color === 'gold' ? '#D4AF37' : color }}
                                        ></div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xs font-bold uppercase tracking-widest">Size</h4>
                                <button className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black border-b border-neutral-200 pb-0.5 transition-colors">Size Guide</button>
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 text-xs font-bold uppercase tracking-widest border transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-neutral-200 hover:border-black'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-neutral-200 px-4 py-3">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-gold transition-colors"><Minus size={16} /></button>
                                    <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-gold transition-colors"><Plus size={16} /></button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdded}
                                    className={`flex-1 luxury-button py-4 relative overflow-hidden transition-all ${isAdded ? 'bg-green-600' : ''}`}
                                >
                                    <span className={`flex items-center justify-center space-x-2 transition-transform duration-300 ${isAdded ? '-translate-y-12' : 'translate-y-0'}`}>
                                        <span>Add to Cart</span>
                                    </span>
                                    <span className={`absolute inset-0 flex items-center justify-center space-x-2 transition-transform duration-300 ${isAdded ? 'translate-y-0' : 'translate-y-12'}`}>
                                        <span>Product Added!</span>
                                    </span>
                                </button>
                                <button className="w-14 h-14 border border-neutral-200 flex items-center justify-center hover:border-black transition-colors">
                                    <Heart size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Extra Info Tabs */}
                        <div className="pt-8">
                            <div className="flex space-x-8 border-b border-elegant mb-6">
                                {['description', 'details', 'shipping'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-[10px] font-bold uppercase tracking-[0.2em] pb-4 border-b-2 transition-all ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-neutral-400'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="text-sm text-neutral-600 leading-relaxed min-h-[100px] font-light italic">
                                {activeTab === 'description' && product.description}
                                {activeTab === 'details' && "Made from 100% sustainable organic cotton. Designed in London, crafted in Portugal. Reinforced seams for longevity. Pre-shrunk for the perfect fit."}
                                {activeTab === 'shipping' && "Free standard shipping on orders over $150. Delivery within 3-5 business days. 30-day returns on all 3D-verified purchases."}
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="grid grid-cols-2 gap-6 pt-8">
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-neutral-100 rounded-lg"><Box size={20} /></div>
                                <div>
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest mb-1">Fit Verify</h5>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">AI Accurate</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-neutral-100 rounded-lg"><Truck size={20} /></div>
                                <div>
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest mb-1">Eco Ship</h5>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Carbon Neutral</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-40">
                        <h2 className="text-2xl font-bold uppercase tracking-tight mb-12">Related Pieces</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
