"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
    ChevronDown, ChevronRight, Shirt, UserRound, Sparkles, Camera, ShoppingBag,
    Target, DollarSign, Zap, Globe, Lock, Infinity, Shield, Clock, Crosshair, Users,
    Check, ArrowDown, Share2, MessageCircle
} from 'lucide-react';

/* ── Skin tone & body type data ── */
const SKIN_TONES = [
    { id: 'deep', label: 'Deep Ebony', color: '#3B2209' },
    { id: 'dark', label: 'Dark Brown', color: '#5C3A1E' },
    { id: 'brown', label: 'Brown', color: '#8B5E3C' },
    { id: 'light', label: 'Light Brown', color: '#C49A6C' },
];

const BODY_TYPES = [
    { id: 'slim', label: 'Slim' },
    { id: 'average', label: 'Average' },
    { id: 'athletic', label: 'Athletic' },
    { id: 'curvy', label: 'Curvy' },
];

const STEPS = [
    { icon: Shirt, number: '01', title: 'Choose Outfit', desc: 'Select any item from our catalog of premium Nigerian attire' },
    { icon: UserRound, number: '02', title: 'Customize Avatar', desc: 'Pick your skin tone and body type for a personalized preview' },
    { icon: Sparkles, number: '03', title: 'See Your Fit', desc: 'AI renders a realistic preview on your avatar in seconds' },
    { icon: Camera, number: '04', title: 'Upload Photo', desc: 'Optionally see it on yourself using your own photo', optional: true },
    { icon: ShoppingBag, number: '05', title: 'Shop Confident', desc: 'Buy knowing exactly how it will look and fit on you', optional: true },
];

const BENEFITS = [
    { icon: Target, title: 'Perfect Fit', desc: 'See exactly how it looks on YOUR unique body type and skin tone' },
    { icon: DollarSign, title: 'Save Money', desc: 'Avoid buying wrong sizes and costly returns' },
    { icon: Zap, title: 'Instant Preview', desc: 'No waiting for shipping to see if it fits' },
    { icon: Globe, title: 'Eco-Friendly', desc: 'Fewer returns means a lower carbon footprint' },
    { icon: Lock, title: '100% Private', desc: 'Your photos are processed instantly and never stored' },
    { icon: Infinity, title: 'Try Unlimited', desc: 'Test as many outfits as you want, absolutely free' },
];

const TRUST_CARDS = [
    { icon: Shield, title: 'Private', desc: 'Photos processed locally on your device — never uploaded to servers' },
    { icon: Zap, title: 'Instant', desc: 'AI renders in under 3 seconds — no waiting, no processing delays' },
    { icon: Crosshair, title: 'Accurate', desc: '95% fit accuracy based on 10,000+ test fittings' },
    { icon: Users, title: 'Inclusive', desc: 'Trained on diverse African body types and skin tones' },
];

const FAQS = [
    {
        q: 'Will my photos be saved or shared?',
        a: 'Absolutely not. Our AI processes everything locally on your device using advanced browser-based technology. Your photos never leave your phone or computer, and we never have access to them. Privacy is our top priority.',
    },
    {
        q: 'How accurate is the AI?',
        a: 'Our AI has been trained on thousands of real fittings and body scans. In testing, it achieved 95% accuracy in predicting how garments will look and fit. While no virtual try-on is 100% perfect, ours comes very close to seeing it in person.',
    },
    {
        q: 'Will it work on all skin tones?',
        a: "Yes! We've specifically trained our AI to understand the beautiful diversity of African skin tones — from deep ebony to fair complexions. Unlike generic AI models, ours was built with Nigerian customers in mind.",
    },
    {
        q: 'When will this feature launch?',
        a: "We're targeting Q2 2025 for our beta launch. Join the waitlist to get early access and be among the first to try it when it goes live!",
    },
    {
        q: 'Will it work on my phone?',
        a: 'Yes! The AI try-on will work on modern smartphones (iOS 14+, Android 10+) and all desktop browsers. No app download required — it runs directly in your browser.',
    },
    {
        q: 'How much will it cost?',
        a: "The AI try-on feature will be completely FREE for all customers. It's our way of helping you shop with confidence.",
    },
];

/* ── Product images for mockup preview ── */
const MOCKUP_IMAGES = [
    '/assets/images/IMG_9536.jpeg',
    '/assets/images/IMG_9598.jpeg',
    '/assets/images/IMG_9642.jpeg',
    '/assets/images/IMG_9765.jpeg',
];

export default function AITryOnPage() {
    const [selectedSkinTone, setSelectedSkinTone] = useState('deep');
    const [selectedBodyType, setSelectedBodyType] = useState('average');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const waitlistRef = useRef<HTMLDivElement>(null);

    const scrollToWaitlist = () => {
        waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');

        if (!email.trim() || !email.includes('@') || !email.includes('.')) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1200));

        const waitlist = JSON.parse(localStorage.getItem('omotailor_waitlist') || '[]');
        waitlist.push({ email, timestamp: new Date().toISOString(), source: 'ai-try-on-page' });
        localStorage.setItem('omotailor_waitlist', JSON.stringify(waitlist));

        setSubmitted(true);
        setEmail('');
        setIsSubmitting(false);
        setTimeout(() => setSubmitted(false), 8000);
    };

    // Skin tone index for mockup switching
    const skinToneIdx = SKIN_TONES.findIndex(t => t.id === selectedSkinTone);
    const currentMockup = MOCKUP_IMAGES[skinToneIdx % MOCKUP_IMAGES.length];
    const currentSkinTone = SKIN_TONES.find(t => t.id === selectedSkinTone)!;

    return (
        <div className="flex flex-col">
            {/* ═══════ 1. HERO SECTION ═══════ */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2C2C2C 100%)' }}>
                {/* Floating decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5 bg-gold blur-3xl animate-float" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5 bg-gold blur-3xl" style={{ animationDelay: '3s' }} />
                </div>

                <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white uppercase font-[family-name:var(--font-heading)]">
                        See Yourself in<br />
                        <span className="text-gold">Every Style</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gold font-medium mt-4 tracking-wide uppercase">
                        AI-Powered Virtual Try-On Technology
                    </p>

                    <p className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto mt-6 leading-relaxed font-light">
                        Experience our clothing on your unique skin tone and body type before you buy — powered by AI
                    </p>

                    <div className="mt-10 space-y-5">
                        <div className="inline-block px-8 py-3 bg-gold text-black text-sm uppercase tracking-[3px] font-bold animate-pulse">
                            Coming Soon 2025
                        </div>

                        <div>
                            <button
                                onClick={scrollToWaitlist}
                                className="luxury-button-white px-10 py-4 text-sm"
                            >
                                Join the Waitlist
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => document.getElementById('feature-preview')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mt-16 text-white/50 text-xs uppercase tracking-widest flex flex-col items-center gap-2 mx-auto hover:text-white/80 transition-colors animate-bounce"
                    >
                        <span>Learn More</span>
                        <ArrowDown size={16} />
                    </button>
                </div>
            </section>

            {/* ═══════ 2. FEATURE PREVIEW (Interactive Mockup) ═══════ */}
            <section id="feature-preview" className="py-20 md:py-28 bg-white">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-center mb-4 font-[family-name:var(--font-heading)]">
                        How It Will Work
                    </h2>
                    <p className="text-text-gray text-center font-light mb-16 max-w-lg mx-auto">
                        A preview of the virtual fitting experience we're building for you
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                        {/* LEFT: Mockup Display (3/5) */}
                        <div className="lg:col-span-3 relative">
                            <div className="aspect-[3/4] max-h-[600px] bg-neutral-100 overflow-hidden relative mx-auto">
                                <img
                                    src={currentMockup}
                                    alt="AI Try-on mockup preview"
                                    className="w-full h-full object-cover transition-all duration-700"
                                    style={{ filter: `sepia(0.1) saturate(1.1)` }}
                                />
                                {/* Skin tone tint overlay */}
                                <div
                                    className="absolute inset-0 mix-blend-color opacity-10 transition-all duration-700 pointer-events-none"
                                    style={{ backgroundColor: currentSkinTone.color }}
                                />
                                {/* AI badge */}
                                <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 backdrop-blur-sm">
                                    <Sparkles size={12} className="text-gold" />
                                    AI Preview
                                </div>
                                {/* Body type badge */}
                                <div className="absolute bottom-4 left-4 bg-white/90 text-black px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm">
                                    {selectedBodyType} build · {currentSkinTone.label}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Controls (2/5) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Skin Tone Selector */}
                            <div>
                                <h3 className="text-xs uppercase tracking-[3px] font-bold mb-5 text-text-gray">Select Your Skin Tone</h3>
                                <div className="space-y-3">
                                    {SKIN_TONES.map((tone) => (
                                        <button
                                            key={tone.id}
                                            onClick={() => setSelectedSkinTone(tone.id)}
                                            className={`w-full flex items-center gap-4 p-3 border transition-all text-left ${selectedSkinTone === tone.id
                                                ? 'border-black bg-neutral-50'
                                                : 'border-neutral-200 hover:border-neutral-400'
                                                }`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full border-2 flex-shrink-0 ${selectedSkinTone === tone.id ? 'border-gold ring-2 ring-gold/20' : 'border-neutral-300'
                                                    }`}
                                                style={{ backgroundColor: tone.color }}
                                            />
                                            <span className="text-sm font-medium">{tone.label}</span>
                                            {selectedSkinTone === tone.id && <Check size={14} className="ml-auto text-gold" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Body Type Selector */}
                            <div>
                                <h3 className="text-xs uppercase tracking-[3px] font-bold mb-5 text-text-gray">Choose Body Type</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {BODY_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setSelectedBodyType(type.id)}
                                            className={`p-3 border text-sm font-medium transition-all ${selectedBodyType === type.id
                                                ? 'border-black bg-black text-white'
                                                : 'border-neutral-200 hover:border-neutral-400'
                                                }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Demo Button (Disabled) */}
                            <button
                                disabled
                                className="w-full py-4 bg-neutral-200 text-neutral-400 text-sm uppercase tracking-widest font-bold cursor-not-allowed"
                                title="Feature launching Q2 2025"
                            >
                                Try It Now — Coming Soon
                            </button>

                            <p className="text-xs text-text-gray italic text-center">
                                *This is a preview mockup. Actual feature launching soon with real-time AI rendering.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ 3. HOW IT WORKS (Steps) ═══════ */}
            <section className="py-20 md:py-24 bg-soft-gray">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-center mb-4 font-[family-name:var(--font-heading)]">
                        How AI Try-On Works
                    </h2>
                    <p className="text-text-gray text-center font-light mb-16 text-sm uppercase tracking-widest">When Live</p>

                    {/* Main 3 steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {STEPS.slice(0, 3).map((step, idx) => (
                            <div key={step.number} className="relative bg-white border border-neutral-200 p-8 text-center hover:-translate-y-1 hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-soft-gray flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/10 transition-colors">
                                    <step.icon size={28} className="text-gold" />
                                </div>
                                <span className="text-4xl font-bold text-neutral-100 absolute top-4 right-4">{step.number}</span>
                                <h3 className="text-sm font-bold uppercase tracking-[2px] mb-3">{step.title}</h3>
                                <p className="text-text-gray text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Optional steps */}
                    <p className="text-center text-xs uppercase tracking-widest text-text-gray mb-6">Plus optional steps</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {STEPS.slice(3).map((step) => (
                            <div key={step.number} className="relative bg-white border border-dashed border-neutral-300 p-6 text-center">
                                <span className="absolute top-3 right-3 bg-gold/10 text-gold text-[9px] uppercase tracking-widest font-bold px-2 py-0.5">Optional</span>
                                <div className="w-12 h-12 bg-soft-gray flex items-center justify-center mx-auto mb-4">
                                    <step.icon size={24} className="text-gold" />
                                </div>
                                <h3 className="text-xs font-bold uppercase tracking-[2px] mb-2">{step.title}</h3>
                                <p className="text-text-gray text-xs leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 4. SKIN TONE SHOWCASE ═══════ */}
            <section className="py-20 md:py-24 bg-white">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-center mb-4 font-[family-name:var(--font-heading)]">
                        Designed for Every Skin Tone
                    </h2>
                    <p className="text-text-gray text-center font-light mb-16 max-w-lg mx-auto">
                        Our AI understands the beautiful diversity of African skin tones — from deep ebony to fair
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {SKIN_TONES.map((tone, idx) => (
                            <div key={tone.id} className="text-center group">
                                <div className="aspect-[3/4] bg-neutral-100 overflow-hidden relative mb-4">
                                    <img
                                        src={MOCKUP_IMAGES[idx]}
                                        alt={`${tone.label} skin tone preview`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 mix-blend-color opacity-15 pointer-events-none"
                                        style={{ backgroundColor: tone.color }}
                                    />
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-white mx-auto mb-2"
                                            style={{ backgroundColor: tone.color }}
                                        />
                                        <p className="text-white text-xs font-bold uppercase tracking-wider">{tone.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center mt-10 text-lg italic text-text-gray font-[family-name:var(--font-heading)]">
                        "No more guessing how colours look on you"
                    </p>
                </div>
            </section>

            {/* ═══════ 5. BENEFITS ═══════ */}
            <section className="py-20 md:py-24 bg-soft-gray">
                <div className="max-w-[1100px] mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-center mb-16 font-[family-name:var(--font-heading)]">
                        Why You'll Love AI Try-On
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BENEFITS.map((b) => (
                            <div key={b.title} className="bg-white border border-neutral-200 p-8 text-center hover:-translate-y-1 hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-soft-gray flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/10 transition-colors">
                                    <b.icon size={28} className="text-gold" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-[2px] mb-3">{b.title}</h3>
                                <p className="text-text-gray text-sm leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 6. EMAIL WAITLIST ═══════ */}
            <section ref={waitlistRef} id="waitlist" className="py-20 md:py-28 text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)' }}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-gold rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gold rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-4 font-[family-name:var(--font-heading)]">
                        Be the First to<br />
                        <span className="text-gold">Try AI Try-On</span>
                    </h2>

                    <p className="text-white/70 text-lg mb-10">
                        Join 500+ people waiting for early access
                    </p>

                    {submitted ? (
                        <div className="space-y-4 py-6">
                            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto">
                                <Check size={32} className="text-gold" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-wider">You're on the List!</h3>
                            <p className="text-white/60">We'll notify you when AI Try-On launches.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                                placeholder="Enter your email address..."
                                className={`w-full px-6 py-4 text-black text-base focus:outline-none focus:ring-2 focus:ring-gold ${emailError ? 'ring-2 ring-red-500' : ''
                                    }`}
                            />
                            {emailError && <p className="text-red-400 text-sm text-left">{emailError}</p>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gold text-black text-sm uppercase tracking-[3px] font-bold hover:bg-white transition-colors disabled:opacity-60"
                            >
                                {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                            </button>
                        </form>
                    )}

                    <div className="mt-10 space-y-3 text-white/50 text-sm">
                        <p className="flex items-center justify-center gap-2"><Check size={14} className="text-gold" /> Get early access before public launch</p>
                        <p className="flex items-center justify-center gap-2"><Check size={14} className="text-gold" /> Exclusive 20% discount when you sign up</p>
                        <p className="flex items-center justify-center gap-2"><Check size={14} className="text-gold" /> No spam, just launch updates</p>
                    </div>
                </div>
            </section>

            {/* ═══════ 7. PRIVACY & FAQ ═══════ */}
            <section className="py-20 md:py-24 bg-white">
                <div className="max-w-[1100px] mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-center mb-16 font-[family-name:var(--font-heading)]">
                        Your Privacy & Security
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {TRUST_CARDS.map((card) => (
                            <div key={card.title} className="border border-neutral-200 p-6 text-center">
                                <div className="w-12 h-12 bg-soft-gray flex items-center justify-center mx-auto mb-4">
                                    <card.icon size={24} className="text-gold" />
                                </div>
                                <h3 className="text-xs font-bold uppercase tracking-[2px] mb-2">{card.title}</h3>
                                <p className="text-text-gray text-xs leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* FAQ */}
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-center mb-10 font-[family-name:var(--font-heading)]">
                        Frequently Asked Questions
                    </h3>
                    <div className="max-w-2xl mx-auto divide-y divide-border-elegant">
                        {FAQS.map((faq, idx) => (
                            <div key={idx}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full py-5 flex items-center justify-between text-left group"
                                >
                                    <span className="text-sm font-bold uppercase tracking-wide group-hover:text-gold transition-colors pr-4">
                                        {faq.q}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-text-gray flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-[400px] opacity-100 pb-5' : 'max-h-0 opacity-0'
                                    }`}>
                                    <p className="text-sm text-text-gray leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 8. FINAL CTA ═══════ */}
            <section className="py-20 md:py-24 bg-soft-gray">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4 font-[family-name:var(--font-heading)]">
                        Ready When You Are
                    </h2>
                    <p className="text-text-gray font-light mb-10">
                        While you wait for AI try-on, explore our current collection of premium Nigerian attire
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop" className="luxury-button px-10 py-4 text-center">
                            Shop Now
                        </Link>
                        <button
                            onClick={scrollToWaitlist}
                            className="luxury-button-outline px-10 py-4 text-center"
                        >
                            Join Waitlist
                        </button>
                    </div>

                    {/* Share */}
                    <div className="mt-14 pt-10 border-t border-border-elegant">
                        <p className="text-xs uppercase tracking-widest text-text-gray mb-4 font-bold">Share with friends</p>
                        <div className="flex gap-3 justify-center">
                            <a href="https://wa.me/?text=Check%20out%20this%20AI%20try-on%20feature%20coming%20to%20Omotailor!%20https://omotailor.com/ai-try-on"
                                target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 border border-border-elegant flex items-center justify-center text-text-gray hover:bg-gold hover:text-white hover:border-gold transition-all"
                                aria-label="Share on WhatsApp">
                                <MessageCircle size={18} />
                            </a>
                            <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20AI%20try-on%20feature%20coming%20to%20Omotailor!&url=https://omotailor.com/ai-try-on"
                                target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                aria-label="Share on Twitter">
                                <Share2 size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
