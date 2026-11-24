import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import DiamondMarker from './DiamondMarker';
import WatchHands from './WatchHands';
import BraceletLinks from './BraceletLinks';
import { createMotherOfPearlTexture } from './textures';

export default function LuxuryWatchModel({
  caseColor = '#C98D83',
  dialTone = 'pink',
  strapType = 'metal',
  interactive = true,
  autoRotate = true,
  scale = 1.0,
  position = [0, 0, 0],
  rotation = [0.15, 0, 0]
}) {
  const groupRef = useRef();
  const innerRef = useRef();

  // Create mother-of-pearl dial texture
  const dialTexture = useMemo(() => {
    return createMotherOfPearlTexture(dialTone);
  }, [dialTone]);

  // Diamond positions around the circular dial
  const diamondMarkers = useMemo(() => {
    const markers = [];
    const radius = 1.62;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = -Math.sin(angle) * radius; // 12 o'clock at top
      markers.push({ x, y, isTwelve: i === 0, index: i });
    }
    return markers;
  }, []);

  // Bezel pavé diamond studs (36 miniature diamonds)
  const bezelDiamonds = useMemo(() => {
    const studs = [];
    const radius = 2.05;
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      studs.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        index: i
      });
    }
    return studs;
  }, []);

  // Frame animation: subtle auto-rotation and floating breath
  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime();
    if (groupRef.current) {
      if (autoRotate) {
        // Slow regal rotation + subtle mouse influence
        groupRef.current.rotation.y = elapsed * 0.2 + pointer.x * 0.45;
        groupRef.current.rotation.x = 0.15 + Math.sin(elapsed * 0.8) * 0.05 - pointer.y * 0.25;
      }
      // Floating breath
      groupRef.current.position.y = position[1] + Math.sin(elapsed * 1.5) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      <group ref={innerRef}>
        {/* ================= 1. WATCH CASE ================= */}
        {/* Main Middle Case Body */}
        <mesh position={[0, 0, -0.05]}>
          <cylinderGeometry args={[2.2, 2.15, 0.42, 64]} />
          <meshStandardMaterial
            color={caseColor}
            roughness={0.16}
            metalness={0.96}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Stepped Caseback */}
        <mesh position={[0, 0, -0.3]}>
          <cylinderGeometry args={[2.0, 1.85, 0.18, 48]} />
          <meshStandardMaterial
            color={caseColor}
            roughness={0.28}
            metalness={0.92}
          />
        </mesh>

        {/* Top Lugs (12 o'clock) */}
        <mesh position={[-0.88, 2.35, -0.1]} rotation={[-0.25, 0, -0.08]}>
          <boxGeometry args={[0.34, 0.95, 0.38]} />
          <meshStandardMaterial color={caseColor} roughness={0.18} metalness={0.95} />
        </mesh>
        <mesh position={[0.88, 2.35, -0.1]} rotation={[-0.25, 0, 0.08]}>
          <boxGeometry args={[0.34, 0.95, 0.38]} />
          <meshStandardMaterial color={caseColor} roughness={0.18} metalness={0.95} />
        </mesh>

        {/* Bottom Lugs (6 o'clock) */}
        <mesh position={[-0.88, -2.35, -0.1]} rotation={[0.25, 0, 0.08]}>
          <boxGeometry args={[0.34, 0.95, 0.38]} />
          <meshStandardMaterial color={caseColor} roughness={0.18} metalness={0.95} />
        </mesh>
        <mesh position={[0.88, -2.35, -0.1]} rotation={[0.25, 0, -0.08]}>
          <boxGeometry args={[0.34, 0.95, 0.38]} />
          <meshStandardMaterial color={caseColor} roughness={0.18} metalness={0.95} />
        </mesh>

        {/* ================= 2. BEZEL & PAVÉ DIAMONDS ================= */}
        {/* Slanted Fluted Bezel Ring */}
        <mesh position={[0, 0, 0.18]}>
          <cylinderGeometry args={[2.18, 2.24, 0.16, 64]} />
          <meshStandardMaterial
            color={caseColor}
            roughness={0.12}
            metalness={0.98}
          />
        </mesh>

        {/* Inner Gold Bezel Retaining Ring */}
        <mesh position={[0, 0, 0.22]}>
          <torusGeometry args={[1.98, 0.06, 16, 64]} />
          <meshStandardMaterial
            color={caseColor}
            roughness={0.1}
            metalness={0.98}
          />
        </mesh>

        {/* 36 Pavé Diamond Studs on the Bezel */}
        {bezelDiamonds.map((d) => (
          <mesh key={d.index} position={[d.x, d.y, 0.24]} scale={0.065}>
            <sphereGeometry args={[0.8, 8, 8]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              roughness={0.02}
              metalness={0.1}
              transmission={0.88}
              ior={2.42}
              reflectivity={1.0}
            />
          </mesh>
        ))}

        {/* ================= 3. MOTHER-OF-PEARL DIAL ================= */}
        <mesh position={[0, 0, 0.1]}>
          <circleGeometry args={[1.92, 64]} />
          <meshStandardMaterial
            map={dialTexture}
            roughness={0.32}
            metalness={0.25}
          />
        </mesh>

        {/* Outer Minute Track Ring */}
        <mesh position={[0, 0, 0.11]}>
          <ringGeometry args={[1.82, 1.86, 64]} />
          <meshStandardMaterial color={caseColor} roughness={0.2} metalness={0.95} />
        </mesh>

        {/* 12 Diamond Hour Markers */}
        {diamondMarkers.map((m) => (
          <DiamondMarker
            key={m.index}
            position={[m.x, m.y, 0.12]}
            scale={m.isTwelve ? 0.15 : 0.11}
            isTwelve={m.isTwelve}
          />
        ))}

        {/* ================= 4. REFINED WATCH HANDS ================= */}
        <WatchHands metalColor={caseColor} />

        {/* ================= 5. DOMED SAPPHIRE CRYSTAL ================= */}
        <mesh position={[0, 0, 0.28]}>
          {/* Domed lens geometry */}
          <sphereGeometry args={[2.0, 48, 16, 0, Math.PI * 2, 0, Math.PI * 0.15]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.03}
            metalness={0.02}
            transmission={0.96}
            thickness={0.4}
            ior={1.76} // Real sapphire crystal IOR
            reflectivity={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* ================= 6. CROWN & CABOCHON GEMSTONE ================= */}
        <group position={[2.3, 0, -0.05]} rotation={[0, 0, -Math.PI / 2]}>
          {/* Fluted Winding Crown Body */}
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.26, 0.28, 0.28, 24]} />
            <meshStandardMaterial color={caseColor} roughness={0.15} metalness={0.96} />
          </mesh>
          {/* Cabochon Gemstone Tip (Sapphire / Ruby) */}
          <mesh position={[0, 0.32, 0]}>
            <sphereGeometry args={[0.18, 24, 16]} />
            <meshPhysicalMaterial
              color="#0B2F64" // Royal Blue Sapphire Cabochon
              roughness={0.05}
              metalness={0.1}
              transmission={0.75}
              thickness={0.4}
              ior={1.76}
            />
          </mesh>
        </group>

        {/* ================= 7. ARTICULATED BRACELET ================= */}
        <BraceletLinks
          strapType={strapType}
          metalColor={caseColor}
          metalRoughness={0.2}
          metalMetalness={0.96}
        />
      </group>
    </group>
  );
}
