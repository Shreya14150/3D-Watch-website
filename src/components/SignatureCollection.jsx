import React, { useState, useRef } from 'react';
import { Eye, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
import { SIGNATURE_PRODUCTS } from '../data/products';
import WatchVisualCard from './WatchVisualCard';
import { playLuxuryClick, playWatchTick } from '../utils/audio';

// Interactive 3D tilt card component
function ProductCard({ product, onSelectProduct, onQuickView, onAddToCart }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle luxury 3D tilt (max 8 degrees)
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playWatchTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? '-8px' : '0px'})`,
        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="group relative rounded-2xl bg-[#0E0E12] border border-[#D4AF37]/15 hover:border-[#D4AF37]/45 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.1)]"
    >
      {/* Top Badge & Stone Tag */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-medium bg-[#16161C]/80 backdrop-blur-md border border-[#D4AF37]/20 text-[#D4AF37]">
          {product.badge}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-white/50 flex items-center space-x-1">
          <Gem className="w-3 h-3 text-[#B76E79]" />
          <span>{product.specs.caseDiameter}</span>
        </span>
      </div>

      {/* Product Visual */}
      <div
        onClick={() => {
          playLuxuryClick();
          onSelectProduct(product);
        }}
        className="cursor-pointer pt-6"
      >
        <WatchVisualCard product={product} isHovered={isHovered} />
      </div>

      {/* Card Info & Details */}
      <div className="p-6 pt-2 bg-gradient-to-t from-[#09090B] via-[#0E0E12] to-transparent z-10 flex flex-col justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/75 font-sans mb-1">
            {product.subtitle}
          </div>
          <h3
            onClick={() => {
              playLuxuryClick();
              onSelectProduct(product);
            }}
            className="font-serif text-2xl tracking-[0.1em] text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#E8DCC0]/70 font-light mt-2 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Price & Primary CTA */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <div className="text-[9px] uppercase tracking-widest text-white/40">Price (INR)</div>
            <div className="font-serif text-xl tracking-wider text-[#FAF8F5] font-light">
              {product.priceFormatted}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playLuxuryClick();
                onQuickView(product);
              }}
              className="p-2.5 rounded-full border border-white/10 hover:border-[#D4AF37] text-white/70 hover:text-[#D4AF37] transition-all bg-white/[0.02] hover:bg-white/[0.08]"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* View Details Button */}
            <button
              onClick={() => {
                playLuxuryClick();
                onSelectProduct(product);
              }}
              className="px-4 py-2.5 rounded-full bg-[#1A1A22] hover:bg-[#D4AF37] text-xs uppercase tracking-wider text-[#FAF8F5] hover:text-[#08080A] font-medium border border-white/10 hover:border-[#D4AF37] transition-all duration-300 flex items-center space-x-1.5"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignatureCollection({ onSelectProduct, onQuickView, onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filterTabs = [
    { label: 'All Timepieces', key: 'ALL' },
    { label: 'Rose Gold', key: 'ROSE' },
    { label: 'Diamond Pavé', key: 'DIAMOND' },
    { label: 'Minimalist & Leather', key: 'MINIMAL' }
  ];

  const filteredProducts = SIGNATURE_PRODUCTS.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'ROSE') return p.metal.includes('rose') || p.tags.includes('Rose Gold');
    if (activeFilter === 'DIAMOND') return p.tags.includes('Diamonds') || p.category.includes('DIAMOND');
    if (activeFilter === 'MINIMAL') return p.tags.includes('Minimalist') || p.tags.includes('Leather');
    return true;
  });

  return (
    <section id="collection" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#08080A]">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(183,110,121,0.04)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Signature Collection</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-[0.12em] font-light text-[#FAF8F5] mb-4">
            Time, Beautifully Told.
          </h2>

          <p className="font-serif italic text-xl md:text-2xl text-[#E0A99E] font-light">
            "Discover the art of timeless elegance."
          </p>

          <p className="text-xs md:text-sm text-[#E8DCC0]/70 font-light tracking-wider mt-4 max-w-xl mx-auto leading-relaxed">
            Each timepiece is sculpted in Geneva using certified ethical precious metals, rare nacre dials, and hand-selected VVS diamonds.
          </p>

          {/* Filter Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-10">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  playLuxuryClick();
                  setActiveFilter(tab.key);
                }}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-light transition-all duration-300 ${
                  activeFilter === tab.key
                    ? 'bg-[#D4AF37] text-[#08080A] font-medium shadow-[0_2px_15px_rgba(212,175,55,0.3)]'
                    : 'text-[#E8DCC0]/70 hover:text-[#FAF8F5] bg-white/[0.03] hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Product Grid: 4–6 sample watches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Luxury Reassurance Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white/60">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-2" />
            <h4 className="font-serif text-sm text-[#FAF8F5] tracking-widest uppercase">Swiss Made Guarantee</h4>
            <p className="text-[11px] text-[#E8DCC0]/60 mt-1">Conforms to the strictest Swiss Federal Council horology decree.</p>
          </div>
          <div className="flex flex-col items-center">
            <Gem className="w-5 h-5 text-[#B76E79] mb-2" />
            <h4 className="font-serif text-sm text-[#FAF8F5] tracking-widest uppercase">Top Wesselton VVS Diamonds</h4>
            <p className="text-[11px] text-[#E8DCC0]/60 mt-1">Ethically sourced Kimberley Process certified conflict-free stones.</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-5 h-5 text-[#DFBE79] mb-2" />
            <h4 className="font-serif text-sm text-[#FAF8F5] tracking-widest uppercase">5-Year International Warranty</h4>
            <p className="text-[11px] text-[#E8DCC0]/60 mt-1">Full atelier coverage with complimentary biannual precision servicing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
