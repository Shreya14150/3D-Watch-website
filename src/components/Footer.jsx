import React, { useState } from 'react';
import { ArrowRight, Check, Compass, Sparkles, Instagram } from 'lucide-react';
import { playLuxuryClick, playChime } from '../utils/audio';

// Custom Pinterest SVG icon
function PinterestIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.365-.053.22-.175.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    playChime();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-[#050507] border-t border-[#D4AF37]/20 text-[#FAF8F5] pt-20 pb-12 overflow-hidden">
      {/* Decorative top gold gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="inline-block group focus:outline-none">
              <span className="font-serif tracking-[0.35em] text-3xl font-light text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors">
                ÉVÉRA
              </span>
              <span className="block text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]/80 -mt-1 font-sans font-light">
                GENÈVE • HAUTE HORLOGERIE
              </span>
            </a>
            <p className="text-xs md:text-sm text-[#E8DCC0]/75 font-light leading-relaxed max-w-sm">
              Exclusive luxury timepieces crafted for modern women. Melding historic Geneva watchmaking savoir-faire with high-jewellery mastery.
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/80 font-sans">
              "Every Second, A Statement."
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                onClick={playLuxuryClick}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4AF37] text-white/70 hover:text-[#08080A] flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#D4AF37]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                onClick={playLuxuryClick}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4AF37] text-white/70 hover:text-[#08080A] flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#D4AF37]"
                aria-label="Pinterest"
              >
                <PinterestIcon className="w-4 h-4" />
              </a>

              <span className="text-[11px] text-white/40 tracking-wider font-light pl-2">
                @evera.geneve
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium mb-4">
                Collections
              </h4>
              <ul className="space-y-2.5 text-xs text-[#E8DCC0]/70 font-light">
                <li><a href="#collection" className="hover:text-[#FAF8F5] transition-colors">ÉVÉRA Rosé</a></li>
                <li><a href="#collection" className="hover:text-[#FAF8F5] transition-colors">ÉVÉRA Pearl</a></li>
                <li><a href="#collection" className="hover:text-[#FAF8F5] transition-colors">ÉVÉRA Noir</a></li>
                <li><a href="#collection" className="hover:text-[#FAF8F5] transition-colors">ÉVÉRA Aurelle</a></li>
                <li><a href="#collection" className="hover:text-[#FAF8F5] transition-colors">ÉVÉRA Celeste</a></li>
                <li><a href="#collection" className="hover:text-[#FAF8F5] transition-colors">ÉVÉRA Éternelle</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium mb-4">
                Maison
              </h4>
              <ul className="space-y-2.5 text-xs text-[#E8DCC0]/70 font-light">
                <li><a href="#craftsmanship" className="hover:text-[#FAF8F5] transition-colors">Our Craft</a></li>
                <li><a href="#categories" className="hover:text-[#FAF8F5] transition-colors">Style Edits</a></li>
                <li><a href="#craftsmanship" className="hover:text-[#FAF8F5] transition-colors">Customizer</a></li>
                <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Swiss Heritage</a></li>
                <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">VIP Concierge</a></li>
                <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Boutique Finder</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              Private Salon Newsletter
            </h4>
            <p className="text-xs text-[#E8DCC0]/70 font-light leading-relaxed">
              Receive private invitations to private collector salons, new calibre announcements, and bespoke bespoke horology releases.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your private email address"
                className="w-full bg-[#121217] border border-white/15 focus:border-[#D4AF37] rounded-full py-3.5 pl-5 pr-28 text-xs text-[#FAF8F5] placeholder-white/30 focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#D4AF37] hover:bg-[#DFBE79] text-[#08080A] rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center space-x-1"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-[#D4AF37] flex items-center space-x-1.5 animate-fadeIn">
                <Check className="w-3.5 h-3.5" />
                <span>You are welcomed into the ÉVÉRA Private Salon.</span>
              </p>
            )}

            <div className="pt-2 text-[11px] text-white/40 font-light flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Rue du Rhône 42, 1204 Genève, Switzerland</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 font-light gap-4">
          <p>© {new Date().getFullYear()} ÉVÉRA S.A. All Rights Reserved. Swiss Federal Trademark.</p>
          <div className="flex space-x-6 text-[11px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Haute Horlogerie</a>
            <a href="#" className="hover:text-white transition-colors">Authenticity Certification</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
