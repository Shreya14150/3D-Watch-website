import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Gem, Compass } from 'lucide-react';
import { SIGNATURE_PRODUCTS } from '../data/products';
import { STYLE_CATEGORIES } from '../data/categories';
import { playLuxuryClick } from '../utils/audio';

export default function SearchModal({ isOpen, onClose, onSelectProduct, onSelectCategory }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = SIGNATURE_PRODUCTS.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const filteredCategories = STYLE_CATEGORIES.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#08080A]/95 backdrop-blur-2xl animate-fadeIn">
      {/* Container */}
      <div className="relative w-full max-w-3xl bg-[#0E0E14] border border-[#D4AF37]/25 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8">
        {/* Search Input */}
        <div className="relative flex items-center border-b border-white/10 pb-4">
          <Search className="w-5 h-5 text-[#D4AF37] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search watches, diamonds, rose gold, movements..."
            className="w-full bg-transparent text-lg text-[#FAF8F5] placeholder-white/30 focus:outline-none font-light tracking-wide"
            autoFocus
          />
          <button
            onClick={() => {
              playLuxuryClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto mt-6 space-y-6 pr-2">
          {/* Timepieces */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              Timepieces ({filteredProducts.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    playLuxuryClick();
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#D4AF37]/30 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-serif text-sm text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors">
                      {p.name}
                    </h5>
                    <p className="text-[10px] text-white/50">{p.subtitle}</p>
                    <span className="text-[11px] font-serif text-[#FAF8F5]/80 mt-1 block">
                      {p.priceFormatted}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              Style Edits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredCategories.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    playLuxuryClick();
                    onSelectCategory(c.id);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#D4AF37]/30 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-serif text-sm text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors">
                      {c.title}
                    </h5>
                    <p className="text-[10px] text-white/50">{c.subtitle}</p>
                  </div>
                  <Compass className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
