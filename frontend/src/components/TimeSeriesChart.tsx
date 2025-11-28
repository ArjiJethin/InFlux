'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface TimeSeriesChartProps {
  data: Array<{ date: string; value: number; prediction?: number }>
  title?: string
}

export default function TimeSeriesChart({ data, title }: TimeSeriesChartProps) {
  return (
    <div className="w-full h-96 p-4 border rounded-lg">
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            name="Actual"
            strokeWidth={2}
          />
          {data.some(d => d.prediction !== undefined) && (
            <Line 
              type="monotone" 
              dataKey="prediction" 
              stroke="#82ca9d" 
              name="Prediction"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
