import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import WatchHands from './WatchHands';
import BraceletLinks from './BraceletLinks';
import DiamondMarker from './DiamondMarker';
import { createMotherOfPearlTexture, createGenevaStripesTexture } from './textures';

// Helper component for a mechanical watch gear with teeth
function Gear({
  radius = 0.8,
  teeth = 24,
  depth = 0.04,
  color = '#DFBE79',
  metalness = 0.95,
  roughness = 0.2,
  innerHoleRadius = 0.2,
  spokes = 4
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const toothDepth = radius * 0.14;
    const toothAngle = (Math.PI * 2) / (teeth * 2);

    for (let i = 0; i < teeth * 2; i++) {
      const angle = i * toothAngle;
      const isOut = i % 2 === 0;
      const r = isOut ? radius : radius - toothDepth;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();

    // Central cutout hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerHoleRadius, 0, Math.PI * 2, true);
    s.holes.push(holePath);

    return s;
  }, [radius, teeth, innerHoleRadius]);

  const extrudeSettings = useMemo(() => ({
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015
  }), [depth]);

  return (
    <group>
      <mesh>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      {/* Central arbor axle */}
      <mesh position={[0, 0, depth / 2]}>
        <cylinderGeometry args={[innerHoleRadius * 0.8, innerHoleRadius * 0.8, depth * 2.5, 16]} />
        <meshStandardMaterial color="#E8E8ED" roughness={0.15} metalness={0.95} />
      </mesh>
    </group>
  );
}

// Ruby jewel bearing component
function RubyJewel({ position = [0, 0, 0], scale = 0.08 }) {
  return (
    <mesh position={position} scale={scale}>
      <cylinderGeometry args={[1, 0.9, 0.8, 16]} />
      <meshPhysicalMaterial
        color="#D61A46" // Vibrant synthetic ruby
        roughness={0.05}
        metalness={0.1}
        transmission={0.85}
        thickness={0.5}
        ior={1.77}
        clearcoat={1.0}
      />
    </mesh>
  );
}

export default function MechanicalMovementModel({
  caseColor = '#C98D83',
  dialTone = 'pearl-white',
  strapType = 'metal',
  activeHotspot = null,
  onSelectHotspot = () => {}
}) {
  const groupRef = useRef();
  const centerGearRef = useRef();
  const thirdGearRef = useRef();
  const fourthGearRef = useRef();
  const escapeGearRef = useRef();
  const balanceWheelRef = useRef();
  const hairspringRef = useRef();

  // Procedural dial and movement textures
  const dialTexture = useMemo(() => {
    const toneKey = dialTone === 'pearl-white' ? 'white' : (dialTone === 'emerald-green' ? 'emerald' : 'black');
    return createMotherOfPearlTexture(toneKey);
  }, [dialTone]);

  const genevaStripesTexture = useMemo(() => {
    return createGenevaStripesTexture();
  }, []);

  // Animate the internal mechanical movement!
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // 1. Center wheel (slow, driving the train)
    if (centerGearRef.current) {
      centerGearRef.current.rotation.z = elapsed * 0.25;
    }
    // 2. Third wheel (meshing counter-direction, 2.5x speed)
    if (thirdGearRef.current) {
      thirdGearRef.current.rotation.z = -elapsed * 0.625;
    }
    // 3. Fourth wheel (second wheel, 5x speed)
    if (fourthGearRef.current) {
      fourthGearRef.current.rotation.z = elapsed * 1.5;
    }
    // 4. Escape wheel (ratchet stepping, 10x speed)
    if (escapeGearRef.current) {
      escapeGearRef.current.rotation.z = -elapsed * 2.8;
    }
    // 5. Balance wheel (harmonic oscillation at 4Hz / 28,800 bph simulation)
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(elapsed * 16) * 1.5;
    }
    // 6. Hairspring breathing in sync
    if (hairspringRef.current) {
      const breath = 1 + Math.sin(elapsed * 16) * 0.12;
      hairspringRef.current.scale.set(breath, breath, 1);
    }
  });

  const hotspots = [
    {
      id: 'dial',
      title: 'Guilloché & Mother-of-Pearl',
      desc: 'Hand-finished dial harvested from Australian oysters with 0.3mm micro-tolerance and diamond cabochons.',
      pos: [0, 0.7, 0.4]
    },
    {
      id: 'crown',
      title: 'Winding Crown & Gemstone',
      desc: 'Ergonomic fluted crown with double O-ring water seal (50m) and natural cabochon sapphire tip.',
      pos: [2.5, 0, 0.1]
    },
    {
      id: 'bracelet',
      title: 'Articulated Luxury Links',
      desc: 'Custom engineered 5-link jubilee bracelet with dual-deployant invisible butterfly clasp.',
      pos: [0, -2.6, -0.1]
    },
    {
      id: 'movement',
      title: 'Swiss Calibre 8200 Movement',
      desc: '28,800 vibrations/hour, 48-hour power reserve, 26 synthetic ruby jewels, and Côtes de Genève bridges.',
      pos: [-0.65, -0.55, 0.25]
    }
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.08}>
      {/* ================= 1. WATCH CASE & LUGS ================= */}
      <mesh position={[0, 0, -0.1]}>
        <cylinderGeometry args={[2.25, 2.2, 0.5, 64]} />
        <meshStandardMaterial color={caseColor} roughness={0.16} metalness={0.96} />
      </mesh>

      {/* Exhibition Sapphire Caseback Ring */}
      <mesh position={[0, 0, -0.38]}>
        <cylinderGeometry args={[2.05, 1.9, 0.15, 48]} />
        <meshStandardMaterial color={caseColor} roughness={0.25} metalness={0.92} />
      </mesh>

      {/* Caseback Sapphire Crystal */}
      <mesh position={[0, 0, -0.44]}>
        <circleGeometry args={[1.75, 48]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.95}
          thickness={0.3}
          roughness={0.05}
          ior={1.76}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Top Lugs */}
      <mesh position={[-0.9, 2.38, -0.1]} rotation={[-0.25, 0, -0.08]}>
        <boxGeometry args={[0.34, 0.95, 0.4]} />
        <meshStandardMaterial color={caseColor} roughness={0.18} metalness={0.95} />
      </mesh>
      <mesh position={[0.9, 2.38, -0.1]} rotation={[-0.25, 0, 0.08]}>
        <boxGeometry args={[0.34, 0.95, 0.4]} />
        <meshStandardMaterial color={caseColor} roughness={0.18} metalness={0.95} />
      </mesh>

      {/* Bottom Lugs */}
      <mesh position={[-0.9, -2.38, -0.1]} rotation={[0.25, 0, 0.08]}>
        <boxGeometry args={[0.34, 0.95, 0.4]} />
        <meshStandardMaterial color={caseColor} roughness={0.18} metalness={0.95} />
      </mesh>
      <mesh position={[0.9, -2.38, -0.1]} rotation={[0.25, 0, -0.08]}>
        <boxGeometry args={[0.34, 0.95, 0.4]} />
        <meshStandardMaterial color={caseColor} roughness={0.18} metalness={0.95} />
      </mesh>

      {/* Fluted Bezel */}
      <mesh position={[0, 0, 0.18]}>
        <cylinderGeometry args={[2.22, 2.26, 0.16, 64]} />
        <meshStandardMaterial color={caseColor} roughness={0.12} metalness={0.98} />
      </mesh>

      {/* ================= 2. INTERNAL MECHANICAL MOVEMENT ================= */}
      {/* Baseplate / Mainplate with Côtes de Genève */}
      <mesh position={[0, 0, -0.22]}>
        <circleGeometry args={[1.92, 48]} />
        <meshStandardMaterial
          map={genevaStripesTexture}
          roughness={0.35}
          metalness={0.88}
        />
      </mesh>

      {/* Movement Train Bridges (Architectural cutaways) */}
      <mesh position={[0.4, 0.3, -0.12]}>
        <boxGeometry args={[1.3, 0.9, 0.08]} />
        <meshStandardMaterial
          map={genevaStripesTexture}
          roughness={0.25}
          metalness={0.92}
        />
      </mesh>
      <mesh position={[-0.5, 0.2, -0.1]}>
        <cylinderGeometry args={[0.8, 0.8, 0.08, 24, 1, false, 0, Math.PI * 1.3]} />
        <meshStandardMaterial
          map={genevaStripesTexture}
          roughness={0.25}
          metalness={0.92}
        />
      </mesh>

      {/* --- GEAR 1: Center Wheel & Pinion (Brass Gold) --- */}
      <group ref={centerGearRef} position={[0, 0, -0.08]}>
        <Gear radius={0.85} teeth={30} depth={0.035} color="#DFBE79" />
      </group>
      <RubyJewel position={[0, 0, -0.04]} />

      {/* --- GEAR 2: Third Wheel (Meshing gear) --- */}
      <group ref={thirdGearRef} position={[0.7, -0.4, -0.06]}>
        <Gear radius={0.62} teeth={22} depth={0.035} color="#D4AF37" />
      </group>
      <RubyJewel position={[0.7, -0.4, -0.02]} />

      {/* --- GEAR 3: Fourth / Second Wheel --- */}
      <group ref={fourthGearRef} position={[0.3, -0.85, -0.04]}>
        <Gear radius={0.45} teeth={16} depth={0.03} color="#DFBE79" />
      </group>
      <RubyJewel position={[0.3, -0.85, 0.0]} />

      {/* --- GEAR 4: Escape Wheel (Anchored ratchet teeth) --- */}
      <group ref={escapeGearRef} position={[-0.25, -0.85, -0.02]}>
        <Gear radius={0.38} teeth={15} depth={0.025} color="#DFBE79" />
      </group>
      <RubyJewel position={[-0.25, -0.85, 0.02]} />

      {/* --- BALANCE WHEEL & HAIRSPRING (The Heartbeat of the Watch!) --- */}
      <group position={[-0.7, -0.45, 0.04]}>
        {/* Oscillating Golden Balance Wheel Rim */}
        <group ref={balanceWheelRef}>
          <mesh>
            <torusGeometry args={[0.62, 0.035, 16, 32]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.12} metalness={0.98} />
          </mesh>
          {/* Balance Wheel Cross Spokes */}
          <mesh rotation={[0, 0, 0]}>
            <boxGeometry args={[1.2, 0.05, 0.025]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.12} metalness={0.98} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[1.2, 0.05, 0.025]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.12} metalness={0.98} />
          </mesh>
          {/* 4 Gold Balance Weight Screws */}
          {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((ang, i) => (
            <mesh
              key={i}
              position={[Math.cos(ang) * 0.65, Math.sin(ang) * 0.65, 0]}
              rotation={[0, 0, ang]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.06, 12]} />
              <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={0.99} />
            </mesh>
          ))}
        </group>

        {/* Breathing Hairspring Spiral */}
        <group ref={hairspringRef} position={[0, 0, 0.03]}>
          <mesh>
            <torusGeometry args={[0.35, 0.015, 8, 32]} />
            <meshStandardMaterial color="#3A506B" roughness={0.3} metalness={0.9} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.22, 0.015, 8, 32]} />
            <meshStandardMaterial color="#3A506B" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>

        {/* Central Balance Pivot Ruby with Shock Spring (Incabloc) */}
        <RubyJewel position={[0, 0, 0.06]} scale={0.1} />
        {/* Lyre-shaped Gold Shock Spring */}
        <mesh position={[0, 0, 0.08]}>
          <ringGeometry args={[0.09, 0.14, 16]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={0.98} />
        </mesh>
      </group>

      {/* ================= 3. SKELETONIZED DIAL ================= */}
      {/* Top half closed dial with branding, bottom open-heart window */}
      <mesh position={[0, 0.5, 0.12]}>
        <cylinderGeometry args={[1.9, 1.9, 0.03, 48, 1, false, 0, Math.PI]} />
        <meshStandardMaterial map={dialTexture} roughness={0.3} metalness={0.25} />
      </mesh>
      {/* Bottom rim track framing the skeleton aperture */}
      <mesh position={[0, 0, 0.12]}>
        <ringGeometry args={[1.65, 1.9, 48]} />
        <meshStandardMaterial color={caseColor} roughness={0.2} metalness={0.95} />
      </mesh>

      {/* Diamond markers along upper dial */}
      {[
        { x: -1.35, y: 0.9, isTwelve: false },
        { x: -0.85, y: 1.4, isTwelve: false },
        { x: 0, y: 1.62, isTwelve: true },
        { x: 0.85, y: 1.4, isTwelve: false },
        { x: 1.35, y: 0.9, isTwelve: false }
      ].map((m, idx) => (
        <DiamondMarker key={idx} position={[m.x, m.y, 0.14]} scale={m.isTwelve ? 0.14 : 0.1} isTwelve={m.isTwelve} />
      ))}

      {/* Watch Hands */}
      <WatchHands metalColor={caseColor} isSkeleton />

      {/* Domed Sapphire Crystal */}
      <mesh position={[0, 0, 0.28]}>
        <sphereGeometry args={[2.0, 48, 16, 0, Math.PI * 2, 0, Math.PI * 0.15]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.03}
          metalness={0.02}
          transmission={0.96}
          thickness={0.4}
          ior={1.76}
          reflectivity={0.9}
          clearcoat={1.0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Winding Crown with Cabochon Gemstone */}
      <group position={[2.3, 0, -0.05]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.26, 0.28, 0.28, 24]} />
          <meshStandardMaterial color={caseColor} roughness={0.15} metalness={0.96} />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.18, 24, 16]} />
          <meshPhysicalMaterial
            color="#9C102C" // Ruby Cabochon for Mechanical Edition
            roughness={0.05}
            metalness={0.1}
            transmission={0.8}
            thickness={0.4}
            ior={1.77}
          />
        </mesh>
      </group>

      {/* Bracelet / Strap */}
      <BraceletLinks
        strapType={strapType}
        metalColor={caseColor}
        metalRoughness={0.2}
        metalMetalness={0.96}
      />

      {/* ================= 4. CLICKABLE 3D HOTSPOTS ================= */}
      {hotspots.map((hs) => {
        const isActive = activeHotspot === hs.id;
        return (
          <group key={hs.id} position={hs.pos}>
            <Html distanceFactor={10} zIndexRange={[100, 0]}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(hs.id);
                }}
                className={`relative group flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isActive ? 'scale-125' : 'hover:scale-110'
                }`}
                title={`Inspect ${hs.title}`}
              >
                {/* Outer pulsing ring */}
                <span className={`absolute w-8 h-8 rounded-full border border-[#D4AF37] transition-all duration-700 ${
                  isActive ? 'animate-ping opacity-75' : 'opacity-40 group-hover:opacity-100 group-hover:scale-125'
                }`} />
                {/* Center glowing dot */}
                <span className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#B76E79] shadow-[0_0_15px_#B76E79]'
                    : 'bg-[#D4AF37]/90 group-hover:bg-[#FFF] shadow-[0_0_10px_#D4AF37]'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#08080A]" />
                </span>

                {/* Micro tooltip pill on hover or active */}
                <span className={`absolute left-6 whitespace-nowrap px-2.5 py-1 rounded bg-[#0E0E11]/90 backdrop-blur-md border border-[#D4AF37]/30 text-[10px] uppercase tracking-widest text-[#FAF8F5] transition-all duration-300 pointer-events-none ${
                  isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}>
                  {hs.id}
                </span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
