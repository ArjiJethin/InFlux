# InFlux Frontend

Next.js-based frontend for the InFlux time series forecasting platform.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts, Chart.js
- **HTTP Client**: Axios
- **State Management**: React Hooks, SWR

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── TimeSeriesChart.tsx
│   │   └── DataUpload.tsx
│   └── lib/
│       └── api.ts            # API client
├── public/                    # Static assets
└── package.json
```

## Components

### TimeSeriesChart

Interactive time series visualization using Recharts.

```tsx
<TimeSeriesChart 
  data={[{ date: "2024-01-01", value: 100, prediction: 105 }]}
  title="Sales Forecast"
/>
```

### DataUpload

File upload component for CSV and JSON data.

```tsx
<DataUpload />
```

## API Integration

The frontend uses Axios to communicate with the FastAPI backend:

```typescript
import api, { endpoints } from '@/lib/api'

// Upload data
const response = await api.post(endpoints.uploadData, formData)

// Make prediction
const prediction = await api.post(endpoints.predict, {
  data: { dates, values },
  model_type: 'prophet',
  forecast_steps: 30
})
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy!

### Docker

```bash
docker build -t influx-frontend .
docker run -p 3000:3000 influx-frontend
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)
