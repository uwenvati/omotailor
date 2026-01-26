import React from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Product3DViewer from '@/components/Product3DViewer';
import { ArrowRight, ShieldCheck, Cpu, RefreshCcw } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col space-y-8 z-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-neutral-100 px-4 py-1.5 rounded-full w-fit mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-gold animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-600">The Future of Shopping</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-black">
              Nigerian Elegance <br />
              <span className="text-neutral-400">In 3D</span>
            </h1>

            <p className="text-lg text-neutral-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              Experience the heritage of Nigerian craftsmanship. See how our bespoke Agbada and Adire designs fit in high-fidelity 3D visualization.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link href="/shop" className="luxury-button w-full sm:w-auto text-center">
                Explore Heritage
              </Link>
              <Link href="#" className="luxury-button-outline w-full sm:w-auto text-center flex items-center justify-center space-x-2 group">
                <span>Our Craft</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Viewer */}
          <div className="relative h-[400px] lg:h-[600px] w-full animate-float">
            <div className="absolute -inset-4 bg-gold/5 blur-[100px] rounded-full"></div>
            <Product3DViewer
              autoRotate={true}
              modelPath="/assets/models/shirt.glb"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Featured Collection</h2>
              <p className="text-neutral-500 font-light">Curated pieces optimized for high-fidelity 3D visualization.</p>
            </div>
            <Link href="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gold hover:border-gold transition-all">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-luxury-black text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center border border-neutral-800">
                <Cpu className="text-gold" size={32} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest">3D Visualization</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs font-light">
                Interact with every garment in a fully realized 3D environment. Inspect fabric textures and stitching details.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center border border-neutral-800">
                <ShieldCheck className="text-gold" size={32} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest">AI-Powered Sizing</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs font-light">
                Our proprietary AI algorithms calculate your exact measurements for a guaranteed perfect fit every single time.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center border border-neutral-800">
                <RefreshCcw className="text-gold" size={32} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest">Free Returns</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs font-light">
                Not perfectly satisfied? We offer a complimentary 30-day return policy. No questions asked, no hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-px bg-elegant"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tight">
            Ready to Revolutionize <br />
            <span className="text-gold">Your Wardrobe?</span>
          </h2>
          <p className="text-lg text-neutral-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of shoppers who have already upgraded their fashion experience with Omotailor's 3D technology.
          </p>
          <Link href="/shop" className="luxury-button px-12 py-5 text-base">
            Explore All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
