export interface ImpactCalculations {
  kineticEnergy: number;
  craterDiameter: number;
  craterDepth: number;
  energyMegatons: number;
  description: string;
}

/**
 * Calculate impact physics for an asteroid
 * @param diameter - Asteroid diameter in meters
 * @param velocity - Impact velocity in km/s
 * @param density - Asteroid density in kg/m³ (default: 2600 for rocky asteroids)
 * @returns Impact calculations including energy and crater dimensions
 */
export function calculateImpactPhysics(
  diameter: number,
  velocity: number,
  density: number = 2600
): ImpactCalculations {
  // Calculate volume (sphere)
  const radius = diameter / 2;
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  
  // Calculate mass
  const mass = volume * density;
  
  // Calculate kinetic energy (in Joules)
  // KE = 0.5 * m * v²
  const velocityMs = velocity * 1000; // Convert km/s to m/s
  const kineticEnergy = 0.5 * mass * Math.pow(velocityMs, 2);
  
  // Convert to megatons of TNT (1 megaton = 4.184 × 10^15 J)
  const energyMegatons = kineticEnergy / (4.184 * Math.pow(10, 15));
  
  // Crater diameter estimation (Melosh crater scaling)
  // D_crater ≈ 1.8 * D_asteroid^0.78 * v^0.44 * g^-0.22
  // Simplified: D_crater ≈ D_asteroid * 20 (empirical approximation)
  const craterDiameter = diameter * 20;
  
  // Crater depth is typically 1/3 to 1/5 of diameter
  const craterDepth = craterDiameter / 4;
  
  // Generate description based on energy
  let description = "";
  if (energyMegatons < 0.001) {
    description = "Minimal impact - would likely burn up in atmosphere";
  } else if (energyMegatons < 1) {
    description = "Small impact - local damage within several kilometers";
  } else if (energyMegatons < 100) {
    description = "Significant impact - regional destruction";
  } else if (energyMegatons < 10000) {
    description = "Major impact - continental-scale devastation";
  } else {
    description = "Catastrophic impact - potential mass extinction event";
  }
  
  return {
    kineticEnergy,
    craterDiameter,
    craterDepth,
    energyMegatons,
    description,
  };
}

/**
 * Generate mitigation strategies based on asteroid parameters
 */
export function generateMitigationStrategies(
  diameter: number,
  velocity: number,
  timeToImpact: number
): string[] {
  const strategies: string[] = [];
  const impactData = calculateImpactPhysics(diameter, velocity);
  
  if (timeToImpact > 10) {
    strategies.push("Gravity Tractor - Gradually alter trajectory using spacecraft's gravitational pull");
    strategies.push("Kinetic Impactor - High-speed collision to deflect asteroid");
  }
  
  if (timeToImpact > 5) {
    strategies.push("Nuclear Deflection - Controlled nuclear explosion to alter course");
  }
  
  if (diameter < 50) {
    strategies.push("Ion Beam Shepherd - Use focused ion beams to slowly push asteroid");
  }
  
  if (timeToImpact > 20 && diameter < 100) {
    strategies.push("Enhanced Yarkovsky Effect - Paint surface to use solar radiation for deflection");
  }
  
  if (timeToImpact < 5) {
    strategies.push("Civil Defense - Evacuation and emergency preparation");
    strategies.push("Fragmentation - Break into smaller pieces (last resort)");
  }
  
  if (impactData.energyMegatons > 1000) {
    strategies.push("Multiple Deflection Missions - Coordinate several spacecraft for maximum effect");
  }
  
  return strategies;
}
