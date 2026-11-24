import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GoldenParticles({ count = 120, radius = 5.5 }) {
  const pointsRef = useRef();

  // Create random floating golden dust particles
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical distribution around the watch
      const angle = Math.random() * Math.PI * 2;
      const r = 1.2 + Math.random() * (radius - 1.2);
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      sc[i] = 0.5 + Math.random() * 1.5;
    }
    return [pos, sc];
  }, [count, radius]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.04;
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.03) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#DFBE79"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
