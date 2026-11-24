import React from 'react';
import { ArrowUpRight, Sparkles, Gem, Compass, Clock } from 'lucide-react';
import { STYLE_CATEGORIES } from '../data/categories';
import { playLuxuryClick } from '../utils/audio';

export default function ExploreByStyle({ onSelectCategory }) {
  return (
    <section id="categories" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#0A0A0D] overflow-hidden">
      {/* Background Subtle Luxury Ambience */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.035)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(183,110,121,0.035)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Curated Horological Aesthetics</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-[0.12em] font-light text-[#FAF8F5] mb-4">
            An Expression of You.
          </h2>

          <p className="font-serif italic text-xl md:text-2xl text-[#E0A99E] font-light">
            "Four distinct expressions of feminine grace and Swiss savoir-faire."
          </p>
        </div>

        {/* Sophisticated Asymmetric Editorial Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {STYLE_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className={`${cat.gridSpan} group relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-[480px] bg-[#121217] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-700 flex flex-col justify-between p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.7)]`}
            >
              {/* Background High-Fashion Photography */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:brightness-[0.55]"
                />
                {/* Luxury Vignette & Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.85)_0%,transparent_60%)]" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${cat.accent}15 0%, transparent 75%)`
                  }}
                />
              </div>

              {/* Card Top: Numbering & Count Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-serif text-3xl md:text-4xl font-light text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors">
                  {cat.number}
                </span>

                <span className="px-3.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-light bg-[#08080A]/70 backdrop-blur-md border border-white/10 text-white/80 group-hover:border-[#D4AF37]/30 transition-colors">
                  {cat.count}
                </span>
              </div>

              {/* Card Bottom: Editorial Typography & Explore Action */}
              <div className="relative z-10 mt-auto">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans mb-1.5">
                  {cat.subtitle}
                </div>

                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[0.08em] font-light text-[#FAF8F5] mb-3 group-hover:text-[#FAF8F5] transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs md:text-sm text-[#E8DCC0]/75 font-light leading-relaxed mb-6 max-w-md line-clamp-3">
                  {cat.description}
                </p>

                {/* Highlights tags */}
                <div className="hidden sm:flex flex-wrap gap-2 mb-6">
                  {cat.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[9px] uppercase tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Explore Button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      playLuxuryClick();
                      onSelectCategory(cat.id);
                    }}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors font-medium"
                  >
                    <span>Explore Edit</span>
                    <ArrowUpRight className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <span className="text-[10px] text-white/40 tracking-wider font-light">
                    Geneva Atelier
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
