'use client';

import { NearEarthObject } from '@/lib/nasa-api';

interface AsteroidListProps {
  asteroids: NearEarthObject[];
  selectedAsteroid: NearEarthObject | null;
  onSelectAsteroid: (asteroid: NearEarthObject) => void;
}

export default function AsteroidList({
  asteroids,
  selectedAsteroid,
  onSelectAsteroid,
}: AsteroidListProps) {
  return (
    <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Near-Earth Objects</h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {asteroids.map((asteroid) => {
          const diameterKm = (
            (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
              asteroid.estimated_diameter.kilometers.estimated_diameter_max) / 2
          ).toFixed(3);
          
          const velocityKmS = asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_second || 'N/A';
          const missDistanceKm = asteroid.close_approach_data[0]?.miss_distance.kilometers || 'N/A';
          
          const isSelected = selectedAsteroid?.id === asteroid.id;
          
          return (
            <button
              key={asteroid.id}
              onClick={() => onSelectAsteroid(asteroid)}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                isSelected
                  ? 'bg-blue-700 ring-2 ring-blue-400'
                  : 'bg-gray-800 hover:bg-gray-700'
              } ${
                asteroid.is_potentially_hazardous_asteroid
                  ? 'border-l-4 border-red-500'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold text-white truncate flex-1">
                  {asteroid.name}
                </div>
                {asteroid.is_potentially_hazardous_asteroid && (
                  <span className="ml-2 px-2 py-1 text-xs font-bold bg-red-600 text-white rounded">
                    HAZARDOUS
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400">Diameter:</span>
                  <span className="ml-1 text-gray-200">{diameterKm} km</span>
                </div>
                <div>
                  <span className="text-gray-400">Velocity:</span>
                  <span className="ml-1 text-gray-200">{parseFloat(velocityKmS).toFixed(1)} km/s</span>
                </div>
              </div>
              
              <div className="text-sm mt-1">
                <span className="text-gray-400">Miss Distance:</span>
                <span className="ml-1 text-gray-200">
                  {(parseFloat(missDistanceKm) / 1000000).toFixed(2)} million km
                </span>
              </div>
            </button>
          );
        })}
      </div>
      
      {asteroids.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No asteroid data available. Using demo data.
        </div>
      )}
    </div>
  );
}
