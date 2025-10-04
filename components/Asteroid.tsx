'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidProps {
  position: [number, number, number];
  velocity: [number, number, number];
  size: number;
  color?: string;
  isHazardous?: boolean;
}

export default function Asteroid({
  position,
  velocity,
  size,
  color = '#8b8b8b',
  isHazardous = false,
}: AsteroidProps) {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const trailPoints = useRef<THREE.Vector3[]>([]);
  
  useFrame((state, delta) => {
    if (asteroidRef.current) {
      // Update position
      asteroidRef.current.position.x += velocity[0] * delta;
      asteroidRef.current.position.y += velocity[1] * delta;
      asteroidRef.current.position.z += velocity[2] * delta;
      
      // Add rotation for realism
      asteroidRef.current.rotation.x += delta;
      asteroidRef.current.rotation.y += delta * 0.5;
      
      // Update trail
      trailPoints.current.push(asteroidRef.current.position.clone());
      
      // Keep trail length manageable
      if (trailPoints.current.length > 100) {
        trailPoints.current.shift();
      }
    }
  });
  
  return (
    <group>
      <mesh ref={asteroidRef} position={position}>
        <dodecahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={isHazardous ? '#ff4444' : color}
          roughness={0.9}
          metalness={0.1}
          emissive={isHazardous ? '#ff0000' : '#000000'}
          emissiveIntensity={isHazardous ? 0.3 : 0}
        />
      </mesh>
    </group>
  );
}
