import React, { useState } from 'react';
import { Sparkles, Layers, Sliders, Check, Info, Rotate3d, Compass, Gem, ArrowRight, ShieldCheck } from 'lucide-react';
import WatchmakingCanvas from './WatchmakingCanvas';
import { WATCH_CUSTOMIZER_OPTIONS } from '../data/products';
import { playLuxuryClick, playChime } from '../utils/audio';

export default function WatchmakingSection({ onCustomOrder }) {
  // Customizer state
  const [selectedCase, setSelectedCase] = useState('rose-gold');
  const [selectedStrap, setSelectedStrap] = useState('metal-bracelet');
  const [selectedDial, setSelectedDial] = useState('pearl-white');

  // Active Hotspot inspection state
  const [activeHotspot, setActiveHotspot] = useState('movement');

  const caseMap = {
    'rose-gold': '#C98D83',
    'yellow-gold': '#D4AF37',
    'silver': '#E5E5EB'
  };

  const strapTypeMap = {
    'metal-bracelet': 'metal',
    'leather': 'leather',
    'ceramic': 'ceramic'
  };

  const hotspotDetails = {
    dial: {
      title: 'Guilloché & Mother-of-Pearl',
      subtitle: 'The Face of Iridescence',
      content: 'Harvested from natural Australian oyster shells, each mother-of-pearl dial requires over 40 distinct manual operations. Turned on a traditional rose-engine lathe to etch subtle sunray patterns, it produces an iridescence that cannot be replicated by any synthetic technique.',
      metric: '0.3 mm Dial Thickness',
      tag: 'Hand-Finished Craft'
    },
    crown: {
      title: 'Ergonomic Crown & Gemstone',
      subtitle: 'Precision Winding Touch',
      content: 'Micro-milled fluted ridges provide effortless tactile grip when hand-winding. Hermetically sealed with dual internal O-rings to provide 50-meter water resistance, capped with a natural 0.25-carat cabochon gemstone.',
      metric: '50 Metres (5 ATM) Seal',
      tag: 'Hermetic Architecture'
    },
    bracelet: {
      title: 'Articulated 5-Link Jubilee',
      subtitle: 'Fluid Ergonomic Silhouette',
      content: 'Engineered with alternating mirror-polished center links and satin-brushed outer flanks. Each link is hand-assembled with micro-screws and contours organically to the curvature of the feminine wrist, secured by a seamless double-deployant butterfly clasp.',
      metric: '18K Gold / 316L Solid Alloy',
      tag: 'Jewellery Engineering'
    },
    movement: {
      title: 'Swiss Manufacture Calibre 8200',
      subtitle: 'Heartbeat of 28,800 VPH',
      content: 'Beating at 4 Hertz (28,800 vibrations per hour), the automatic skeleton calibre features 26 synthetic ruby bearings, an openwork winding rotor with heavy tungsten rim, and Côtes de Genève circular striping on all visible bridge plates.',
      metric: '48-Hour Reserve • 28,800 VPH',
      tag: 'Haute Horlogerie Heart'
    }
  };

  // Base bespoke price calculation
  const basePrice = 385000;
  const currentCaseDiff = WATCH_CUSTOMIZER_OPTIONS.caseMaterials.find(c => c.id === selectedCase)?.priceDiff || 0;
  const currentPrice = basePrice + currentCaseDiff;
  const currentPriceFormatted = `₹${currentPrice.toLocaleString('en-IN')}`;

  const handleCaseChange = (id) => {
    playLuxuryClick();
    setSelectedCase(id);
  };

  const handleStrapChange = (id) => {
    playLuxuryClick();
    setSelectedStrap(id);
  };

  const handleDialChange = (id) => {
    playLuxuryClick();
    setSelectedDial(id);
  };

  const handleHotspotClick = (id) => {
    playLuxuryClick();
    setActiveHotspot(id);
  };

  return (
    <section id="craftsmanship" className="relative py-28 md:py-36 bg-[#08080A] text-[#FAF8F5] overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#D4AF37]/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#D4AF37]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Haute Horlogerie & Atelier</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-[0.12em] font-light text-[#FAF8F5] mb-4">
            Beauty in Every Movement.
          </h2>

          <p className="font-serif italic text-xl md:text-2xl text-[#E0A99E] font-light">
            "Watchmaking elevated into high art. Witness the beating heart within."
          </p>

          <p className="text-xs md:text-sm text-[#E8DCC0]/70 font-light tracking-wider mt-4 max-w-xl mx-auto leading-relaxed">
            Inspect the internal gear train, rotating balance wheel, and jewels. Touch the interactive hotspots or configure your bespoke timepiece below.
          </p>
        </div>

        {/* Hotspot Quick Select Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8">
          {[
            { id: 'movement', label: 'Internal Movement' },
            { id: 'dial', label: 'Guilloché Dial' },
            { id: 'crown', label: 'Winding Crown' },
            { id: 'bracelet', label: 'Bracelet & Clasp' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleHotspotClick(item.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 ${
                activeHotspot === item.id
                  ? 'bg-[#B76E79] text-white shadow-[0_0_20px_rgba(183,110,121,0.4)]'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeHotspot === item.id ? 'bg-white' : 'bg-[#D4AF37]'}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Stage: 3D Canvas + Hotspot Insight + Customizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Interactive Mechanical Watch Viewport (7 Cols) */}
          <div className="lg:col-span-7 h-[500px] md:h-[620px] rounded-3xl bg-gradient-to-b from-[#101015] to-[#0A0A0D] border border-[#D4AF37]/20 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0">
              <WatchmakingCanvas
                caseColor={caseMap[selectedCase]}
                dialTone={selectedDial}
                strapType={strapTypeMap[selectedStrap]}
                activeHotspot={activeHotspot}
                onSelectHotspot={handleHotspotClick}
              />
            </div>

            {/* Top Toolbar Overlay */}
            <div className="relative z-10 p-6 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.25em] font-medium bg-[#08080A]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37]">
                Live 3D Calibre 8200
              </span>

              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-white/60 bg-[#08080A]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <Rotate3d className="w-3.5 h-3.5 text-[#D4AF37] animate-spin-slow" />
                <span>Orbit • Zoom • Tap Hotspots</span>
              </div>
            </div>

            {/* Bottom Current Configuration Summary */}
            <div className="relative z-10 p-6 bg-gradient-to-t from-[#08080A]/95 via-[#08080A]/80 to-transparent flex items-center justify-between pointer-events-none">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37]">Active Configuration</span>
                <div className="font-serif text-lg tracking-wider text-[#FAF8F5] capitalize">
                  {selectedCase.replace('-', ' ')} • {selectedStrap.replace('-', ' ')}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest text-white/40">Estimated Price</span>
                <div className="font-serif text-xl tracking-wider text-[#FAF8F5]">
                  {currentPriceFormatted}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hotspot Story & Interactive Customization Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hotspot Insight Card */}
            {activeHotspot && hotspotDetails[activeHotspot] && (
              <div className="p-6 md:p-8 rounded-3xl bg-[#101016] border border-[#B76E79]/30 shadow-xl relative overflow-hidden transition-all duration-500">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[9px] uppercase tracking-[0.25em] font-medium bg-[#B76E79]/20 text-[#E0A99E] border border-[#B76E79]/30">
                    {hotspotDetails[activeHotspot].tag}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-medium">
                    {hotspotDetails[activeHotspot].metric}
                  </span>
                </div>

                <h3 className="font-serif text-2xl tracking-[0.08em] text-[#FAF8F5] mb-1">
                  {hotspotDetails[activeHotspot].title}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]/80 font-sans mb-3">
                  {hotspotDetails[activeHotspot].subtitle}
                </p>
                <p className="text-xs text-[#E8DCC0]/80 leading-relaxed font-light">
                  {hotspotDetails[activeHotspot].content}
                </p>
              </div>
            )}

            {/* Interactive Customization Controls Panel */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#0E0E13] border border-white/10 shadow-2xl">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-6">
                <Sliders className="w-4 h-4 text-[#D4AF37]" />
                <span>Bespoke Atelier Customizer</span>
              </div>

              {/* 1. CASE MATERIAL */}
              <div className="mb-6">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3">
                  1. Case Material
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {WATCH_CUSTOMIZER_OPTIONS.caseMaterials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => handleCaseChange(mat.id)}
                      className={`py-3 px-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex flex-col items-center justify-center border ${
                        selectedCase === mat.id
                          ? 'border-[#D4AF37] bg-[#1A1A24] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/70'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full mb-1.5 border border-white/20 shadow-inner"
                        style={{ backgroundColor: mat.color }}
                      />
                      <span className="text-[10px] font-light text-center leading-tight">
                        {mat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. STRAP MATERIAL */}
              <div className="mb-6">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3">
                  2. Strap Configuration
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {WATCH_CUSTOMIZER_OPTIONS.straps.map((strap) => (
                    <button
                      key={strap.id}
                      onClick={() => handleStrapChange(strap.id)}
                      className={`py-3 px-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex flex-col items-center justify-center border ${
                        selectedStrap === strap.id
                          ? 'border-[#D4AF37] bg-[#1A1A24] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/70'
                      }`}
                    >
                      <span className="text-[11px] font-medium text-center leading-tight mb-0.5">
                        {strap.name}
                      </span>
                      <span className="text-[8px] text-white/40 text-center">
                        {strap.type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. DIAL SELECTION */}
              <div className="mb-6">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3">
                  3. Dial Enamel & Nacre
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {WATCH_CUSTOMIZER_OPTIONS.dials.map((dial) => (
                    <button
                      key={dial.id}
                      onClick={() => handleDialChange(dial.id)}
                      className={`py-3 px-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex flex-col items-center justify-center border ${
                        selectedDial === dial.id
                          ? 'border-[#D4AF37] bg-[#1A1A24] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/70'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full mb-1.5 border border-white/20 shadow-inner"
                        style={{ backgroundColor: dial.color }}
                      />
                      <span className="text-[10px] font-light text-center leading-tight">
                        {dial.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order / Reserve Bespoke Timepiece Button */}
              <button
                onClick={() => {
                  playChime();
                  onCustomOrder({
                    case: selectedCase,
                    strap: selectedStrap,
                    dial: selectedDial,
                    price: currentPriceFormatted
                  });
                }}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#DFBE79] to-[#C98D83] text-[#08080A] font-medium text-xs tracking-[0.25em] uppercase rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.55)] transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
              >
                <span>Order Custom Timepiece • {currentPriceFormatted}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Final Luxury Brand Statement (Required in Prompt) */}
        <div className="mt-28 md:mt-36 text-center max-w-4xl mx-auto py-16 px-6 border-y border-[#D4AF37]/20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#08080A] px-4">
            <Compass className="w-5 h-5 text-[#D4AF37]" />
          </div>

          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-sans mb-4">
            É V É R A • M A N I F E S T O
          </p>

          <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-[0.08em] font-light text-[#FAF8F5] leading-tight">
            "Not just a measure of time. A reflection of you."
          </blockquote>

          <p className="text-xs md:text-sm text-[#E8DCC0]/70 font-light tracking-[0.2em] uppercase mt-6 max-w-xl mx-auto">
            Handcrafted with devotion in our Geneva ateliers. Destined to be treasured for generations.
          </p>
        </div>
      </div>
    </section>
  );
}
