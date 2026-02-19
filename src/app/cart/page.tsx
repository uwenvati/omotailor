"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatNaira } from '@/data/products';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, X, Check, Tag } from 'lucide-react';

const CartPage = () => {
    const {
        cart, cartTotal, cartCount, updateQuantity, removeFromCart,
        promoCode, promoDiscount, applyPromoCode, removePromoCode, shippingCost
    } = useCart();
    const [promoInput, setPromoInput] = useState('');
    const [promoError, setPromoError] = useState('');
    const [promoSuccess, setPromoSuccess] = useState(false);

    const handleApplyPromo = () => {
        setPromoError('');
        setPromoSuccess(false);
        if (!promoInput.trim()) {
            setPromoError('Please enter a promo code');
            return;
        }
        const success = applyPromoCode(promoInput);
        if (success) {
            setPromoSuccess(true);
            setPromoInput('');
        } else {
            setPromoError('Invalid promo code');
        }
    };

    const discountAmount = cartTotal * promoDiscount;
    const finalTotal = cartTotal - discountAmount + shippingCost;

    if (cart.length === 0) {
        return (
            <div className="pt-40 pb-32 text-center space-y-8">
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={40} className="text-neutral-300" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Your Cart is Empty</h1>
                    <p className="text-text-gray font-light max-w-sm mx-auto">
                        Start adding items to your collection and experience Nigerian elegance.
                    </p>
                </div>
                <Link href="/shop" className="luxury-button inline-block min-w-[200px]">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-24">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-border-elegant">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Shopping Cart</h1>
                        <p className="text-text-gray mt-1 text-sm">
                            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                    <Link href="/shop" className="hidden sm:flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors">
                        <ArrowLeft size={16} />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 space-y-8">
                        {cart.map((item) => (
                            <div
                                key={`${item.id}-${item.size}-${item.color}`}
                                className="flex flex-col sm:flex-row gap-6 items-start pb-8 border-b border-neutral-100 last:border-0 group"
                            >
                                {/* Image */}
                                <Link
                                    href={`/product/${item.id}`}
                                    className="w-full sm:w-28 aspect-[3/4] bg-neutral-50 overflow-hidden flex-shrink-0"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>

                                {/* Info */}
                                <div className="flex-1 space-y-3 w-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-base font-bold uppercase tracking-tight group-hover:text-gold transition-colors">
                                                <Link href={`/product/${item.id}`}>{item.name}</Link>
                                            </h3>
                                            <div className="flex items-center space-x-3 mt-1 text-xs text-text-gray uppercase tracking-wider">
                                                <span>Color: {item.color}</span>
                                                <span className="w-px h-3 bg-neutral-200" />
                                                <span>Size: {item.size}</span>
                                            </div>
                                        </div>
                                        <span className="text-base font-bold">
                                            {formatNaira((item.salePrice || item.price) * item.quantity)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        {/* Quantity */}
                                        <div className="flex items-center border border-neutral-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                className="p-2 hover:text-gold transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                className="p-2 hover:text-gold transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                                            className="text-xs uppercase tracking-widest font-medium text-neutral-400 hover:text-error flex items-center space-x-1.5 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                            <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4 sticky top-28">
                        <div className="bg-soft-gray p-6 md:p-8 space-y-6 border border-neutral-100">
                            <h2 className="text-lg font-bold uppercase tracking-[3px]">Order Summary</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-gray">Subtotal</span>
                                    <span className="font-bold">{formatNaira(cartTotal)}</span>
                                </div>
                                {promoCode && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-success flex items-center gap-1">
                                            <Tag size={12} />
                                            Discount ({promoCode})
                                        </span>
                                        <span className="font-bold text-success">-{formatNaira(discountAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-gray">Shipping</span>
                                    <span className={`font-bold ${shippingCost === 0 ? 'text-success' : ''}`}>
                                        {shippingCost === 0 ? 'Free' : formatNaira(shippingCost)}
                                    </span>
                                </div>
                                {shippingCost > 0 && (
                                    <p className="text-[11px] text-text-gray">
                                        Free shipping on orders over ₦50,000
                                    </p>
                                )}
                            </div>

                            <div className="h-px bg-neutral-200" />

                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold uppercase tracking-[2px] text-text-gray">Total</span>
                                <span className="text-2xl font-bold">{formatNaira(finalTotal)}</span>
                            </div>

                            {/* Promo Code */}
                            <div className="space-y-2">
                                {promoCode ? (
                                    <div className="flex items-center justify-between bg-success/10 px-3 py-2 text-sm">
                                        <span className="flex items-center gap-2 text-success font-medium">
                                            <Check size={14} />
                                            {promoCode} applied
                                        </span>
                                        <button onClick={removePromoCode} className="text-text-gray hover:text-black">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoInput}
                                            onChange={(e) => setPromoInput(e.target.value)}
                                            placeholder="Promo code"
                                            className="flex-1 border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                                        />
                                        <button
                                            onClick={handleApplyPromo}
                                            className="px-4 py-2 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-gold transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                )}
                                {promoError && (
                                    <p className="text-xs text-error">{promoError}</p>
                                )}
                            </div>

                            <Link
                                href="/checkout"
                                className="luxury-button w-full py-4 text-center block"
                            >
                                Proceed to Checkout
                            </Link>

                            <div className="flex items-center justify-center space-x-2 text-[11px] text-text-gray uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-gold" />
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
