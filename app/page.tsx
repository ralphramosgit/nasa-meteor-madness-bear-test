'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NearEarthObject, getMockNEOData, fetchNearEarthObjects } from '@/lib/nasa-api';
import AsteroidList from '@/components/AsteroidList';
import ImpactSimulator from '@/components/ImpactSimulator';

// Dynamic import for 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-white">Loading 3D Scene...</div>
    </div>
  ),
});

export default function Home() {
  const [asteroids, setAsteroids] = useState<NearEarthObject[]>([]);
  const [selectedAsteroid, setSelectedAsteroid] = useState<NearEarthObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [useRealData, setUseRealData] = useState(false);
  
  useEffect(() => {
    async function loadAsteroids() {
      setLoading(true);
      try {
        if (useRealData) {
          const data = await fetchNearEarthObjects();
          const allAsteroids: NearEarthObject[] = [];
          Object.values(data.near_earth_objects).forEach(dayAsteroids => {
            allAsteroids.push(...dayAsteroids);
          });
          setAsteroids(allAsteroids);
        } else {
          // Use mock data for demo
          setAsteroids(getMockNEOData());
        }
      } catch (error) {
        console.error('Error loading asteroids:', error);
        // Fallback to mock data
        setAsteroids(getMockNEOData());
      } finally {
        setLoading(false);
      }
    }
    
    loadAsteroids();
  }, [useRealData]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                NASA Asteroid Impact Simulator
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Interactive 3D visualization of near-Earth asteroids and impact scenarios
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setUseRealData(!useRealData)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  useRealData
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {useRealData ? 'NASA Live Data' : 'Demo Data'}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-xl">Loading asteroid data...</div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 3D Visualization */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black rounded-lg overflow-hidden" style={{ height: '600px' }}>
                <Scene3D asteroids={asteroids} showTrajectories={true} />
              </div>
              
              {/* Instructions */}
              <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Controls</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>Left Click + Drag:</strong> Rotate view</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>Right Click + Drag:</strong> Pan view</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>Scroll:</strong> Zoom in/out</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span><strong>Red asteroids:</strong> Potentially hazardous</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span><strong>Gray asteroids:</strong> Non-hazardous</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Asteroid List and Impact Simulator */}
            <div className="space-y-6">
              <AsteroidList
                asteroids={asteroids}
                selectedAsteroid={selectedAsteroid}
                onSelectAsteroid={setSelectedAsteroid}
              />
              
              <ImpactSimulator selectedAsteroid={selectedAsteroid} />
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-12 py-6 border-t border-gray-800">
            <div className="text-center text-gray-400 text-sm">
              <p>Data source: NASA Near-Earth Object Web Service (NeoWs)</p>
              <p className="mt-1">
                Built with Next.js, React Three Fiber, and Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
