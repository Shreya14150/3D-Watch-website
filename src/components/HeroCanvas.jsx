import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import LuxuryWatchModel from '../3d/LuxuryWatchModel';
import GoldenParticles from '../3d/Particles';

// Camera controller that provides subtle interactive parallax
function CameraRig() {
  useFrame((state) => {
    // Subtle mouse response
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.3;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 8.2], fov: 42 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CameraRig />

          {/* Studio Luxury Lighting Setup */}
          <ambientLight intensity={0.7} color="#FFF8F0" />
          
          {/* Key warm golden directional light */}
          <directionalLight
            position={[5, 6, 5]}
            intensity={2.8}
            color="#FFF4E6"
            castShadow
          />
          
          {/* Fill soft rose light */}
          <directionalLight
            position={[-4, 3, 3]}
            intensity={1.4}
            color="#F7D8D5"
          />

          {/* Subtle rim light for metallic edge highlights */}
          <directionalLight
            position={[0, -4, -3]}
            intensity={1.6}
            color="#DFBE79"
          />

          {/* Top jewelry spotlight */}
          <spotLight
            position={[0, 8, 4]}
            intensity={2.0}
            angle={0.6}
            penumbra={0.8}
            color="#FFFFFF"
          />

          {/* HDR Studio Reflections */}
          <Environment preset="city" />

          {/* Floating Luxury 3D Watch with physics float */}
          <Float
            speed={2.2}
            rotationIntensity={0.35}
            floatIntensity={0.4}
            floatingRange={[-0.12, 0.12]}
          >
            <LuxuryWatchModel
              caseColor="#C98D83" // 18K Rose Gold
              dialTone="pink" // Mother of pearl
              strapType="metal"
              autoRotate={true}
              scale={1.05}
              position={[0, 0, 0]}
            />
          </Float>

          {/* Contact Shadow beneath */}
          <ContactShadows
            position={[0, -3.2, 0]}
            opacity={0.55}
            scale={9}
            blur={2.4}
            far={4}
            color="#050507"
          />

          {/* Tiny Floating Golden Dust Particles */}
          <GoldenParticles count={90} radius={6} />

          {/* Smooth 360-degree user inspection orbit controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 1.6}
            rotateSpeed={0.5}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
