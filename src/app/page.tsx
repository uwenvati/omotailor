"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { products, categories, formatNaira } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import { ArrowRight, Scissors, Gem, Heart } from 'lucide-react';

// Hero images for each column (cycle through product images)
const heroImages = [
  [
    '/assets/images/IMG_9536.jpeg',
    '/assets/images/IMG_9598.jpeg',
    '/assets/images/IMG_0006.JPG',
    '/assets/images/IMG_9765.jpeg',
  ],
  [
    '/assets/images/IMG_9642.jpeg',
    '/assets/images/IMG_0008.JPG',
    '/assets/images/IMG_7260.JPG',
    '/assets/images/IMG_9311.JPG',
  ],
  [
    '/assets/images/IMG_0009.JPG',
    '/assets/images/IMG_7265.JPG',
    '/assets/images/IMG_9313.JPG',
    '/assets/images/IMG_7266.JPG',
  ],
];

function HeroCarousel() {
  const [indices, setIndices] = useState([0, 0, 0]);

  useEffect(() => {
    // Column 1 changes at 0s, 12s, 24s...
    const t1 = setInterval(() => {
      setIndices(prev => [
        (prev[0] + 1) % heroImages[0].length,
        prev[1],
        prev[2],
      ]);
    }, 12000);

    // Column 2 changes at 4s, 16s, 28s...
    const t2Id = setTimeout(() => {
      setIndices(prev => [prev[0], (prev[1] + 1) % heroImages[1].length, prev[2]]);
    }, 4000);
    const t2 = setInterval(() => {
      setIndices(prev => [
        prev[0],
        (prev[1] + 1) % heroImages[1].length,
        prev[2],
      ]);
    }, 12000);

    // Column 3 changes at 8s, 20s, 32s...
    const t3Id = setTimeout(() => {
      setIndices(prev => [prev[0], prev[1], (prev[2] + 1) % heroImages[2].length]);
    }, 8000);
    const t3 = setInterval(() => {
      setIndices(prev => [
        prev[0],
        prev[1],
        (prev[2] + 1) % heroImages[2].length,
      ]);
    }, 12000);

    return () => {
      clearInterval(t1);
      clearTimeout(t2Id);
      clearInterval(t2);
      clearTimeout(t3Id);
      clearInterval(t3);
    };
  }, []);

  const allHeroImages = heroImages.flat();

  return (
    <>
      {/* Desktop: 3-col grid with fading images */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
        {heroImages.map((column, colIdx) => (
          <div key={colIdx} className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
            {column.map((img, imgIdx) => (
              <img
                key={imgIdx}
                src={img}
                alt={`Hero ${colIdx + 1}-${imgIdx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${indices[colIdx] === imgIdx ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: auto-sliding horizontal marquee */}
      <div className="md:hidden overflow-hidden -mx-6">
        <div className="marquee-slide flex" style={{ width: 'max-content' }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-3 shrink-0">
              {allHeroImages.map((img, idx) => (
                <div key={idx} className="w-[60vw] aspect-[3/4] overflow-hidden bg-neutral-100 flex-shrink-0">
                  <img
                    src={img}
                    alt={`Hero slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  const rotatingWords = ['Culture', 'Heritage', 'Tradition', 'Artistry'];
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex(prev => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          {/* Image Carousel */}
          <HeroCarousel />

          {/* Text Content */}
          <div className="text-center mt-12 md:mt-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-black uppercase">
              Nigerian Tailoring,<br />
              Rooted in{' '}
              <span className="inline-block overflow-hidden align-bottom h-[1.15em]">
                <span
                  className={`inline-block text-gold transition-all duration-400 ${isAnimating
                      ? 'translate-y-full opacity-0'
                      : 'translate-y-0 opacity-100'
                    }`}
                >
                  {rotatingWords[wordIndex]}
                </span>
              </span>
            </h1>

            <p className="text-base md:text-lg text-text-gray max-w-xl mx-auto mt-6 leading-relaxed font-light">
              Bespoke craftsmanship that honours our roots. Every stitch tells a story of who we are and where we come from.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button href="/shop" variant="primary" size="large">
                Explore Collection
              </Button>
              <Button href="/shop" variant="secondary" size="large">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOP BY CATEGORY ===== */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="category-card group relative aspect-[4/5] overflow-hidden bg-neutral-100"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <h3 className="text-white text-2xl font-bold uppercase tracking-wide mb-2">
                    {cat.name}
                  </h3>
                  <span className="text-white/80 text-sm uppercase tracking-widest font-medium flex items-center group-hover:text-gold transition-colors">
                    Shop {cat.name}
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUE PROPOSITIONS ===== */}
      <section className="py-16 md:py-24 bg-soft-gray overflow-hidden">
        {/* Desktop: 3-col grid */}
        <div className="hidden md:block max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 flex items-center justify-center">
                <Gem className="text-gold" size={36} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[2px]">Premium Fabrics</h3>
              <p className="text-text-gray text-sm leading-relaxed max-w-[280px]">
                Finest imported materials from around the world, sourced for quality and durability.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 flex items-center justify-center">
                <Scissors className="text-gold" size={36} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[2px]">Expert Tailoring</h3>
              <p className="text-text-gray text-sm leading-relaxed max-w-[280px]">
                Master craftsmen with decades of experience, ensuring every stitch is perfection.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 flex items-center justify-center">
                <Heart className="text-gold" size={36} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[2px]">Cultural Heritage</h3>
              <p className="text-text-gray text-sm leading-relaxed max-w-[280px]">
                Celebrating Nigerian tradition with modern design, honoring our roots in every piece.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: infinite sliding marquee */}
        <div className="md:hidden overflow-hidden">
          <div className="marquee-slide flex" style={{ width: 'max-content' }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                <div className="flex items-center gap-3 px-6 min-w-[260px]">
                  <Gem className="text-gold flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[2px] whitespace-nowrap">Premium Fabrics</h3>
                    <p className="text-text-gray text-xs leading-relaxed whitespace-nowrap">Finest imported materials worldwide</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-border-elegant mx-2 flex-shrink-0" />
                <div className="flex items-center gap-3 px-6 min-w-[260px]">
                  <Scissors className="text-gold flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[2px] whitespace-nowrap">Expert Tailoring</h3>
                    <p className="text-text-gray text-xs leading-relaxed whitespace-nowrap">Decades of master craftsmanship</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-border-elegant mx-2 flex-shrink-0" />
                <div className="flex items-center gap-3 px-6 min-w-[260px]">
                  <Heart className="text-gold flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[2px] whitespace-nowrap">Cultural Heritage</h3>
                    <p className="text-text-gray text-xs leading-relaxed whitespace-nowrap">Honoring Nigerian tradition</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-border-elegant mx-4 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-3">
                Featured Collection
              </h2>
              <p className="text-text-gray font-light">
                Handpicked pieces that define elegance
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gold hover:border-gold transition-all flex items-center gap-2"
            >
              View All Products
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-6">
            Experience Timeless Elegance
          </h2>
          <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Discover clothing that celebrates your heritage and tells your story with every thread.
          </p>
          <Button href="/shop" variant="white" size="large">
            Start Shopping
          </Button>
        </div>
      </section>
    </div>
  );
}
