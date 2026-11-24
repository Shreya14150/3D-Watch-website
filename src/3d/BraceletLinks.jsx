import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createLeatherTexture } from './textures';

export default function BraceletLinks({
  strapType = 'metal', // 'metal', 'leather', 'ceramic'
  metalColor = '#C98D83',
  metalRoughness = 0.22,
  metalMetalness = 0.95
}) {
  // Generate articulated 5-link jubilee bracelet links
  const { topLinks, bottomLinks } = useMemo(() => {
    const numLinks = 12;
    const top = [];
    const bottom = [];

    for (let i = 0; i < numLinks; i++) {
      const t = i / numLinks;
      // Natural ergonomic wrist curve
      const yTop = 2.2 + i * 0.42;
      const zTop = -0.15 - Math.pow(t, 1.4) * 1.5;
      const rotXTop = t * 0.45;

      const yBottom = -2.2 - i * 0.42;
      const zBottom = -0.15 - Math.pow(t, 1.4) * 1.5;
      const rotXBottom = -t * 0.45;

      // Slight taper towards clasp
      const linkScale = 1 - t * 0.2;

      top.push({ y: yTop, z: zTop, rotX: rotXTop, scale: linkScale, index: i });
      bottom.push({ y: yBottom, z: zBottom, rotX: rotXBottom, scale: linkScale, index: i });
    }
    return { topLinks: top, bottomLinks: bottom };
  }, []);

  const leatherTex = useMemo(() => {
    if (strapType === 'leather') {
      return createLeatherTexture('#362118');
    }
    return null;
  }, [strapType]);

  // If Leather strap
  if (strapType === 'leather') {
    return (
      <group>
        {/* Top Leather Strap */}
        <mesh position={[0, 4.0, -0.6]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[1.5, 4.2, 0.25]} />
          <meshStandardMaterial
            map={leatherTex}
            color="#3A251B"
            roughness={0.7}
            metalness={0.08}
          />
        </mesh>
        {/* Strap keeper loops */}
        <mesh position={[0, 4.8, -0.75]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[1.65, 0.35, 0.36]} />
          <meshStandardMaterial color="#2E1D15" roughness={0.65} metalness={0.1} />
        </mesh>
        {/* Bottom Leather Strap */}
        <mesh position={[0, -4.0, -0.6]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.5, 4.2, 0.25]} />
          <meshStandardMaterial
            map={leatherTex}
            color="#3A251B"
            roughness={0.7}
            metalness={0.08}
          />
        </mesh>
        {/* Gold deployant buckle at bottom */}
        <mesh position={[0, -6.0, -1.2]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[1.55, 0.6, 0.35]} />
          <meshStandardMaterial color={metalColor} roughness={0.15} metalness={0.96} />
        </mesh>
      </group>
    );
  }

  // Material for metal / ceramic links
  const isCeramic = strapType === 'ceramic';
  const centerLinkColor = isCeramic ? '#121216' : metalColor;
  const outerLinkColor = isCeramic ? metalColor : metalColor;

  const centerMat = (
    <meshStandardMaterial
      color={centerLinkColor}
      roughness={isCeramic ? 0.08 : metalRoughness * 0.6} // Mirror polish center
      metalness={isCeramic ? 0.2 : metalMetalness}
    />
  );

  const outerMat = (
    <meshStandardMaterial
      color={outerLinkColor}
      roughness={isCeramic ? 0.15 : metalRoughness * 1.3} // Satin brushed outer
      metalness={metalMetalness}
    />
  );

  const renderLinkRow = (link, isTop) => (
    <group
      key={`${isTop ? 'top' : 'bot'}-${link.index}`}
      position={[0, link.y, link.z]}
      rotation={[link.rotX, 0, 0]}
      scale={[link.scale, 1, 1]}
    >
      {/* Outer Left Brushed Link */}
      <mesh position={[-0.72, 0, 0]}>
        <boxGeometry args={[0.32, 0.36, 0.18]} />
        {outerMat}
      </mesh>
      {/* Intermediate Left Polished Link */}
      <mesh position={[-0.36, 0, 0.01]}>
        <boxGeometry args={[0.26, 0.38, 0.19]} />
        {centerMat}
      </mesh>
      {/* Center Mirror-Polished Link */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.34, 0.38, 0.2]} />
        {centerMat}
      </mesh>
      {/* Intermediate Right Polished Link */}
      <mesh position={[0.36, 0, 0.01]}>
        <boxGeometry args={[0.26, 0.38, 0.19]} />
        {centerMat}
      </mesh>
      {/* Outer Right Brushed Link */}
      <mesh position={[0.72, 0, 0]}>
        <boxGeometry args={[0.32, 0.36, 0.18]} />
        {outerMat}
      </mesh>
    </group>
  );

  return (
    <group>
      {topLinks.map((link) => renderLinkRow(link, true))}
      {bottomLinks.map((link) => renderLinkRow(link, false))}
    </group>
  );
}
