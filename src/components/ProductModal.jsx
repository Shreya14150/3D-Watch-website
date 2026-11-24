import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Shield, Check, Sparkles, Calendar, Heart, Share2, Gem } from 'lucide-react';
import WatchVisualCard from './WatchVisualCard';
import { playLuxuryClick, playChime } from '../utils/audio';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [added, setAdded] = useState(false);
  const [bookedConcierge, setBookedConcierge] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    playChime();
    setAdded(true);
    onAddToCart(product);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBookConcierge = () => {
    playLuxuryClick();
    setBookedConcierge(true);
    setTimeout(() => setBookedConcierge(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#08080A]/90 backdrop-blur-xl animate-fadeIn">
      {/* Backdrop click closer */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#0E0E12] border border-[#D4AF37]/30 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.1)] flex flex-col md:flex-row overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            playLuxuryClick();
            onClose();
          }}
          className="absolute top-5 right-5 z-30 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Visual Presentation */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-[#121217] via-[#0E0E12] to-[#08080A] flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/5">
          <div className="absolute top-6 left-6 flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-[#16161C] border border-[#D4AF37]/25 text-[#D4AF37]">
              {product.badge}
            </span>
          </div>

          {/* Watch Display with hover interaction */}
          <div className="w-full max-w-xs py-4">
            <WatchVisualCard product={product} isHovered={true} />
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/60 font-sans mt-2">
            Swiss Made • Certified Chronometer
          </p>
        </div>

        {/* Right Side: Product Details & Specifications */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans mb-1">
              {product.subtitle}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-[0.08em] text-[#FAF8F5] mb-2 font-light">
              {product.name}
            </h2>

            {/* Price section */}
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="font-serif text-3xl tracking-wider text-[#FAF8F5]">
                {product.priceFormatted}
              </span>
              <span className="text-xs uppercase tracking-wider text-white/40">
                ({product.usdPrice} USD)
              </span>
            </div>

            {/* Tab switchers: Overview vs Specs */}
            <div className="flex space-x-6 border-b border-white/10 pb-2 mb-4">
              <button
                onClick={() => {
                  playLuxuryClick();
                  setActiveTab('overview');
                }}
                className={`text-xs uppercase tracking-[0.2em] pb-2 transition-colors relative ${
                  activeTab === 'overview' ? 'text-[#FAF8F5]' : 'text-white/40 hover:text-white/70'
                }`}
              >
                Overview
                {activeTab === 'overview' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                )}
              </button>
              <button
                onClick={() => {
                  playLuxuryClick();
                  setActiveTab('specs');
                }}
                className={`text-xs uppercase tracking-[0.2em] pb-2 transition-colors relative ${
                  activeTab === 'specs' ? 'text-[#FAF8F5]' : 'text-white/40 hover:text-white/70'
                }`}
              >
                Specifications
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                )}
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' ? (
              <div className="space-y-4">
                <p className="text-xs md:text-sm text-[#E8DCC0]/80 leading-relaxed font-light">
                  {product.description}
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-white/70">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Complimentary insured worldwide shipping</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-white/70">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>5-year international Haute Horlogerie warranty</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-white/70">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Handcrafted lacquer presentation box & certification</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-2 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between py-1.5 border-b border-white/5 text-[11px]"
                  >
                    <span className="text-white/40 uppercase tracking-wider capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-[#FAF8F5] text-right font-light ml-4">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={handleAdd}
              disabled={added}
              className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#DFBE79] to-[#C98D83] text-[#08080A] font-medium text-xs tracking-[0.25em] uppercase rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.55)] transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-[#08080A]" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag • {product.priceFormatted}</span>
                </>
              )}
            </button>

            <button
              onClick={handleBookConcierge}
              className="w-full py-3 border border-[#FAF8F5]/20 hover:border-[#D4AF37] text-white/80 hover:text-[#D4AF37] text-xs uppercase tracking-[0.2em] rounded-full transition-all flex items-center justify-center space-x-2 bg-white/[0.02]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {bookedConcierge
                  ? 'Concierge Request Received — We Will Contact You'
                  : 'Book Private Boutique Viewing'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
