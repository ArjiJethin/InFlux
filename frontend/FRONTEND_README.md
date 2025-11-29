# InFlux Frontend Documentation

## 🎯 Overview

InFlux is a modern, AI-powered smart home energy management system built with Next.js 15, React 18, and TypeScript. The frontend connects to a real ML backend that provides live predictions and recommendations based on actual smart home data.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Backend running on http://localhost:8000

### Installation
```bash
cd frontend
npm install
npm run dev
```

Frontend will start on **http://localhost:3001** (or 3000 if available)

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js 15 App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/         # Main dashboard
│   │   ├── appliances/        # Device management
│   │   ├── optimization/      # Energy optimization
│   │   ├── reports/           # Analytics & reports
│   │   └── forecast/          # 7-day forecast (via Forecast.tsx component)
│   ├── components/            # React components
│   │   ├── Dashboard.tsx      # Main dashboard container
│   │   ├── Forecast.tsx       # 7-day forecast page
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── MetricCards.tsx    # Dashboard metric cards
│   │   ├── EnergyChart.tsx    # Energy usage charts
│   │   ├── ApplianceBreakdown.tsx  # Device breakdown pie chart
│   │   ├── KeyInsights.tsx    # ML insights display
│   │   └── OptimizationSchedule.tsx  # Optimization schedule
│   ├── lib/
│   │   └── api.ts            # API client for backend
│   └── context/
│       └── AuthContext.tsx   # Authentication context
├── public/                    # Static assets
├── .env.local                # Environment variables (API URL)
└── package.json              # Dependencies
```

---

## 🔌 Backend Integration

### API Client (`src/lib/api.ts`)

All pages fetch real ML data from the backend:

```typescript
import { fetchDashboardData, fetchForecastData, 
         fetchAppliancesData, fetchDevicesData } from '@/lib/api'

// Example usage
const data = await fetchDashboardData()
```

### Environment Configuration

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### API Endpoints

| Endpoint | Used By | Returns |
|----------|---------|---------|
| `/api/dashboard` | Dashboard, Optimization | Real-time metrics, forecasts, breakdowns |
| `/api/forecast` | Forecast page | 7-day hourly predictions |
| `/api/appliances` | Appliances page | All 10 devices with consumption |
| `/api/devices` | Reports page | Device summary data |

---

## 📊 Pages & Features

### 1. Dashboard (`/dashboard`)
- **Real-time metrics**: Current consumption, 24h predictions, energy saved
- **Hourly forecast chart**: Next 24 hours of predicted usage
- **Appliance breakdown**: Pie chart showing device consumption
- **Key insights**: ML-generated recommendations
- **Optimization schedule**: Best times to run appliances
- **Auto-refresh**: Every 5 minutes
- **Status**: 🔴 LIVE indicator when connected

### 2. Forecast (`/forecast` via `components/Forecast.tsx`)
- **7-day forecast**: Daily predictions with confidence intervals
- **Peak periods**: Identifies high-usage time windows
- **Hourly breakdown**: Detailed hourly predictions
- **Auto-refresh**: Every 5 minutes
- **Status**: 🔴 LIVE indicator

### 3. Appliances (`/appliances`)
- **Device list**: All 10 smart home devices
- **Real-time consumption**: Current usage per device
- **Device details**: Location, status, flexibility
- **Search & filter**: Find devices quickly
- **Auto-refresh**: Every 5 minutes
- **Status**: 🔴 LIVE indicator

### 4. Optimization (`/optimization`)
- **Current vs Optimized**: Energy usage comparison chart
- **Schedule recommendations**: When to run each appliance
- **Potential savings**: 15% energy reduction estimate
- **Auto-refresh**: Every 5 minutes
- **Status**: 🔴 LIVE indicator

### 5. Reports (`/reports`)
- **Monthly statistics**: Total usage, savings, peak demand
- **Forecast vs Actual**: Model accuracy tracking
- **Historical trends**: Energy usage over time
- **Export options**: PDF/CSV download
- **Auto-refresh**: Every 5 minutes
- **Status**: 🔴 LIVE indicator

---

## 🎨 UI/UX Features

### Design System
- **Framework**: Tailwind CSS
- **Color Scheme**: Dark theme with emerald accents
- **Typography**: System fonts, responsive sizing
- **Icons**: Lucide React icons
- **Charts**: Recharts library

### Responsive Design
- **Mobile**: Optimized for screens 375px+
- **Tablet**: Adapts for 768px+
- **Desktop**: Full experience at 1024px+
- **Mobile menu**: Slide-out navigation on small screens

### Loading States
- Animated spinner during data fetch
- Skeleton screens for better UX
- No UI flicker or jumps

### Error Handling
- Red warning banners with clear messages
- Automatic fallback to cached data
- User-friendly error descriptions
- Backend connection status indicators

---

## 🔄 Data Flow

```
Backend ML API (Port 8000)
    ↓
FastAPI Endpoints
    ↓
API Client (api.ts)
    ↓
useEffect Hooks (fetch on mount + every 5 min)
    ↓
React State (useState)
    ↓
UI Components
    ↓
User sees 🔴 LIVE real ML predictions
```

---

## 🛠️ Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

---

## 📦 Dependencies

### Core
- **Next.js**: 15.5.6 (App Router)
- **React**: 18.3.1
- **TypeScript**: 5.x

### UI Libraries
- **Tailwind CSS**: 3.x
- **Lucide React**: Icons
- **Recharts**: Data visualization
- **Framer Motion**: Animations (optional)

### API Client
- **Axios**: HTTP requests
- **CORS**: Enabled in backend

---

## 🔒 Authentication

The app includes basic authentication context:

```typescript
// src/context/AuthContext.tsx
const { isAuthenticated, login, logout } = useAuth()
```

**Note**: Currently uses mock authentication. Replace with real auth system for production.

---

## ⚡ Performance Optimization

### Implemented
- ✅ Auto-refresh every 5 minutes (not real-time to save resources)
- ✅ Component lazy loading
- ✅ Image optimization (Next.js Image component)
- ✅ API response caching
- ✅ Efficient re-renders with React.memo

### Recommended
- Add service worker for offline support
- Implement WebSocket for real-time updates
- Add Redis caching on backend
- Optimize bundle size with code splitting

---

## 🐛 Troubleshooting

### "Backend not running" error
1. Check backend is running: `curl http://localhost:8000/`
2. Verify `.env.local` has correct URL
3. Restart frontend: `npm run dev`
4. Check browser console for errors

### Data not updating
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Check Network tab in DevTools
4. Verify API endpoints return 200 OK

### Build errors
1. Delete `.next` folder
2. Delete `node_modules`
3. Run `npm install`
4. Run `npm run build`

### TypeScript errors
1. Run `npx tsc --noEmit` to see errors
2. Fix type issues in components
3. Update `tsconfig.json` if needed

---

## 📝 Code Style

### TypeScript Best Practices
- Use explicit types for props
- Avoid `any` types
- Use interfaces for objects
- Export types from components

### React Best Practices
- Use functional components
- Implement proper error boundaries
- Clean up useEffect subscriptions
- Memoize expensive computations

### Naming Conventions
- Components: `PascalCase.tsx`
- Files: `kebab-case.ts`
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel via CLI or dashboard
```

### Environment Variables
Set in deployment platform:
```env
NEXT_PUBLIC_API_URL=https://your-backend.com
```

### Production Checklist
- ✅ Set correct API URL
- ✅ Enable error tracking (Sentry)
- ✅ Configure analytics
- ✅ Test all pages
- ✅ Check mobile responsiveness
- ✅ Verify API endpoints
- ✅ Enable HTTPS
- ✅ Set up monitoring

---

## 📊 ML Integration Status

| Page | Backend Connected | Data Source | Status |
|------|------------------|-------------|--------|
| Dashboard | ✅ Yes | Real ML predictions | 🔴 LIVE |
| Forecast | ✅ Yes | 7-day ML forecast | 🔴 LIVE |
| Appliances | ✅ Yes | Device consumption | 🔴 LIVE |
| Optimization | ✅ Yes | ML recommendations | 🔴 LIVE |
| Reports | ✅ Yes | Historical ML data | 🔴 LIVE |

**100% of pages display real ML predictions!** 🎉

---

## 🎯 Future Enhancements

### Planned Features
- [ ] WebSocket for real-time updates
- [ ] Push notifications for anomalies
- [ ] User preferences & settings
- [ ] Multi-home support
- [ ] Mobile app (React Native)
- [ ] Voice assistant integration
- [ ] Advanced analytics dashboard
- [ ] Energy saving goals & tracking

### Technical Improvements
- [ ] GraphQL API layer
- [ ] Redux for state management
- [ ] Progressive Web App (PWA)
- [ ] Offline mode with service workers
- [ ] A/B testing framework
- [ ] Comprehensive test suite

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review backend README
3. Check browser console for errors
4. Verify backend is running
5. Clear cache and restart

---

## 📄 License

See LICENSE file in project root.

---

**Last Updated**: November 29, 2025  
**Version**: 2.0.0  
**Status**: Production Ready ✅
