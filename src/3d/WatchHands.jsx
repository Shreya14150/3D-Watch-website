import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WatchHands({ metalColor = '#D4AF37', isSkeleton = false }) {
  const hourRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    // Smooth realistic watch hands movement
    if (secondRef.current) {
      secondRef.current.rotation.z = -elapsed * (Math.PI * 2 / 60) * 2; // sweep second
    }
    if (minuteRef.current) {
      minuteRef.current.rotation.z = -elapsed * (Math.PI * 2 / 3600) * 2 - Math.PI * 0.15;
    }
    if (hourRef.current) {
      hourRef.current.rotation.z = -elapsed * (Math.PI * 2 / 43200) * 2 - Math.PI * 0.62; // roughly 10:10 luxury watch pose
    }
  });

  const metalMaterial = (
    <meshStandardMaterial
      color={metalColor}
      roughness={0.15}
      metalness={0.96}
    />
  );

  return (
    <group position={[0, 0, 0.12]}>
      {/* Central Cap / Pinion */}
      <mesh position={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
        {metalMaterial}
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={metalColor} roughness={0.1} metalness={0.98} />
      </mesh>

      {/* Hour Hand (Faceted Leaf Shape) */}
      <group ref={hourRef} rotation={[0, 0, -Math.PI * 0.62]}>
        <mesh position={[0, 0.55, 0.02]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.11, 1.1, 0.03]} />
          {metalMaterial}
        </mesh>
        {/* Faceted point */}
        <mesh position={[0, 1.15, 0.02]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.09, 0.09, 0.03]} />
          {metalMaterial}
        </mesh>
        {/* Tail counterbalance */}
        <mesh position={[0, -0.22, 0.02]}>
          <boxGeometry args={[0.09, 0.35, 0.03]} />
          {metalMaterial}
        </mesh>
      </group>

      {/* Minute Hand (Longer Faceted Dauphine Shape) */}
      <group ref={minuteRef} rotation={[0, 0, -Math.PI * 0.15]}>
        <mesh position={[0, 0.85, 0.04]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.085, 1.7, 0.03]} />
          {metalMaterial}
        </mesh>
        <mesh position={[0, 1.75, 0.04]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.075, 0.075, 0.03]} />
          {metalMaterial}
        </mesh>
        <mesh position={[0, -0.3, 0.04]}>
          <boxGeometry args={[0.075, 0.45, 0.03]} />
          {metalMaterial}
        </mesh>
      </group>

      {/* Sweep Second Hand (Needle thin with circular eyelet) */}
      <group ref={secondRef} rotation={[0, 0, 0]}>
        <mesh position={[0, 0.95, 0.06]}>
          <cylinderGeometry args={[0.015, 0.018, 2.1, 12]} />
          <meshStandardMaterial color="#B76E79" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Circular counter-weight */}
        <mesh position={[0, -0.4, 0.06]}>
          <torusGeometry args={[0.09, 0.02, 12, 24]} />
          <meshStandardMaterial color="#B76E79" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Tail needle */}
        <mesh position={[0, -0.6, 0.06]}>
          <cylinderGeometry args={[0.012, 0.012, 0.4, 12]} />
          <meshStandardMaterial color="#B76E79" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
