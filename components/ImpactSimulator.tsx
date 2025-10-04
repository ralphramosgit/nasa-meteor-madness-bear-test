'use client';

import { useState } from 'react';
import { calculateImpactPhysics, generateMitigationStrategies } from '@/utils/physics';
import { NearEarthObject } from '@/lib/nasa-api';

interface ImpactSimulatorProps {
  selectedAsteroid: NearEarthObject | null;
}

export default function ImpactSimulator({ selectedAsteroid }: ImpactSimulatorProps) {
  const [customDiameter, setCustomDiameter] = useState<number>(100);
  const [customVelocity, setCustomVelocity] = useState<number>(20);
  const [customTimeToImpact, setCustomTimeToImpact] = useState<number>(10);
  
  const asteroid = selectedAsteroid || null;
  
  // Use asteroid data or custom values
  const diameter = asteroid
    ? ((asteroid.estimated_diameter.kilometers.estimated_diameter_min +
        asteroid.estimated_diameter.kilometers.estimated_diameter_max) / 2) * 1000 // Convert to meters
    : customDiameter;
    
  const velocity = asteroid
    ? parseFloat(asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_second || '20')
    : customVelocity;
  
  const impact = calculateImpactPhysics(diameter, velocity);
  const strategies = generateMitigationStrategies(diameter, velocity, customTimeToImpact);
  
  return (
    <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">
          {asteroid ? `Impact Simulation: ${asteroid.name}` : 'Custom Impact Simulation'}
        </h2>
        
        {!asteroid && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Asteroid Diameter (meters): {customDiameter}m
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                value={customDiameter}
                onChange={(e) => setCustomDiameter(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Impact Velocity (km/s): {customVelocity} km/s
              </label>
              <input
                type="range"
                min="5"
                max="70"
                value={customVelocity}
                onChange={(e) => setCustomVelocity(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time to Impact (years): {customTimeToImpact} years
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={customTimeToImpact}
                onChange={(e) => setCustomTimeToImpact(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">Impact Physics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Kinetic Energy</div>
            <div className="text-2xl font-bold text-blue-400">
              {impact.energyMegatons.toExponential(2)} MT
            </div>
            <div className="text-xs text-gray-500">Megatons of TNT</div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Crater Diameter</div>
            <div className="text-2xl font-bold text-green-400">
              {(impact.craterDiameter / 1000).toFixed(2)} km
            </div>
            <div className="text-xs text-gray-500">Estimated crater size</div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Crater Depth</div>
            <div className="text-2xl font-bold text-yellow-400">
              {(impact.craterDepth / 1000).toFixed(2)} km
            </div>
            <div className="text-xs text-gray-500">Approximate depth</div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Diameter</div>
            <div className="text-2xl font-bold text-purple-400">
              {diameter.toFixed(0)} m
            </div>
            <div className="text-xs text-gray-500">Asteroid size</div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${
          impact.energyMegatons > 1000 ? 'bg-red-900' :
          impact.energyMegatons > 100 ? 'bg-orange-900' :
          impact.energyMegatons > 1 ? 'bg-yellow-900' :
          'bg-green-900'
        }`}>
          <div className="font-semibold text-white mb-1">Impact Assessment</div>
          <div className="text-sm text-gray-200">{impact.description}</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">Mitigation Strategies</h3>
        <div className="space-y-2">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <div className="text-sm text-gray-300">{strategy}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
