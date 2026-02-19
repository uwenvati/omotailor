"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatNaira } from '@/data/products';
import { ShieldCheck, ArrowLeft, Lock, ChevronRight, Check } from 'lucide-react';

const NIGERIAN_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const SHIPPING_METHODS = [
    { id: 'standard', name: 'Standard Shipping', price: 5000, delivery: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 15000, delivery: '2-3 business days' },
    { id: 'priority', name: 'Priority Overnight', price: 30000, delivery: 'Next business day' },
];

const PAYMENT_METHODS = [
    { id: 'bank-transfer', name: 'Bank Transfer', description: 'Pay directly to our bank account', enabled: true },
    { id: 'pay-on-delivery', name: 'Pay on Delivery', description: 'Pay with cash when you receive your order', enabled: true },
    { id: 'card', name: 'Credit/Debit Card', description: 'Coming soon!', enabled: false },
];

interface FormData {
    email: string;
    phone: string;
    fullName: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
}

const CheckoutPage = () => {
    const router = useRouter();
    const { cart, cartTotal, promoCode, promoDiscount, shippingCost: baseShippingCost, clearCart } = useCart();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        phone: '',
        fullName: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const selectedShipping = SHIPPING_METHODS.find(m => m.id === shippingMethod)!;
    const discountAmount = cartTotal * promoDiscount;
    const finalTotal = cartTotal - discountAmount + selectedShipping.price;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';

        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Please enter a valid phone number';

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validate()) return;
        if (!agreedToTerms) return;

        setIsProcessing(true);

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate order ID
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

        // Save order to localStorage
        const order = {
            orderId,
            orderDate: new Date().toISOString(),
            customerInfo: {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
            },
            shippingAddress: {
                street: formData.address,
                apartment: formData.address2,
                city: formData.city,
                state: formData.state,
                postalCode: formData.postalCode,
                country: 'Nigeria',
            },
            items: cart,
            subtotal: cartTotal,
            discount: discountAmount,
            promoCode,
            shipping: selectedShipping.price,
            shippingMethod: selectedShipping.name,
            total: finalTotal,
            paymentMethod: PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name,
            status: 'Pending Payment',
        };

        localStorage.setItem(`omotailor_order_${orderId}`, JSON.stringify(order));
        clearCart();
        router.push(`/order-confirmation/${orderId}`);
    };

    if (cart.length === 0) {
        return (
            <div className="pt-40 pb-32 text-center space-y-6">
                <h1 className="text-3xl font-bold uppercase tracking-tight">Your cart is empty</h1>
                <p className="text-text-gray">Add some items before checking out.</p>
                <Link href="/shop" className="luxury-button inline-block">Shop Now</Link>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-24">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-text-gray mb-2">
                            <Lock size={14} />
                            <span className="uppercase tracking-widest text-xs font-bold">Secure Checkout</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Checkout</h1>
                    </div>
                    <Link href="/cart" className="text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-2">
                        <ArrowLeft size={14} />
                        Edit Cart
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Side: Form */}
                    <div className="lg:col-span-7 space-y-10">
                        {/* 1. Contact Information */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-[2px] mb-6 flex items-center gap-3">
                                <span className="w-7 h-7 bg-black text-white text-xs flex items-center justify-center font-bold">1</span>
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors ${errors.email ? 'border-error' : 'border-neutral-200'
                                            }`}
                                    />
                                    {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+234-XXX-XXX-XXXX"
                                        className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors ${errors.phone ? 'border-error' : 'border-neutral-200'
                                            }`}
                                    />
                                    {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </section>

                        {/* 2. Shipping Address */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-[2px] mb-6 flex items-center gap-3">
                                <span className="w-7 h-7 bg-black text-white text-xs flex items-center justify-center font-bold">2</span>
                                Shipping Address
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors ${errors.fullName ? 'border-error' : 'border-neutral-200'}`}
                                    />
                                    {errors.fullName && <p className="text-xs text-error mt-1">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="123 Main Street"
                                        className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors ${errors.address ? 'border-error' : 'border-neutral-200'}`}
                                    />
                                    {errors.address && <p className="text-xs text-error mt-1">{errors.address}</p>}
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">Apartment, Suite, etc. (optional)</label>
                                    <input
                                        type="text"
                                        name="address2"
                                        value={formData.address2}
                                        onChange={handleInputChange}
                                        placeholder="Apartment 4B"
                                        className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Lagos"
                                            className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors ${errors.city ? 'border-error' : 'border-neutral-200'}`}
                                        />
                                        {errors.city && <p className="text-xs text-error mt-1">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">State *</label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white ${errors.state ? 'border-error' : 'border-neutral-200'}`}
                                        >
                                            <option value="">Select State</option>
                                            {NIGERIAN_STATES.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                        {errors.state && <p className="text-xs text-error mt-1">{errors.state}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">Postal Code (optional)</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="100001"
                                        className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 3. Shipping Method */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-[2px] mb-6 flex items-center gap-3">
                                <span className="w-7 h-7 bg-black text-white text-xs flex items-center justify-center font-bold">3</span>
                                Shipping Method
                            </h2>
                            <div className="space-y-3">
                                {SHIPPING_METHODS.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${shippingMethod === method.id ? 'border-black bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${shippingMethod === method.id ? 'border-black' : 'border-neutral-300'
                                                }`}>
                                                {shippingMethod === method.id && (
                                                    <div className="w-2 h-2 rounded-full bg-black" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{method.name}</p>
                                                <p className="text-xs text-text-gray">{method.delivery}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold">{formatNaira(method.price)}</span>
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value={method.id}
                                            checked={shippingMethod === method.id}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="hidden"
                                        />
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* 4. Payment Method */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-[2px] mb-6 flex items-center gap-3">
                                <span className="w-7 h-7 bg-black text-white text-xs flex items-center justify-center font-bold">4</span>
                                Payment Method
                            </h2>
                            <div className="space-y-3">
                                {PAYMENT_METHODS.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center p-4 border transition-all ${method.enabled
                                                ? paymentMethod === method.id
                                                    ? 'border-black bg-neutral-50 cursor-pointer'
                                                    : 'border-neutral-200 hover:border-neutral-400 cursor-pointer'
                                                : 'border-neutral-100 bg-neutral-50 opacity-60 cursor-not-allowed'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id && method.enabled ? 'border-black' : 'border-neutral-300'
                                                }`}>
                                                {paymentMethod === method.id && method.enabled && (
                                                    <div className="w-2 h-2 rounded-full bg-black" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{method.name}</p>
                                                <p className="text-xs text-text-gray">{method.description}</p>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method.id}
                                            checked={paymentMethod === method.id}
                                            onChange={(e) => method.enabled && setPaymentMethod(e.target.value)}
                                            disabled={!method.enabled}
                                            className="hidden"
                                        />
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* Terms & Place Order */}
                        <section className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <div className={`w-5 h-5 border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${agreedToTerms ? 'bg-black border-black' : 'border-neutral-300'
                                    }`}>
                                    {agreedToTerms && <Check size={12} className="text-white" />}
                                </div>
                                <span className="text-sm text-text-gray">
                                    I agree to the{' '}
                                    <Link href="/contact" className="text-black font-medium border-b border-black">Terms & Conditions</Link>
                                    {' '}and{' '}
                                    <Link href="/contact" className="text-black font-medium border-b border-black">Privacy Policy</Link>
                                </span>
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="hidden"
                                />
                            </label>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={!agreedToTerms || isProcessing}
                                className="w-full luxury-button py-5 text-center disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing Your Order...
                                    </span>
                                ) : (
                                    `Place Order — ${formatNaira(finalTotal)}`
                                )}
                            </button>

                            <p className="text-center text-xs text-text-gray flex items-center justify-center gap-1.5">
                                <Lock size={12} />
                                Your information is secure and encrypted
                            </p>
                        </section>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-5 sticky top-28">
                        <div className="bg-soft-gray p-6 md:p-8 border border-neutral-100">
                            <h2 className="text-lg font-bold uppercase tracking-[3px] mb-6">Your Order</h2>

                            {/* Items */}
                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                                        <div className="w-16 h-20 bg-white overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold truncate">{item.name}</p>
                                            <p className="text-xs text-text-gray">
                                                {item.color} / {item.size} × {item.quantity}
                                            </p>
                                            <p className="text-sm font-bold mt-1">
                                                {formatNaira((item.salePrice || item.price) * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-neutral-200 mb-4" />

                            {/* Totals */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-text-gray">Subtotal</span>
                                    <span className="font-bold">{formatNaira(cartTotal)}</span>
                                </div>
                                {promoCode && (
                                    <div className="flex justify-between text-success">
                                        <span>Discount ({promoCode})</span>
                                        <span className="font-bold">-{formatNaira(discountAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-text-gray">Shipping</span>
                                    <span className="font-bold">{formatNaira(selectedShipping.price)}</span>
                                </div>
                            </div>

                            <div className="h-px bg-neutral-200 my-4" />

                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold uppercase tracking-[2px] text-text-gray">Total</span>
                                <span className="text-2xl font-bold">{formatNaira(finalTotal)}</span>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-text-gray uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-gold" />
                                <span>Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
