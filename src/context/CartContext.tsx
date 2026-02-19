"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    salePrice: number | null;
    image: string;
    quantity: number;
    size: string;
    color: string;
    sku: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: any, quantity: number, size: string, color: string) => void;
    removeFromCart: (itemId: string, size: string, color: string) => void;
    updateQuantity: (itemId: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    promoCode: string | null;
    promoDiscount: number;
    applyPromoCode: (code: string) => boolean;
    removePromoCode: () => void;
    shippingCost: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_PROMO_CODES: Record<string, number> = {
    'SAVE20': 0.2,
    'WELCOME10': 0.1,
    'NAIJA50': 0.15,
};

const FREE_SHIPPING_THRESHOLD = 50000;
const STANDARD_SHIPPING = 5000;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [promoCode, setPromoCode] = useState<string | null>(null);
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('omotailor_cart');
        const savedPromo = localStorage.getItem('omotailor_promo');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        if (savedPromo) {
            try {
                const promo = JSON.parse(savedPromo);
                setPromoCode(promo.code);
                setPromoDiscount(promo.discount);
            } catch (e) {
                console.error("Failed to parse promo", e);
            }
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('omotailor_cart', JSON.stringify(cart));
        }
    }, [cart, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            if (promoCode) {
                localStorage.setItem('omotailor_promo', JSON.stringify({ code: promoCode, discount: promoDiscount }));
            } else {
                localStorage.removeItem('omotailor_promo');
            }
        }
    }, [promoCode, promoDiscount, isHydrated]);

    const addToCart = useCallback((product: any, quantity: number, size: string, color: string) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                item => item.id === product.id && item.size === size && item.color === color
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            }

            return [...prevCart, {
                id: product.id,
                name: product.name,
                price: product.price,
                salePrice: product.salePrice || null,
                image: product.images ? product.images[0] : product.image,
                quantity,
                size,
                color,
                sku: product.sku || ''
            }];
        });
    }, []);

    const removeFromCart = useCallback((itemId: string, size: string, color: string) => {
        setCart(prevCart => prevCart.filter(item =>
            !(item.id === itemId && item.size === size && item.color === color)
        ));
    }, []);

    const updateQuantity = useCallback((itemId: string, size: string, color: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(itemId, size, color);
            return;
        }
        setCart(prevCart => prevCart.map(item =>
            (item.id === itemId && item.size === size && item.color === color)
                ? { ...item, quantity }
                : item
        ));
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setCart([]);
        setPromoCode(null);
        setPromoDiscount(0);
    }, []);

    const applyPromoCode = useCallback((code: string): boolean => {
        const upperCode = code.toUpperCase().trim();
        if (VALID_PROMO_CODES[upperCode] !== undefined) {
            setPromoCode(upperCode);
            setPromoDiscount(VALID_PROMO_CODES[upperCode]);
            return true;
        }
        return false;
    }, []);

    const removePromoCode = useCallback(() => {
        setPromoCode(null);
        setPromoDiscount(0);
    }, []);

    const cartTotal = cart.reduce((total, item) => {
        const itemPrice = item.salePrice || item.price;
        return total + (itemPrice * item.quantity);
    }, 0);

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            promoCode,
            promoDiscount,
            applyPromoCode,
            removePromoCode,
            shippingCost,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
