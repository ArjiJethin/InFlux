'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Calendar, TrendingUp, Clock, Activity } from 'lucide-react'
import { fetchForecastData } from '@/lib/api'

// Generate forecast data (fallback)
const generateForecastData = () => {
  const data = []
  for (let i = 9; i <= 15; i++) {
    const baseValue = 1.5 + Math.sin(i / 2) * 0.4
    data.push({
      day: i.toString(),
      value: baseValue + Math.random() * 0.2,
      confidence: 0.85 + Math.random() * 0.1
    })
  }
  return data
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1221]/80 backdrop-blur-2xl border border-white/20 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <p className="text-white font-semibold text-lg">{payload[0].value.toFixed(2)} kWh</p>
        <p className="text-[#6b7b94] text-sm">Day {payload[0].payload.day}</p>
      </div>
    )
  }
  return null
}

export default function Forecast() {
  const [forecastData, setForecastData] = useState(generateForecastData())
  const [peakUsagePeriods, setPeakUsagePeriods] = useState([
    { time: '6 PM - 10 PM', date: '16 Nov', value: '1.85 kW/h' },
    { time: '11 AM - 1 PM', date: '12 Nov', value: '1.73 kW/h' },
    { time: '7 AM - 9 AM', date: '15 Nov', value: '1.65 kW/h' },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [peakValue, setPeakValue] = useState('1.92')

  useEffect(() => {
    const loadForecastData = async () => {
      try {
        setLoading(true)
        const data = await fetchForecastData()
        
        // Update forecast chart data
        if (data.forecast_7_days) {
          setForecastData(data.forecast_7_days)
        }
        
        // Update peak periods
        if (data.peak_periods) {
          setPeakUsagePeriods(data.peak_periods)
        }
        
        // Update peak value
        if (data.peak_value) {
          setPeakValue(data.peak_value.toFixed(2))
        }
        
        setError(null)
      } catch (err: any) {
        console.error('Failed to fetch forecast data:', err)
        setError(err.message || 'Failed to load forecast data')
      } finally {
        setLoading(false)
      }
    }

    loadForecastData()
    // Refresh every 5 minutes
    const interval = setInterval(loadForecastData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm">⚠️ {error}</p>
          <p className="text-red-300/60 text-xs mt-1">Using cached data. Make sure backend is running.</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2 justify-center sm:justify-start">
            Forecast 
            {!loading && !error && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 text-[#6b7b94] text-xs sm:text-sm flex-wrap">
            <span>Household</span>
            <span className="text-[#3d4a5c]">•</span>
            <span>Nov 9, 2025 - Nov 15, 2025</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105">
            kWh
          </button>
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#6b7b94] text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105">
            7D
          </button>
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#6b7b94] text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105">
            14D
          </button>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-500 hover:scale-[1.01]">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-2">Energy Usage Forecast</h2>
            <div className="flex items-center gap-2 text-[#6b7b94] text-xs sm:text-sm">
              <Clock className="w-4 h-4" />
              <span>Updated every hour</span>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">{peakValue} <span className="text-base sm:text-lg lg:text-xl text-[#6b7b94]">kWh</span></div>
            <div className="flex items-center justify-center sm:justify-end gap-2 text-[#6b7b94] text-xs sm:text-sm">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>≈ 6 PM</span>
            </div>
          </div>
        </div>

        <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="50%" stopColor="#6366f1" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="40%" stopColor="#34d399" />
                  <stop offset="70%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.2} vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="transparent" 
                tick={{ fill: '#6b7b94', fontSize: 13 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="transparent"
                tick={{ fill: '#6b7b94', fontSize: 13 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="natural" 
                dataKey="value" 
                stroke="url(#lineGradient)" 
                strokeWidth={3}
                fill="url(#forecastGradient)"
                animationDuration={2000}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prediction Confidence */}
        <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2">
          <h3 className="text-white text-lg font-semibold mb-4">Prediction Confidence</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">High</div>
              <div className="text-emerald-400 font-semibold">91%</div>
            </div>
          </div>
        </div>

        {/* Last Retrained */}
        <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)] transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2">
          <h3 className="text-white text-lg font-semibold mb-4">Last Retrained</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">LSTM model on 11/5/2025</div>
            </div>
          </div>
        </div>

        {/* Recent Model Updates */}
        <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-blue-400/40 hover:shadow-[0_12px_36px_rgba(99,102,241,0.15)] transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2">
          <h3 className="text-white text-lg font-semibold mb-4">Recent Model Updates</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-[#6b7b94] text-sm">RMSE</div>
              <div className="text-3xl font-bold text-white">0.13</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Usage Periods */}
        <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1">
          <h3 className="text-white text-lg font-semibold mb-6">Peak Usage Periods</h3>
          <div className="space-y-4">
            {peakUsagePeriods.map((period, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/10 hover:border-emerald-400/30 hover:bg-[#0d1221]/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <div>
                    <div className="text-white font-medium">{period.time}</div>
                    <div className="text-[#6b7b94] text-sm">{period.date}</div>
                  </div>
                </div>
                <div className="text-white font-semibold">{period.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Forecast Accuracy */}
        <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)] transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1">
          <h3 className="text-white text-lg font-semibold mb-6">Forecast Accuracy</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#1e2837"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#accuracyGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56 * 0.87} ${2 * Math.PI * 56}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">87%</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData.slice(0, 5)}>
                    <defs>
                      <linearGradient id="miniGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="natural" 
                      dataKey="value" 
                      stroke="#10b981" 
                      strokeWidth={2.5}
                      fill="url(#miniGradient)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[#6b7b94] text-sm mt-2">Consistently accurate predictions over the last 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
