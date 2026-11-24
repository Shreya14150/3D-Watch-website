import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import MechanicalMovementModel from '../3d/MechanicalMovementModel';
import GoldenParticles from '../3d/Particles';

export default function WatchmakingCanvas({
  caseColor = '#C98D83',
  dialTone = 'pearl-white',
  strapType = 'metal',
  activeHotspot = null,
  onSelectHotspot = () => {}
}) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing select-none relative">
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 42 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Lighting optimized for metallic gear specular glints */}
          <ambientLight intensity={0.8} color="#FFF8F0" />
          
          <directionalLight
            position={[5, 6, 6]}
            intensity={2.8}
            color="#FFF2E0"
            castShadow
          />
          <directionalLight
            position={[-5, -2, 4]}
            intensity={1.2}
            color="#C4D7F5"
          />
          <directionalLight
            position={[0, 4, -4]}
            intensity={1.5}
            color="#DFBE79"
          />

          <Environment preset="city" />

          {/* 3D Mechanical Watch Model */}
          <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
            <MechanicalMovementModel
              caseColor={caseColor}
              dialTone={dialTone}
              strapType={strapType}
              activeHotspot={activeHotspot}
              onSelectHotspot={onSelectHotspot}
            />
          </Float>

          {/* Contact Shadow */}
          <ContactShadows
            position={[0, -3.2, 0]}
            opacity={0.65}
            scale={9}
            blur={2.5}
            far={4}
            color="#050507"
          />

          {/* Subtle Golden Sparkles */}
          <GoldenParticles count={60} radius={5} />

          {/* Interactive 3D Orbit Controls */}
          <OrbitControls
            enableZoom={true}
            minDistance={4.5}
            maxDistance={11.0}
            enablePan={false}
            minPolarAngle={Math.PI / 3.8}
            maxPolarAngle={Math.PI / 1.5}
            rotateSpeed={0.55}
            dampingFactor={0.06}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
