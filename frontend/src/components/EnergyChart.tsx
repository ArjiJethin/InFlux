'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const generateData = () => {
  const labels = ['4d', '7da', '30h', '48h']
  const data = []
  
  for (let i = 0; i < 48; i++) {
    const baseValue = 2 + Math.sin(i / 6) * 1.5
    const noise = Math.random() * 0.5
    
    data.push({
      time: i,
      value: baseValue + noise,
    })
  }
  
  return data
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1221]/90 backdrop-blur-xl border border-white/20 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold">{payload[0].value.toFixed(2)} kWh</p>
        <p className="text-[#6b7b94] text-xs">Hour {payload[0].payload.time}</p>
      </div>
    )
  }
  return null
}

export default function EnergyChart() {
  const data = generateData()

  return (
    <div className="group bg-[#141b2e]/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/5 hover:border-emerald-400/40 hover:shadow-[0_8px_24px_rgba(52,211,153,0.15)] transition-all duration-500 hover:scale-[1.01]">
      <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
        <h3 className="text-white text-sm sm:text-base font-semibold">Energy Usage & Forecast</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
          <span className="text-[#6b7b94] text-xs sm:text-sm">48h</span>
        </div>
      </div>

      <div className="h-48 sm:h-56 lg:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#6b7b94" 
              tick={{ fill: '#6b7b94', fontSize: 11 }}
              axisLine={{ stroke: '#1f2937' }}
              tickFormatter={(value) => {
                if (value % 12 === 0) return `${value}h`
                return ''
              }}
            />
            <YAxis 
              stroke="#6b7b94" 
              tick={{ fill: '#6b7b94', fontSize: 11 }}
              axisLine={{ stroke: '#1f2937' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="natural" 
              dataKey="value" 
              stroke="#22c55e" 
              strokeWidth={2}
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-between mt-4 px-2">
        <span className="text-[#6b7b94] text-xs">4d</span>
        <span className="text-[#6b7b94] text-xs">7da</span>
        <span className="text-[#6b7b94] text-xs">30h</span>
        <span className="text-[#6b7b94] text-xs">48h</span>
      </div>
    </div>
  )
}
