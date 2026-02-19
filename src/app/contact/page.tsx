"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter, MessageCircle, ChevronDown, ChevronRight, Send, Check } from 'lucide-react';
import Link from 'next/link';

const FAQ_ITEMS = [
    {
        question: 'How do I place an order?',
        answer: 'Simply browse our collection, add items to your cart, and proceed to checkout. We accept bank transfer and pay on delivery. You will receive a confirmation email with payment instructions after placing your order.',
    },
    {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 5-7 business days within Nigeria. Express shipping (2-3 days) and Priority Overnight delivery are also available at checkout for an additional fee.',
    },
    {
        question: 'Do you offer custom tailoring?',
        answer: 'Yes! Most of our pieces can be custom-tailored to your exact measurements. Select "Custom" as your size when ordering, and our team will contact you to take your measurements.',
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer 30-day returns on unworn items with tags attached. Custom-tailored pieces are final sale. To initiate a return, contact our support team via email or WhatsApp.',
    },
    {
        question: 'How do I track my order?',
        answer: 'You will receive a tracking number via email once your order ships. You can use this tracking number to monitor your delivery in real-time. For any questions, reach out to our support team.',
    },
];

const SUBJECTS = [
    'General Inquiry',
    'Order Question',
    'Custom Tailoring',
    'Partnership Opportunity',
    'Other',
];

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
        if (!formData.subject) newErrors.subject = 'Please select a subject';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitted(true);
    };

    return (
        <div className="pt-28 pb-24">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 mb-8">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <span className="text-black font-bold">Contact</span>
                </nav>

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-3">Contact Us</h1>
                    <p className="text-text-gray font-light text-lg">We'd love to hear from you</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Left Side: Contact Form */}
                    <div className="lg:col-span-3">
                        <h2 className="text-xl font-bold uppercase tracking-[2px] mb-8">Get in Touch</h2>

                        {isSubmitted ? (
                            <div className="bg-success/10 p-8 text-center space-y-4">
                                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                                    <Check size={32} className="text-success" />
                                </div>
                                <h3 className="text-xl font-bold">Message Sent!</h3>
                                <p className="text-text-gray">
                                    Thank you for reaching out. We'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({ name: '', email: '', subject: '', message: '' });
                                    }}
                                    className="text-sm font-bold uppercase tracking-widest border-b border-black hover:text-gold hover:border-gold transition-all"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your full name"
                                        className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors ${errors.name ? 'border-error' : 'border-neutral-200'}`}
                                    />
                                    {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors ${errors.email ? 'border-error' : 'border-neutral-200'}`}
                                    />
                                    {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">Subject *</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white ${errors.subject ? 'border-error' : 'border-neutral-200'}`}
                                    >
                                        <option value="">Select a subject</option>
                                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {errors.subject && <p className="text-xs text-error mt-1">{errors.subject}</p>}
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-medium text-text-gray mb-1.5 block">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={6}
                                        placeholder="Tell us how we can help..."
                                        className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none ${errors.message ? 'border-error' : 'border-neutral-200'}`}
                                    />
                                    {errors.message && <p className="text-xs text-error mt-1">{errors.message}</p>}
                                </div>
                                <button type="submit" className="luxury-button w-full sm:w-auto py-3.5 flex items-center justify-center gap-2">
                                    <Send size={16} />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right Side: Contact Info */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Mail size={18} className="text-gold" />
                                <h3 className="text-sm font-bold uppercase tracking-[2px]">Email</h3>
                            </div>
                            <a href="mailto:support@omotailor.com" className="text-text-gray hover:text-black transition-colors text-sm">
                                support@omotailor.com
                            </a>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Phone size={18} className="text-gold" />
                                <h3 className="text-sm font-bold uppercase tracking-[2px]">Phone</h3>
                            </div>
                            <a href="tel:+2341234567890" className="text-text-gray hover:text-black transition-colors text-sm block">
                                +234-123-456-7890
                            </a>
                            <p className="text-xs text-text-gray mt-1">Mon-Fri: 9AM-6PM WAT</p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin size={18} className="text-gold" />
                                <h3 className="text-sm font-bold uppercase tracking-[2px]">Address</h3>
                            </div>
                            <p className="text-text-gray text-sm leading-relaxed">
                                123 Fashion Street<br />
                                Victoria Island<br />
                                Lagos, Nigeria
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Clock size={18} className="text-gold" />
                                <h3 className="text-sm font-bold uppercase tracking-[2px]">Business Hours</h3>
                            </div>
                            <div className="text-sm text-text-gray space-y-1">
                                <p>Monday — Friday: 9AM — 6PM</p>
                                <p>Saturday: 10AM — 4PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>

                        <div className="h-px bg-border-elegant" />

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-[2px] mb-4">Follow Us</h3>
                            <div className="flex gap-3">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={18} />
                                </a>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={18} />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-border-elegant flex items-center justify-center text-text-gray hover:bg-black hover:text-white hover:border-black transition-all"
                                    aria-label="Twitter"
                                >
                                    <Twitter size={18} />
                                </a>
                                <a
                                    href="https://wa.me/2341234567890?text=Hello!%20I%20have%20a%20question%20about%20your%20products."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-border-elegant flex items-center justify-center text-text-gray hover:bg-gold hover:text-white hover:border-gold transition-all"
                                    aria-label="WhatsApp"
                                >
                                    <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24 pt-16 border-t border-border-elegant" id="faq">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-text-gray font-light">Find quick answers to common questions</p>
                    </div>

                    <div className="max-w-2xl mx-auto divide-y divide-border-elegant">
                        {FAQ_ITEMS.map((faq, idx) => (
                            <div key={idx}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full py-5 flex items-center justify-between text-left group"
                                >
                                    <span className="text-sm font-bold uppercase tracking-wide group-hover:text-gold transition-colors pr-4">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-text-gray flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-[300px] opacity-100 pb-5' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-sm text-text-gray leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
