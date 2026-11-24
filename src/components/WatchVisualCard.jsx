import React from 'react';

// Custom photorealistic luxury watch illustration tailored to each signature model
export default function WatchVisualCard({ product, isHovered = false }) {
  const { id } = product;

  // Colors based on product model
  const config = {
    'evara-rose': {
      caseGrad: ['#FCE4E4', '#E0A99E', '#B76E79', '#793D45'],
      dialBg: 'radial-gradient(circle, #FFF5F7 0%, #F8DCE0 45%, #E8B9C0 100%)',
      dialTextColor: '#4A2A2F',
      bezelDiamonds: true,
      braceletColor: '#C98D83',
      handsColor: '#B76E79',
      hasSubdial: false,
      isLeather: false
    },
    'evara-pearl': {
      caseGrad: ['#FFFFFF', '#E6E6EB', '#B8B9C2', '#7D7E8A'],
      dialBg: 'radial-gradient(circle, #FFFFFF 0%, #F0F0F5 50%, #D8D8E5 100%)',
      dialTextColor: '#2B2C33',
      bezelDiamonds: false,
      braceletColor: '#D8D8E0',
      handsColor: '#6B6D7A',
      hasSubdial: false,
      isLeather: false
    },
    'evara-noir': {
      caseGrad: ['#FFE8B3', '#D4AF37', '#997A1A', '#4A3B0D'],
      dialBg: 'radial-gradient(circle, #25252E 0%, #121216 55%, #050507 100%)',
      dialTextColor: '#DFBE79',
      bezelDiamonds: false,
      braceletColor: '#1A1A1E', // Black alligator style
      handsColor: '#DFBE79',
      hasSubdial: true,
      isLeather: true
    },
    'evara-aurelle': {
      caseGrad: ['#FFF0D4', '#DFBE79', '#C5A059', '#785A18'],
      dialBg: 'radial-gradient(circle, #FFF8EC 0%, #F5E5C8 50%, #DDBF8A 100%)',
      dialTextColor: '#3E2E14',
      bezelDiamonds: false,
      flutedBezel: true,
      braceletColor: '#D4AF37',
      handsColor: '#C5A059',
      hasSubdial: false,
      isLeather: false
    },
    'evara-celeste': {
      caseGrad: ['#FFFFFF', '#E8EFF7', '#BDCADB', '#687B94'],
      dialBg: 'radial-gradient(circle, #1E3A5F 0%, #0E1F36 60%, #050B14 100%)',
      dialTextColor: '#E2EEFA',
      bezelDiamonds: true,
      braceletColor: '#16253D',
      handsColor: '#C8DCF0',
      hasSubdial: true,
      isLeather: true,
      hasStars: true
    },
    'evara-eternelle': {
      caseGrad: ['#FCECE6', '#DEACA0', '#B9796C', '#6B3E35'],
      dialBg: 'radial-gradient(circle, #FFFEFA 0%, #FAF6ED 65%, #EBE4D5 100%)',
      dialTextColor: '#3D3028',
      bezelDiamonds: false,
      braceletColor: '#6B4E3D', // Taupe Epsom leather
      handsColor: '#2B3A4A', // Blued steel hands
      hasSubdial: false,
      isLeather: true,
      ultraThin: true
    }
  }[id] || {
    caseGrad: ['#FCE4E4', '#E0A99E', '#B76E79', '#793D45'],
    dialBg: 'radial-gradient(circle, #FFF5F7 0%, #F8DCE0 45%, #E8B9C0 100%)',
    dialTextColor: '#4A2A2F',
    bezelDiamonds: true,
    braceletColor: '#C98D83',
    handsColor: '#B76E79'
  };

  return (
    <div className="relative w-full h-72 md:h-80 flex items-center justify-center overflow-hidden py-4">
      {/* Background radial spotlight */}
      <div
        className={`absolute w-52 h-52 rounded-full transition-all duration-700 blur-2xl ${
          isHovered ? 'scale-125 opacity-40' : 'opacity-20'
        }`}
        style={{
          background: `radial-gradient(circle, ${product.primaryColor} 0%, transparent 70%)`
        }}
      />

      {/* SVG Luxury Watch Graphic */}
      <div
        className={`relative z-10 transition-transform duration-700 ease-out ${
          isHovered ? 'scale-110 -rotate-3' : 'scale-100 rotate-0'
        }`}
      >
        <svg
          width="200"
          height="280"
          viewBox="0 0 200 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] filter"
        >
          <defs>
            {/* Case Gradient */}
            <linearGradient id={`caseGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={config.caseGrad[0]} />
              <stop offset="35%" stopColor={config.caseGrad[1]} />
              <stop offset="70%" stopColor={config.caseGrad[2]} />
              <stop offset="100%" stopColor={config.caseGrad[3]} />
            </linearGradient>

            {/* Bezel Ring Gradient */}
            <linearGradient id={`bezelGrad-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={config.caseGrad[3]} />
              <stop offset="40%" stopColor={config.caseGrad[0]} />
              <stop offset="75%" stopColor={config.caseGrad[2]} />
              <stop offset="100%" stopColor={config.caseGrad[1]} />
            </linearGradient>

            {/* Glass Glare */}
            <linearGradient id={`glareGrad-${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
            </linearGradient>
          </defs>

          {/* ================= BRACELET / STRAP ================= */}
          {config.isLeather ? (
            // Leather Strap
            <g>
              {/* Top Strap */}
              <path
                d="M68 15 C68 15, 75 75, 75 95 L125 95 C125 75, 132 15, 132 15 Z"
                fill={config.braceletColor}
                stroke="#1A1A1E"
                strokeWidth="1"
              />
              {/* Stitching lines */}
              <path d="M72 18 L78 90" stroke="#DFBE79" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <path d="M128 18 L122 90" stroke="#DFBE79" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

              {/* Bottom Strap */}
              <path
                d="M75 185 C75 205, 68 265, 68 265 L132 265 C132 265, 125 205, 125 185 Z"
                fill={config.braceletColor}
                stroke="#1A1A1E"
                strokeWidth="1"
              />
              <path d="M78 190 L72 262" stroke="#DFBE79" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <path d="M122 190 L128 262" stroke="#DFBE79" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            </g>
          ) : (
            // Articulated 5-link jubilee bracelet
            <g>
              {/* Top Links */}
              {[25, 42, 59, 76].map((y, idx) => (
                <g key={`top-${idx}`}>
                  <rect x="70" y={y} width="11" height="15" rx="2" fill={`url(#caseGrad-${id})`} opacity="0.9" />
                  <rect x="83" y={y} width="14" height="15" rx="1.5" fill={config.caseGrad[0]} />
                  <rect x="99" y={y} width="16" height="15" rx="1.5" fill={config.caseGrad[1]} />
                  <rect x="117" y={y} width="14" height="15" rx="1.5" fill={config.caseGrad[0]} />
                  <rect x="133" y={y} width="11" height="15" rx="2" fill={`url(#caseGrad-${id})`} opacity="0.9" />
                </g>
              ))}

              {/* Bottom Links */}
              {[189, 206, 223, 240].map((y, idx) => (
                <g key={`bot-${idx}`}>
                  <rect x="70" y={y} width="11" height="15" rx="2" fill={`url(#caseGrad-${id})`} opacity="0.9" />
                  <rect x="83" y={y} width="14" height="15" rx="1.5" fill={config.caseGrad[0]} />
                  <rect x="99" y={y} width="16" height="15" rx="1.5" fill={config.caseGrad[1]} />
                  <rect x="117" y={y} width="14" height="15" rx="1.5" fill={config.caseGrad[0]} />
                  <rect x="133" y={y} width="11" height="15" rx="2" fill={`url(#caseGrad-${id})`} opacity="0.9" />
                </g>
              ))}
            </g>
          )}

          {/* ================= WATCH LUGS ================= */}
          <path d="M66 102 L74 72 L86 72 L82 108 Z" fill={`url(#caseGrad-${id})`} />
          <path d="M134 102 L126 72 L114 72 L118 108 Z" fill={`url(#caseGrad-${id})`} />
          <path d="M66 178 L74 208 L86 208 L82 172 Z" fill={`url(#caseGrad-${id})`} />
          <path d="M134 178 L126 208 L114 208 L118 172 Z" fill={`url(#caseGrad-${id})`} />

          {/* ================= WATCH CASE ================= */}
          <circle cx="100" cy="140" r="54" fill={`url(#caseGrad-${id})`} filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))" />

          {/* Bezel Ring */}
          <circle cx="100" cy="140" r="49" fill={`url(#bezelGrad-${id})`} />

          {/* Diamond Pavé Ring if enabled */}
          {config.bezelDiamonds && (
            <g>
              {Array.from({ length: 28 }).map((_, i) => {
                const angle = (i / 28) * Math.PI * 2;
                const cx = 100 + Math.cos(angle) * 46;
                const cy = 140 + Math.sin(angle) * 46;
                return (
                  <circle key={i} cx={cx} cy={cy} r="1.6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.4" />
                );
              })}
            </g>
          )}

          {/* ================= DIAL ================= */}
          <circle cx="100" cy="140" r="42" style={{ fill: config.dialBg }} />

          {/* Starlight speckles for Celeste */}
          {config.hasStars && (
            <g opacity="0.7">
              <circle cx="90" cy="125" r="0.8" fill="#FFF" />
              <circle cx="112" cy="132" r="0.6" fill="#FFF" />
              <circle cx="85" cy="148" r="0.7" fill="#DFBE79" />
              <circle cx="108" cy="155" r="0.8" fill="#FFF" />
              <circle cx="96" cy="160" r="0.5" fill="#FFF" />
            </g>
          )}

          {/* Brand Name on Dial */}
          <text
            x="100"
            y="124"
            textAnchor="middle"
            fill={config.dialTextColor}
            fontSize="5.5"
            fontFamily="Cormorant Garamond, serif"
            letterSpacing="1.5"
            fontWeight="600"
          >
            É V É R A
          </text>

          <text
            x="100"
            y="130"
            textAnchor="middle"
            fill={config.dialTextColor}
            opacity="0.6"
            fontSize="2.5"
            fontFamily="Montserrat, sans-serif"
            letterSpacing="0.8"
          >
            GENÈVE
          </text>

          {/* Hour Markers (12, 3, 6, 9 batons & diamonds) */}
          <rect x="99" y="103" width="2" height="6" rx="0.5" fill={config.handsColor} />
          <rect x="131" y="139" width="6" height="2" rx="0.5" fill={config.handsColor} />
          <rect x="99" y="171" width="2" height="6" rx="0.5" fill={config.handsColor} />
          <rect x="63" y="139" width="6" height="2" rx="0.5" fill={config.handsColor} />

          {/* Diagonal Hour Dots */}
          {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 100 + Math.sin(rad) * 33;
            const y = 140 - Math.cos(rad) * 33;
            return (
              <circle key={deg} cx={x} cy={y} r="1.3" fill={config.handsColor} stroke="#FFFFFF" strokeWidth="0.4" />
            );
          })}

          {/* Subdial if Moonphase / Small seconds */}
          {config.hasSubdial && (
            <g>
              <circle cx="100" cy="155" r="10" fill="none" stroke={config.dialTextColor} strokeWidth="0.5" opacity="0.4" />
              <path d="M96 156 A 4 4 0 0 1 104 156" fill="#DFBE79" opacity="0.8" />
            </g>
          )}

          {/* ================= HANDS (10:10 Pose) ================= */}
          {/* Hour Hand */}
          <line x1="100" y1="140" x2="84" y2="124" stroke={config.handsColor} strokeWidth="2.2" strokeLinecap="round" />
          {/* Minute Hand */}
          <line x1="100" y1="140" x2="122" y2="120" stroke={config.handsColor} strokeWidth="1.6" strokeLinecap="round" />
          {/* Second Hand */}
          <line x1="100" y1="145" x2="100" y2="106" stroke="#B76E79" strokeWidth="0.75" />
          <circle cx="100" cy="140" r="2.2" fill={config.handsColor} />

          {/* ================= SAPPHIRE CRYSTAL GLARE ================= */}
          <circle cx="100" cy="140" r="42" fill={`url(#glareGrad-${id})`} pointerEvents="none" />

          {/* ================= CROWN ================= */}
          <path d="M154 136 L160 137 L160 143 L154 144 Z" fill={`url(#caseGrad-${id})`} />
          <circle cx="160.5" cy="140" r="1.8" fill="#1C3D7A" />
        </svg>
      </div>
    </div>
  );
}
