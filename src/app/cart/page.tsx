"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';

const CartPage = () => {
    const { cart, cartTotal, cartCount, updateQuantity, removeFromCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="pt-48 pb-32 text-center space-y-8">
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <ShoppingBag size={40} className="text-neutral-300" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold uppercase tracking-tight">Your Cart is Empty</h1>
                    <p className="text-neutral-500 font-light max-w-sm mx-auto">
                        It looks like you haven't added any pieces to your collection yet.
                    </p>
                </div>
                <Link href="/shop" className="luxury-button inline-block min-w-[200px]">
                    Begin Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-16 border-b border-elegant pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Shopping Bag</h1>
                        <p className="text-neutral-500 mt-2 font-light uppercase tracking-[0.2em] text-xs">
                            {cartCount} items in your collection
                        </p>
                    </div>
                    <Link href="/shop" className="hidden sm:flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors">
                        <ArrowLeft size={16} />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-12">
                        {cart.map((item) => (
                            <div key={`${item.id}-${item.size}-${item.color}`} className="flex flex-col sm:flex-row gap-8 items-start sm:items-center pb-12 border-b border-neutral-100 last:border-0 group">
                                {/* Image */}
                                <div className="w-full sm:w-40 aspect-[4/5] bg-neutral-50 relative overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 flex items-center space-x-1.5 border border-white/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                                        <span className="text-[8px] font-bold uppercase tracking-widest">3D Asset</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-gold transition-colors">
                                                <Link href={`/product/${item.id}`}>{item.name}</Link>
                                            </h3>
                                            <div className="flex items-center space-x-4 mt-2 text-xs uppercase tracking-widest font-bold text-neutral-400">
                                                <span className="flex items-center space-x-2">
                                                    <span>Color:</span>
                                                    <span
                                                        className="w-3 h-3 rounded-full border border-neutral-200"
                                                        style={{ backgroundColor: item.color === 'charcoal' ? '#36454F' : item.color === 'gold' ? '#D4AF37' : item.color }}
                                                    ></span>
                                                </span>
                                                <span className="w-px h-3 bg-neutral-200"></span>
                                                <span>Size: {item.size}</span>
                                            </div>
                                        </div>
                                        <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex items-center border border-neutral-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                className="p-2 hover:text-gold transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-10 text-center font-bold text-sm tracking-widest">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                className="p-2 hover:text-gold transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                                            className="text-xs uppercase tracking-widest font-bold text-neutral-400 hover:text-red-500 flex items-center space-x-2 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4 sticky top-32">
                        <div className="bg-neutral-50 p-8 space-y-8 border border-neutral-100">
                            <h2 className="text-xl font-bold uppercase tracking-[0.2em]">Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm uppercase tracking-widest text-neutral-500 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-black font-bold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm uppercase tracking-widest text-neutral-500 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between text-sm uppercase tracking-widest text-neutral-500 font-medium">
                                    <span>Tax (Estimated)</span>
                                    <span className="text-black font-bold">${(cartTotal * 0.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="h-px bg-neutral-200"></div>

                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Total</span>
                                <span className="text-3xl font-bold leading-none">${(cartTotal * 1.08).toFixed(2)}</span>
                            </div>

                            <button className="w-full luxury-button py-5 text-center flex items-center justify-center space-x-3 text-sm tracking-[0.3em]">
                                <CreditCard size={18} />
                                <span>Checkout</span>
                            </button>

                            <div className="space-y-4 pt-4">
                                <div className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                                    <ShieldCheck size={14} className="text-gold" />
                                    <span>Secure SSL Checkout</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                                    <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                                    <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                                    <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                                </div>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-neutral-400 px-12 leading-loose">
                            By proceeding to checkout, you agree to our <br />
                            <Link href="#" className="text-black border-b border-black pb-0.5">Privacy Policy</Link> and <Link href="#" className="text-black border-b border-black pb-0.5">Terms of Service</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
