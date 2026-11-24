import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 700);
          }, 300);
          return 100;
        }
        return prev + 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#08080A] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center px-6">
        <span className="font-serif tracking-[0.4em] text-4xl md:text-5xl font-light text-[#FAF8F5] block mb-2 animate-pulse">
          É V É R A
        </span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] block font-light mb-8">
          GENÈVE • HAUTE HORLOGERIE FÉMININE
        </span>

        {/* Golden Progress Bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B76E79] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mt-4 font-light">
          Initialising 3D Atelier
        </p>
      </div>
    </div>
  );
}
