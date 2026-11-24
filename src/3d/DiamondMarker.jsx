import React, { useRef } from 'react';
import * as THREE from 'three';

export default function DiamondMarker({ position = [0, 0, 0], scale = 0.12, isTwelve = false }) {
  // Octahedral / faceted cut diamond geometry
  return (
    <group position={position} scale={scale}>
      {/* Brilliant crown cone */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.8, 0.7, 8]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.02}
          metalness={0.1}
          transmission={0.88}
          thickness={0.8}
          ior={2.42} // Real diamond refractive index
          reflectivity={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
        />
      </mesh>
      {/* Top pavilion facet table */}
      <mesh position={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.7, 0.8, 0.3, 8]} />
        <meshPhysicalMaterial
          color="#FFF8F0"
          roughness={0.05}
          metalness={0.15}
          transmission={0.85}
          thickness={0.6}
          ior={2.42}
          reflectivity={1.0}
        />
      </mesh>
      {/* Gold mounting prong setting */}
      <mesh position={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.85, 0.7, 0.2, 8]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
}
