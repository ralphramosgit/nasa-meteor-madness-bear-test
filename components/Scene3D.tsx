'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Earth3D from './Earth3D';
import Asteroid from './Asteroid';
import { NearEarthObject } from '@/lib/nasa-api';

interface Scene3DProps {
  asteroids: NearEarthObject[];
  showTrajectories?: boolean;
}

export default function Scene3D({ asteroids, showTrajectories = true }: Scene3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Stars background */}
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Earth */}
        <Earth3D radius={2} rotation={true} />
        
        {/* Asteroids */}
        {showTrajectories && asteroids.map((neo, index) => {
          const diameterKm = (neo.estimated_diameter.kilometers.estimated_diameter_min +
            neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;
          
          // Scale size for visibility (real scale would be too small)
          const size = Math.max(0.05, Math.min(0.3, diameterKm * 0.1));
          
          // Calculate position based on miss distance
          const missDistanceKm = parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers || '0');
          const angle = (index / asteroids.length) * Math.PI * 2;
          const distance = 3 + (missDistanceKm / 10000000); // Scale distance for visibility
          
          const position: [number, number, number] = [
            Math.cos(angle) * distance,
            (Math.random() - 0.5) * 2,
            Math.sin(angle) * distance,
          ];
          
          // Velocity towards Earth
          const velocityKmS = parseFloat(neo.close_approach_data[0]?.relative_velocity.kilometers_per_second || '20');
          const velocity: [number, number, number] = [
            -Math.cos(angle) * 0.01 * (velocityKmS / 20),
            0,
            -Math.sin(angle) * 0.01 * (velocityKmS / 20),
          ];
          
          return (
            <Asteroid
              key={neo.id}
              position={position}
              velocity={velocity}
              size={size}
              isHazardous={neo.is_potentially_hazardous_asteroid}
            />
          );
        })}
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}
