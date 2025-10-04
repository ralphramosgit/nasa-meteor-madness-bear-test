export interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_second: string;
    };
    miss_distance: {
      kilometers: string;
      astronomical: string;
    };
  }>;
}

export interface NEOResponse {
  element_count: number;
  near_earth_objects: {
    [date: string]: NearEarthObject[];
  };
}

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
const NASA_NEO_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

/**
 * Fetch Near-Earth Objects from NASA API
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format (max 7 days from start)
 * @returns Promise with NEO data
 */
export async function fetchNearEarthObjects(
  startDate?: string,
  endDate?: string
): Promise<NEOResponse> {
  try {
    const today = new Date();
    const start = startDate || today.toISOString().split('T')[0];
    
    // Default to 7 days from start (NASA API limit)
    const endDateObj = new Date(start);
    endDateObj.setDate(endDateObj.getDate() + 7);
    const end = endDate || endDateObj.toISOString().split('T')[0];
    
    const url = `${NASA_NEO_URL}?start_date=${start}&end_date=${end}&api_key=${NASA_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.statusText}`);
    }
    
    const data: NEOResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching NEO data:', error);
    throw error;
  }
}

/**
 * Get mock/sample NEO data for development and demo purposes
 */
export function getMockNEOData(): NearEarthObject[] {
  const today = new Date().toISOString().split('T')[0];
  
  return [
    {
      id: "2000433",
      name: "433 Eros",
      nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2000433",
      absolute_magnitude_h: 10.4,
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: 16.8,
          estimated_diameter_max: 37.6,
        },
      },
      is_potentially_hazardous_asteroid: false,
      close_approach_data: [
        {
          close_approach_date: today,
          relative_velocity: {
            kilometers_per_second: "23.5",
          },
          miss_distance: {
            kilometers: "54000000",
            astronomical: "0.361",
          },
        },
      ],
    },
    {
      id: "3542519",
      name: "(2010 PK9)",
      nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519",
      absolute_magnitude_h: 21.7,
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: 0.12,
          estimated_diameter_max: 0.27,
        },
      },
      is_potentially_hazardous_asteroid: true,
      close_approach_data: [
        {
          close_approach_date: today,
          relative_velocity: {
            kilometers_per_second: "18.7",
          },
          miss_distance: {
            kilometers: "7500000",
            astronomical: "0.05",
          },
        },
      ],
    },
    {
      id: "2099942",
      name: "99942 Apophis",
      nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2099942",
      absolute_magnitude_h: 19.7,
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: 0.31,
          estimated_diameter_max: 0.70,
        },
      },
      is_potentially_hazardous_asteroid: true,
      close_approach_data: [
        {
          close_approach_date: today,
          relative_velocity: {
            kilometers_per_second: "30.7",
          },
          miss_distance: {
            kilometers: "31000000",
            astronomical: "0.207",
          },
        },
      ],
    },
  ];
}
