'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Earth3DProps {
  radius?: number;
  rotation?: boolean;
}

export default function Earth3D({ radius = 2, rotation = true }: Earth3DProps) {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Create Earth texture (simple gradient for now)
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Create ocean blue gradient
      const gradient = context.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, '#1e3a8a');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#1e3a8a');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 1024, 512);
      
      // Add some land-like features (green patches)
      context.fillStyle = '#16a34a';
      context.globalAlpha = 0.7;
      
      // Simple continents simulation
      for (let i = 0; i < 20; i++) {
        context.beginPath();
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const r = Math.random() * 100 + 50;
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fill();
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  // Rotate Earth
  useFrame((state, delta) => {
    if (earthRef.current && rotation) {
      earthRef.current.rotation.y += delta * 0.1;
    }
  });
  
  return (
    <Sphere ref={earthRef} args={[radius, 64, 64]}>
      <meshStandardMaterial
        map={earthTexture}
        roughness={0.7}
        metalness={0.2}
      />
    </Sphere>
  );
}
