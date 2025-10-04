# Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

1. Push this repository to GitHub
2. Visit [Vercel](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js configuration
5. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

## Environment Variables (Optional)

To use NASA's live API data with higher rate limits:

1. Get a free API key from [NASA API Portal](https://api.nasa.gov/)
2. Add to Vercel environment variables:
   - Key: `NEXT_PUBLIC_NASA_API_KEY`
   - Value: Your NASA API key

Without an API key, the app uses NASA's `DEMO_KEY` (30 requests/hour) or falls back to demo data.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Build Configuration

The project includes `vercel.json` with optimal settings:
- Framework: Next.js
- Output: `.next` directory
- Build command: `npm run build`

## System Requirements

- Node.js 18+ 
- npm 9+
- Modern browser with WebGL support

## Performance Notes

- Initial page load: ~90 KB
- 3D scene uses client-side rendering only
- Static pages are pre-rendered at build time
- Asteroids are rendered dynamically

## Troubleshooting

### Build Fails
- Ensure Node.js 18+ is installed
- Clear `.next` directory and rebuild
- Check that all dependencies installed correctly

### 3D Scene Not Rendering
- Verify browser supports WebGL
- Check browser console for errors
- Disable browser extensions that may block WebGL

### API Rate Limits
- Switch to demo data if hitting NASA API limits
- Get your own NASA API key for higher limits
- Demo data works offline

## Other Platforms

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

### Cloudflare Pages
- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `.next`

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Security Notes

- NASA API key is safe to expose (client-side only)
- No sensitive data stored or transmitted
- All calculations performed client-side
- No user data collection

## Monitoring

Vercel provides built-in:
- Analytics
- Performance monitoring
- Error tracking
- Deployment logs

Access via Vercel dashboard after deployment.
