# Frontend Quick Start Guide

## Install Dependencies

```bash
cd frontend
npm install
```

## Run Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

## What's Included

✅ **Fully Functional Dashboard** matching the EcoPulse design
✅ **Responsive Layout** - works on desktop, tablet, and mobile
✅ **Interactive Sidebar** - collapsible navigation
✅ **Real-time Metrics** - Today's consumption, predictions, savings
✅ **Energy Chart** - 48h usage and forecast visualization
✅ **Appliance Breakdown** - Pie chart showing energy distribution
✅ **Optimization Schedule** - Timeline with optimal usage windows
✅ **Key Insights** - Smart recommendations panel

## Features

- **Dark Theme** - Modern dark UI matching the reference design
- **Smooth Animations** - Transitions and hover effects
- **Recharts Integration** - Beautiful, responsive charts
- **Lucide Icons** - Clean, modern icon set
- **Tailwind CSS** - Utility-first styling

## Components Structure

```
components/
├── Dashboard.tsx           # Main dashboard container
├── Sidebar.tsx            # Collapsible navigation sidebar
├── MetricCards.tsx        # Top metric cards
├── EnergyChart.tsx        # 48h energy usage chart
├── KeyInsights.tsx        # Insights and tips panel
├── ApplianceBreakdown.tsx # Pie chart for appliances
└── OptimizationSchedule.tsx # Timeline schedule
```

## Customization

You can easily customize colors, metrics, and data in each component file.

### Example: Change Primary Color

In `tailwind.config.ts`, modify the color values or use Tailwind's built-in colors throughout the components.

### Example: Update Chart Data

Edit the data generation functions in `EnergyChart.tsx` or `ApplianceBreakdown.tsx`.

## Next Steps

1. **Connect to Backend API** - Update `src/lib/api.ts` with real endpoints
2. **Add Authentication** - Implement user login/signup
3. **Real-time Updates** - Add WebSocket for live data
4. **More Pages** - Create Forecast, Optimization, Appliances pages
5. **Mobile App** - Consider React Native version

Enjoy building! 🚀
