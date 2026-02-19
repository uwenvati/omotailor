"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatNaira } from '@/data/products';
import { CheckCircle, Mail, Phone, Package, ArrowRight } from 'lucide-react';

interface OrderData {
    orderId: string;
    orderDate: string;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
    shippingAddress: {
        street: string;
        apartment: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    items: Array<{
        id: string;
        name: string;
        price: number;
        salePrice: number | null;
        image: string;
        quantity: number;
        size: string;
        color: string;
    }>;
    subtotal: number;
    discount: number;
    promoCode: string | null;
    shipping: number;
    shippingMethod: string;
    total: number;
    paymentMethod: string;
    status: string;
}

const OrderConfirmationPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            const savedOrder = localStorage.getItem(`omotailor_order_${orderId}`);
            if (savedOrder) {
                try {
                    setOrder(JSON.parse(savedOrder));
                } catch (e) {
                    console.error("Failed to parse order", e);
                }
            }
            setLoading(false);
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="pt-40 pb-24 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full mx-auto" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="pt-40 pb-24 text-center space-y-6">
                <h1 className="text-3xl font-bold uppercase tracking-tight">Order Not Found</h1>
                <p className="text-text-gray">We couldn't find this order. Please check the order ID.</p>
                <Link href="/shop" className="luxury-button inline-block">Continue Shopping</Link>
            </div>
        );
    }

    const orderDate = new Date(order.orderDate).toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="pt-28 pb-24">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} className="text-success" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-3">
                        Order Confirmed!
                    </h1>
                    <p className="text-text-gray text-lg">
                        Thank you for your purchase, {order.customerInfo.name.split(' ')[0]}!
                    </p>
                    <p className="text-text-gray mt-2 text-sm max-w-md mx-auto">
                        Your order <strong className="text-black">#{order.orderId}</strong> has been received
                        and is being processed. We'll contact you shortly with payment instructions.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-text-gray">
                        <Mail size={14} />
                        <span>Confirmation sent to: <strong className="text-black">{order.customerInfo.email}</strong></span>
                    </div>
                </div>

                {/* Order Details */}
                <div className="border border-border-elegant divide-y divide-border-elegant">
                    {/* Order Info */}
                    <div className="p-6 md:p-8">
                        <h2 className="text-sm font-bold uppercase tracking-[3px] mb-4">Order Details</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-text-gray text-xs uppercase tracking-wider mb-1">Order Number</p>
                                <p className="font-bold">#{order.orderId}</p>
                            </div>
                            <div>
                                <p className="text-text-gray text-xs uppercase tracking-wider mb-1">Order Date</p>
                                <p className="font-bold">{orderDate}</p>
                            </div>
                            <div>
                                <p className="text-text-gray text-xs uppercase tracking-wider mb-1">Payment Method</p>
                                <p className="font-bold">{order.paymentMethod}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="p-6 md:p-8">
                        <h2 className="text-sm font-bold uppercase tracking-[3px] mb-4">Items Ordered</h2>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-16 h-20 bg-neutral-100 overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">{item.name}</p>
                                        <p className="text-xs text-text-gray mt-0.5">
                                            {item.color} / {item.size} × {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-sm font-bold">
                                        {formatNaira((item.salePrice || item.price) * item.quantity)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="p-6 md:p-8">
                        <h2 className="text-sm font-bold uppercase tracking-[3px] mb-4">Shipping Address</h2>
                        <div className="text-sm text-text-gray leading-relaxed">
                            <p className="text-black font-medium">{order.customerInfo.name}</p>
                            <p>{order.shippingAddress.street}</p>
                            {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                            <p>{order.shippingAddress.country}</p>
                        </div>
                    </div>

                    {/* Order Total */}
                    <div className="p-6 md:p-8">
                        <h2 className="text-sm font-bold uppercase tracking-[3px] mb-4">Order Total</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-text-gray">Subtotal</span>
                                <span>{formatNaira(order.subtotal)}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-success">
                                    <span>Discount ({order.promoCode})</span>
                                    <span>-{formatNaira(order.discount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-text-gray">Shipping ({order.shippingMethod})</span>
                                <span>{formatNaira(order.shipping)}</span>
                            </div>
                            <div className="h-px bg-border-elegant my-2" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>{formatNaira(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="p-6 md:p-8 bg-soft-gray">
                        <h2 className="text-sm font-bold uppercase tracking-[3px] mb-4 flex items-center gap-2">
                            <Package size={16} className="text-gold" />
                            Next Steps
                        </h2>
                        <ol className="space-y-3 text-sm text-text-gray">
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">1</span>
                                <span>Check your email for payment instructions</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">2</span>
                                <span>Complete payment within 24 hours</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">3</span>
                                <span>We'll confirm and begin tailoring your order</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">4</span>
                                <span>Delivery in 5-7 business days</span>
                            </li>
                        </ol>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
                    <Link href="/shop" className="luxury-button-outline text-center px-8 py-3.5 flex items-center justify-center gap-2">
                        Continue Shopping
                        <ArrowRight size={14} />
                    </Link>
                    <Link href="/contact" className="luxury-button text-center px-8 py-3.5">
                        Contact Support
                    </Link>
                </div>

                {/* Support */}
                <div className="text-center mt-10 text-sm text-text-gray space-y-2">
                    <p>Need help? Contact us:</p>
                    <div className="flex items-center justify-center gap-6">
                        <a href="mailto:support@omotailor.com" className="flex items-center gap-1.5 hover:text-black transition-colors">
                            <Mail size={14} />
                            support@omotailor.com
                        </a>
                        <a href="tel:+2341234567890" className="flex items-center gap-1.5 hover:text-black transition-colors">
                            <Phone size={14} />
                            +234-123-456-7890
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
