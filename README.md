# NASA Asteroid Impact Simulator

An interactive 3D visualization tool for simulating asteroid impacts on Earth using real data from NASA's Near-Earth Object Web Service (NeoWs). Built for NASA Space Apps Challenge.

![NASA Asteroid Impact Simulator](https://img.shields.io/badge/NASA-Space%20Apps-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-8.16-orange)

## Features

### 🌍 Interactive 3D Earth Visualization
- Real-time 3D rendering of Earth using React Three Fiber
- Smooth camera controls (orbit, pan, zoom)
- Dynamic lighting and realistic space environment

### ☄️ Asteroid Trajectory Visualization
- Live NASA NEO API integration for real asteroid data
- Visual distinction between hazardous and non-hazardous asteroids
- Animated asteroid trajectories with motion trails
- Scale-adjusted sizes for better visibility

### 🔬 Impact Physics Calculations
- Kinetic energy calculations (megatons of TNT equivalent)
- Crater diameter and depth estimation using Melosh scaling
- Impact severity assessment
- Real-time physics simulation based on asteroid properties

### 🛡️ Mitigation Strategies
- Context-aware deflection strategies based on:
  - Asteroid size and composition
  - Impact velocity
  - Time until potential impact
- Multiple defense options including:
  - Gravity Tractor
  - Kinetic Impactor
  - Nuclear Deflection
  - Ion Beam Shepherd
  - Enhanced Yarkovsky Effect

### 🎨 Responsive UI
- Built with Tailwind CSS for modern, responsive design
- Dark theme optimized for space visualization
- Interactive controls and real-time data updates
- Mobile-friendly interface

## Tech Stack

- **Framework**: Next.js 14.2 with App Router
- **Language**: TypeScript 5.5
- **3D Graphics**: React Three Fiber + Three.js
- **Styling**: Tailwind CSS
- **API**: NASA Near-Earth Object Web Service (NeoWs)
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) NASA API key from [api.nasa.gov](https://api.nasa.gov/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ralphramosgit/nasa-meteor-madness-bear-test.git
cd nasa-meteor-madness-bear-test
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure NASA API key:
```bash
cp .env.example .env.local
# Edit .env.local and add your NASA API key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Viewing Asteroids
- The application loads asteroid data automatically
- Toggle between "Demo Data" and "NASA Live Data" using the header button
- Select any asteroid from the list to view detailed impact simulation

### 3D Scene Controls
- **Left Click + Drag**: Rotate the view around Earth
- **Right Click + Drag**: Pan the camera
- **Scroll Wheel**: Zoom in/out
- **Red asteroids**: Potentially hazardous
- **Gray asteroids**: Non-hazardous

### Impact Simulation
- Select an asteroid to see calculated impact physics
- Use custom sliders (when no asteroid is selected) to simulate different scenarios:
  - Asteroid diameter (10m - 1000m)
  - Impact velocity (5 km/s - 70 km/s)
  - Time to impact (1 - 50 years)

### Understanding Results
- **Kinetic Energy**: Total impact energy in megatons of TNT
- **Crater Diameter**: Expected crater size based on Melosh scaling
- **Crater Depth**: Estimated depth of impact crater
- **Impact Assessment**: Severity classification and description
- **Mitigation Strategies**: Recommended deflection methods

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/
│   ├── Asteroid.tsx         # 3D asteroid component
│   ├── AsteroidList.tsx     # Asteroid selection list
│   ├── Earth3D.tsx          # 3D Earth visualization
│   ├── ImpactSimulator.tsx  # Impact physics calculator
│   └── Scene3D.tsx          # Main 3D scene
├── lib/
│   └── nasa-api.ts          # NASA API integration
├── utils/
│   └── physics.ts           # Physics calculations
└── public/                  # Static assets
```

## Physics Calculations

### Kinetic Energy
```
KE = 0.5 × mass × velocity²
```
Where mass is calculated from asteroid volume and density (default: 2600 kg/m³ for rocky asteroids)

### Crater Scaling
Uses simplified Melosh crater scaling equations:
```
Crater_Diameter ≈ Asteroid_Diameter × 20
Crater_Depth ≈ Crater_Diameter / 4
```

## API Integration

The application uses NASA's Near-Earth Object Web Service:
- **Endpoint**: `https://api.nasa.gov/neo/rest/v1/feed`
- **Rate Limit**: 1000 requests/hour with API key, 30/hour with DEMO_KEY
- **Data**: Includes asteroid size, velocity, close approach dates, and hazard classification

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variable `NEXT_PUBLIC_NASA_API_KEY` (optional)
4. Deploy

The project includes `vercel.json` configuration for optimal deployment.

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Docker containers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for educational purposes.

## Acknowledgments

- NASA Near-Earth Object Program for providing public API access
- React Three Fiber community for excellent 3D rendering tools
- NASA Space Apps Challenge for inspiration

## Resources

- [NASA NEO API Documentation](https://api.nasa.gov/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Next.js Documentation](https://nextjs.org/docs)
- [Asteroid Impact Effects Calculator](https://impact.ese.ic.ac.uk/ImpactEarth/)

## Future Enhancements

- [ ] Real-time orbit predictions
- [ ] Multiple impact locations on Earth
- [ ] Historical impact data visualization
- [ ] Advanced trajectory calculations
- [ ] Mission planning simulation
- [ ] VR/AR support for immersive experience
