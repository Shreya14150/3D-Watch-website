import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, RotateCw, Compass, Sparkles, Film, Box } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import HeroVideoExperience from './HeroVideoExperience';
import { playLuxuryClick } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onExploreCollection, onDiscoverCraft }) {
  // 'video' is active by default to showcase the exact exploded watch video animation!
  const [viewMode, setViewMode] = useState('video');
  const heroRef = useRef(null);
  const visualWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current && visualWrapperRef.current) {
        gsap.to(visualWrapperRef.current, {
          scale: 1.08,
          opacity: 0.35,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSwitchMode = (mode) => {
    playLuxuryClick();
    setViewMode(mode);
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen h-[100svh] overflow-hidden flex flex-col justify-between items-center bg-[#08080A] pt-20 md:pt-24 pb-8"
    >
      {/* Background Cinematic Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[radial-gradient(circle,rgba(212,175,55,0.07)_0%,rgba(183,110,121,0.04)_45%,transparent_70%)] blur-3xl" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[950px] h-[350px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.035)_0%,transparent_70%)] blur-2xl" />
      </div>

      {/* Main Visual Stage: Either Video Animation OR 3D Canvas */}
      <div ref={visualWrapperRef} className="absolute inset-0 z-10 flex items-center justify-center">
        {viewMode === 'video' ? (
          <HeroVideoExperience onExploreCollection={onExploreCollection} />
        ) : (
          <HeroCanvas />
        )}
      </div>

      {/* Top Header Row: Monogram Tag + Mode Switcher */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <span className="inline-flex items-center space-x-2 text-[10px] md:text-xs tracking-[0.45em] uppercase text-[#D4AF37]/90 font-light border border-[#D4AF37]/25 px-4 py-1.5 rounded-full backdrop-blur-md bg-[#08080A]/60">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Haute Horlogerie Féminine</span>
          </span>
        </motion.div>

        {/* View Mode Switcher: Cinematic Film vs 3D Orbit */}
        <div className="flex items-center bg-[#0E0E14]/85 backdrop-blur-md p-1 rounded-full border border-[#D4AF37]/30 shadow-xl">
          <button
            onClick={() => handleSwitchMode('video')}
            className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-all duration-300 ${
              viewMode === 'video'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#C98D83] text-[#08080A] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Film className="w-3 h-3" />
            <span>Exploded Film</span>
          </button>

          <button
            onClick={() => handleSwitchMode('3d')}
            className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-all duration-300 ${
              viewMode === '3d'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#C98D83] text-[#08080A] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Box className="w-3 h-3" />
            <span>Interactive 3D</span>
          </button>
        </div>
      </div>

      {/* Floating Brand Typography (Positioned with editorial grace) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center pointer-events-none mt-auto mb-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] font-light text-[#FAF8F5] mb-3 drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
            É V É R A
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl tracking-wide text-[#E0A99E] mb-3 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
            Every Second, A Statement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto"
        >
          <p className="text-xs md:text-sm tracking-[0.22em] uppercase font-light text-[#E8DCC0]/85 leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            "Where timeless craftsmanship meets modern femininity."
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pointer-events-auto"
        >
          <button
            onClick={() => {
              playLuxuryClick();
              onExploreCollection();
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#DFBE79] to-[#C98D83] text-[#08080A] font-medium text-xs tracking-[0.25em] uppercase rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Explore Collection
          </button>

          <button
            onClick={() => {
              playLuxuryClick();
              onDiscoverCraft();
            }}
            className="w-full sm:w-auto px-8 py-3.5 border border-[#FAF8F5]/30 hover:border-[#D4AF37] text-[#FAF8F5] hover:text-[#D4AF37] font-light text-xs tracking-[0.25em] uppercase rounded-full backdrop-blur-md bg-[#08080A]/40 hover:bg-white/[0.08] transition-all duration-300"
          >
            Discover Our Craft
          </button>
        </motion.div>
      </div>

      {/* Bottom Bar: Mode Hint & Scroll Indicator */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between text-white/50 text-[10px] md:text-xs tracking-[0.2em] uppercase font-light pointer-events-auto">
        <div className="flex items-center space-x-2 text-[#E8DCC0]/70">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-[#D4AF37]" />
          <span>
            {viewMode === 'video'
              ? 'Exploded Anatomy & Synchronised Assembly'
              : 'Drag to Rotate 360°'}
          </span>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#collection"
          onClick={playLuxuryClick}
          className="flex items-center space-x-2 text-[#E8DCC0]/70 hover:text-[#FAF8F5] transition-colors group cursor-pointer"
        >
          <span className="group-hover:tracking-[0.25em] transition-all">Scroll to Explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#B76E79]" />
        </a>

        {/* Swiss Atelier Seal */}
        <div className="hidden md:flex items-center space-x-2 text-[#D4AF37]/70">
          <Compass className="w-3.5 h-3.5" />
          <span>Manufacture d'Horlogerie</span>
        </div>
      </div>
    </section>
  );
}
