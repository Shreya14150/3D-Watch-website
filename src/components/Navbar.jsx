import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Volume2, VolumeX, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { toggleAudio, getAudioState, playLuxuryClick } from '../utils/audio';

export default function Navbar({ onOpenSearch, onOpenCart, cartCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = toggleAudio();
    setSoundActive(active);
  };

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Categories', href: '#categories' },
    { label: 'Craftsmanship', href: '#craftsmanship' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#08080A]/85 backdrop-blur-md border-b border-[#D4AF37]/15 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#08080A]/80 via-[#08080A]/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={playLuxuryClick}
              className="text-xs uppercase tracking-[0.25em] font-light text-[#E8DCC0]/80 hover:text-[#FAF8F5] transition-colors duration-300 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D4AF37] to-[#B76E79] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Center: Brand Logo */}
        <div className="text-center">
          <a
            href="#"
            onClick={playLuxuryClick}
            className="inline-block group focus:outline-none"
          >
            <span className="font-serif tracking-[0.35em] text-2xl md:text-3xl font-light text-[#FAF8F5] transition-colors duration-300 group-hover:text-[#D4AF37]">
              ÉVÉRA
            </span>
            <span className="block text-[8px] md:text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]/80 -mt-1 font-sans font-light">
              GENÈVE • HAUTE HORLOGERIE
            </span>
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-5 md:space-x-7">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="text-[#E8DCC0]/70 hover:text-[#FAF8F5] transition-colors duration-300 p-1.5 rounded-full hover:bg-white/5 relative group"
            title={soundActive ? 'Mute Horological Sound' : 'Enable Mechanical Soundscape'}
            aria-label="Toggle Soundscape"
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            <span className="sr-only">Toggle sound</span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => {
              playLuxuryClick();
              onOpenSearch();
            }}
            className="text-[#E8DCC0]/70 hover:text-[#FAF8F5] transition-colors duration-300 p-1.5 rounded-full hover:bg-white/5"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Shopping Bag */}
          <button
            onClick={() => {
              playLuxuryClick();
              onOpenCart();
            }}
            className="text-[#E8DCC0]/70 hover:text-[#FAF8F5] transition-colors duration-300 p-1.5 rounded-full hover:bg-white/5 relative flex items-center"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B76E79] text-[#08080A] font-bold text-[9px] flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              playLuxuryClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden text-[#E8DCC0]/80 hover:text-[#FAF8F5] p-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-[#08080A]/95 backdrop-blur-2xl z-40 px-8 py-12 flex flex-col justify-between border-t border-[#D4AF37]/15 animate-fadeIn">
          <nav className="flex flex-col space-y-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  playLuxuryClick();
                  setMobileMenuOpen(false);
                }}
                className="text-lg uppercase tracking-[0.3em] font-serif text-[#FAF8F5] hover:text-[#D4AF37] transition-colors duration-300 border-b border-white/5 pb-3 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]/60" />
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-[#D4AF37]/80 font-serif mb-2">
              Every Second, A Statement.
            </p>
            <p className="text-[10px] text-white/40 tracking-wider font-light">
              Swiss Haute Horlogerie Atelier • Rue du Rhône, Genève
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
