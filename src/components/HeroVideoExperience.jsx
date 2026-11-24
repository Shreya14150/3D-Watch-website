import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Layers, Info, Check, Eye } from 'lucide-react';
import { playLuxuryClick, playWatchTick } from '../utils/audio';

// Interactive layer breakdown hotspots corresponding to the exploded view in the video
const EXPLODED_HOTSPOTS = [
  {
    id: 'crystal',
    title: 'Domed Sapphire Crystal',
    subtitle: 'Scratch-Proof Optical Purity',
    desc: 'Beveled synthetic sapphire crystal with dual-sided anti-reflective coating for distortion-free exhibition of the skeleton movement.',
    top: '22%',
    left: '74%',
    showAtTime: [0, 3.2, 6.8, 9.5] // Visible when exploded
  },
  {
    id: 'bezel',
    title: '18K Rose Gold Bezel',
    subtitle: 'Mirror-Polished Fluting',
    desc: 'Individually lathe-turned stepped bezel ring, hand-polished to a mirror lustre with micro-chamfered retaining rim.',
    top: '26%',
    left: '60%',
    showAtTime: [0, 3.2, 6.8, 9.5]
  },
  {
    id: 'dial',
    title: 'Skeleton Roman Numeral Dial',
    subtitle: 'Sunray Guilloché Chapter Ring',
    desc: 'Matte obsidian ring set with applied 18K gold Roman numerals and open-heart circular apertures revealing the gear train.',
    top: '40%',
    left: '52%',
    showAtTime: [0, 3.2, 6.8, 9.5]
  },
  {
    id: 'calibre',
    title: 'Swiss Manufacture Calibre',
    subtitle: 'Oscillating Balance & Gear Train',
    desc: '28,800 VPH mechanical movement featuring 26 ruby jewel bearings, circular Côtes de Genève bridges, and high-inertia balance wheel.',
    top: '52%',
    left: '42%',
    showAtTime: [0, 3.2, 6.8, 9.5]
  },
  {
    id: 'case',
    title: '18K Rose Gold Case & Crown',
    subtitle: 'Sculpted Lugs & Fluted Crown',
    desc: 'Hermetically sealed 50-meter water-resistant case with curved ergonomic lugs and a fluted winding crown with sapphire cabochon.',
    top: '64%',
    left: '32%',
    showAtTime: [0, 3.2, 6.8, 9.5]
  },
  {
    id: 'strap',
    title: 'Alligator Leather & Deployant',
    subtitle: 'Hand-Stitched Italian Leather',
    desc: 'Matte black hand-stitched alligator leather strap fastened with a double-deployant butterfly clasp in matching 18K rose gold.',
    top: '76%',
    left: '18%',
    showAtTime: [0, 3.2, 6.8, 9.5]
  }
];

export default function HeroVideoExperience({ onExploreCollection }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(9.5);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [showHotspotPins, setShowHotspotPins] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) setDuration(video.duration);
    };

    const handleEnded = () => {
      // Loop video seamlessly
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Auto-play muted
    video.play().catch(() => {
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    playLuxuryClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    playLuxuryClick();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Determine current phase of animation (exploded vs assembled)
  const isExplodedPhase = (currentTime >= 0 && currentTime <= 3.2) || (currentTime >= 6.8);
  const phaseLabel = isExplodedPhase ? 'Deconstructed Anatomy' : 'Harmonic Assembly';

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Background Soft Glows */}
      <div className="absolute inset-0 bg-[#08080A] pointer-events-none" />
      <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,rgba(183,110,121,0.04)_40%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Main Video Container with Vignette Mask */}
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center px-4">
        <div
          className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[16/9] max-h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.95)]"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 85% at center, black 65%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at center, black 65%, transparent 100%)'
          }}
        >
          <video
            ref={videoRef}
            src="/hero-watch-animation.mp4"
            className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[1.03]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />

          {/* Interactive Layer Hotspot Pins overlaid on the video */}
          {showHotspotPins && isExplodedPhase && (
            <div className="absolute inset-0 pointer-events-auto">
              {EXPLODED_HOTSPOTS.map((hs) => {
                const isSelected = activeHotspot === hs.id;
                return (
                  <div
                    key={hs.id}
                    style={{ top: hs.top, left: hs.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <button
                      onClick={() => {
                        playWatchTick();
                        setActiveHotspot(isSelected ? null : hs.id);
                      }}
                      className="relative flex items-center justify-center p-2 focus:outline-none"
                      title={hs.title}
                    >
                      {/* Pulsing ring */}
                      <span className="absolute w-7 h-7 rounded-full border border-[#D4AF37] animate-ping opacity-75" />
                      {/* Center dot */}
                      <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#B76E79] scale-125 shadow-[0_0_15px_#B76E79]'
                          : 'bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] group-hover:scale-110'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#08080A]" />
                      </span>
                    </button>

                    {/* Tooltip Card */}
                    {isSelected && (
                      <div className="absolute left-6 -top-12 z-30 w-64 md:w-72 p-4 rounded-2xl bg-[#0E0E14]/95 backdrop-blur-xl border border-[#D4AF37]/35 shadow-[0_15px_40px_rgba(0,0,0,0.9)] animate-fadeIn pointer-events-auto">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                            {hs.subtitle}
                          </span>
                          <button
                            onClick={() => setActiveHotspot(null)}
                            className="text-white/40 hover:text-white text-xs px-1"
                          >
                            ×
                          </button>
                        </div>
                        <h4 className="font-serif text-base text-[#FAF8F5] tracking-wide mb-1.5">
                          {hs.title}
                        </h4>
                        <p className="text-[11px] text-[#E8DCC0]/85 leading-relaxed font-light">
                          {hs.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Status Pill & Video Controls Bar */}
      <div className="absolute bottom-8 md:bottom-12 z-30 flex flex-col items-center space-y-3 pointer-events-auto">
        {/* Phase Pill */}
        <div className="flex items-center space-x-3 px-4 py-1.5 rounded-full bg-[#0E0E14]/85 backdrop-blur-md border border-[#D4AF37]/25 shadow-xl text-xs">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8DCC0]">
            {phaseLabel}
          </span>
          <span className="text-white/30 text-[10px]">|</span>
          <span className="text-[10px] font-mono text-white/50">
            {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
          </span>
        </div>

        {/* Video Scrubber & Control Buttons */}
        <div className="flex items-center space-x-4 px-5 py-2 rounded-full bg-[#0E0E14]/80 backdrop-blur-md border border-white/10 shadow-2xl">
          <button
            onClick={togglePlay}
            className="text-[#FAF8F5] hover:text-[#D4AF37] transition-colors p-1"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
            aria-label="Play/Pause"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleRestart}
            className="text-white/60 hover:text-[#D4AF37] transition-colors p-1"
            title="Restart Animation"
            aria-label="Restart"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Scrubber slider */}
          <input
            type="range"
            min="0"
            max={duration || 9.5}
            step="0.05"
            value={currentTime}
            onChange={handleSeek}
            className="w-28 sm:w-44 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            title="Scrub Animation Timeline"
          />

          {/* Toggle Hotspot Pins */}
          <button
            onClick={() => {
              playLuxuryClick();
              setShowHotspotPins(!showHotspotPins);
            }}
            className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full transition-all flex items-center space-x-1 ${
              showHotspotPins
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                : 'text-white/40 hover:text-white'
            }`}
            title="Toggle Exploded Layer Pins"
          >
            <Eye className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Anatomy Pins</span>
          </button>
        </div>
      </div>
    </div>
  );
}
