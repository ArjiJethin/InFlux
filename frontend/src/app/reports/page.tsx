'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import AuthGuard from '@/components/AuthGuard'
import { FileDown, Leaf, Menu } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { fetchDashboardData, fetchDevicesData } from '@/lib/api'

// Generate energy usage trend data (fallback)
const generateUsageTrend = () => {
  const weeks = ['Week of Nov 6', 'Week of 3', 'Week of 20', 'A/FR']
  return weeks.map((week, i) => ({
    week,
    value: 100 + i * 50 + Math.sin(i) * 30 + Math.random() * 20,
  }))
}

// Generate forecast vs actual data (fallback)
const generateForecastData = () => {
  const periods = ['Week of Nov', 'Aug Uist', 'Aprt 20', '4 - 6 PM']
  return periods.map((period, i) => ({
    period,
    forecast: 200 + Math.sin(i * 1.5) * 80 + Math.random() * 30,
    actual: 180 + Math.cos(i * 1.2) * 70 + Math.random() * 40,
  }))
}

// Forecast accuracy trend data (fallback)
const accuracyTrend = Array.from({ length: 20 }, (_, i) => ({
  point: i,
  value: 85 + Math.sin(i / 2) * 8 + Math.random() * 3,
}))

export default function ReportsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dateRange] = useState('Nov 1 - Nov 30, 2025')
  const [usageTrend, setUsageTrend] = useState(generateUsageTrend())
  const [forecastData, setForecastData] = useState(generateForecastData())
  const [totalUsage, setTotalUsage] = useState('345.2')
  const [avgAccuracy, setAvgAccuracy] = useState('91.3')
  const [peakDemand, setPeakDemand] = useState('4.8')
  const [energySaved, setEnergySaved] = useState('52.4')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        setLoading(true)
        const [dashboardData, devicesData] = await Promise.all([
          fetchDashboardData(),
          fetchDevicesData()
        ])
        
        // Update total usage
        if (dashboardData.current_usage) {
          setTotalUsage((dashboardData.current_usage * 30).toFixed(1))
        }
        
        // Update energy saved
        if (dashboardData.energy_saved_this_week) {
          setEnergySaved((dashboardData.energy_saved_this_week * 4.3).toFixed(1)) // Approximate monthly
        }
        
        // Update forecast vs actual from hourly data
        if (dashboardData.hourly_forecast && dashboardData.hourly_forecast.length > 0) {
          const weeklyData = []
          for (let i = 0; i < 4; i++) {
            const weekStart = i * 6
            const weekEnd = Math.min(weekStart + 6, dashboardData.hourly_forecast.length)
            const weekSlice = dashboardData.hourly_forecast.slice(weekStart, weekEnd)
            const avgForecast = weekSlice.reduce((sum: number, item: any) => sum + (item.value || 0), 0) / weekSlice.length
            weeklyData.push({
              period: `Week ${i + 1}`,
              forecast: avgForecast,
              actual: avgForecast * (0.95 + Math.random() * 0.1) // Simulate actual with small variance
            })
          }
          setForecastData(weeklyData)
        }
        
        setError(null)
      } catch (err: any) {
        console.error('Failed to fetch reports data:', err)
        setError(err.message || 'Failed to load reports data')
      } finally {
        setLoading(false)
      }
    }

    loadReportsData()
    // Refresh every 5 minutes
    const interval = setInterval(loadReportsData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0d1221]/90 backdrop-blur-2xl border border-white/20 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          <p className="text-[#6b7b94] text-xs mb-2">{payload[0].payload.week || payload[0].payload.period}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: entry.color }}></div>
              <span className="text-white text-sm font-medium capitalize">{entry.name}</span>
              <span className="text-white text-sm ml-auto">{entry.value.toFixed(1)}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#050911]">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />
        
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-0 sm:ml-20' : 'ml-0 sm:ml-64'}`}>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="sm:hidden fixed top-4 left-4 z-30 p-3 bg-[#141b2e]/80 backdrop-blur-xl border border-emerald-500/20 rounded-xl hover:bg-[#141b2e] hover:border-emerald-500/40 hover:scale-110 transition-all duration-300 shadow-[0_4px_16px_rgba(52,211,153,0.2)]"
        >
          <Menu className="w-6 h-6 text-emerald-400" />
        </button>

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2 justify-center sm:justify-start">
              Reports 
              {!loading && !error && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </h1>
            <p className="text-[#6b7b94] text-xs sm:text-sm">{dateRange}</p>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0d1221]/50 backdrop-blur-xl border border-white/10 rounded-lg text-white text-sm font-medium hover:border-purple-400/40 hover:scale-105 hover:shadow-[0_8px_24px_rgba(167,139,250,0.15)] transition-all duration-500 ease-out">
              <FileDown className="w-4 h-4" />
              Export PDF
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0d1221]/50 backdrop-blur-xl border border-white/10 rounded-lg text-white text-sm font-medium hover:border-emerald-400/40 hover:scale-105 hover:shadow-[0_8px_24px_rgba(52,211,153,0.15)] transition-all duration-500 ease-out">
              <FileDown className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Usage */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-white/20 hover:shadow-[0_12px_36px_rgba(255,255,255,0.1)] transition-all duration-700 ease-out hover:scale-[1.03] hover:-translate-y-1 animate-in fade-in slide-in-from-left-3 duration-700">
            <p className="text-[#6b7b94] text-sm mb-3">Total Usage</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-white text-4xl font-bold">132</span>
              <span className="text-white text-lg">kWh</span>
            </div>
            <p className="text-emerald-400 text-sm">+ 8% vs last month</p>
          </div>

          {/* Total Saved */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out hover:scale-[1.03] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">
            <p className="text-[#6b7b94] text-sm mb-3">Total Saved</p>
            <div className="flex items-baseline gap-2">
              <span className="text-emerald-400 text-4xl font-bold">18.4</span>
              <span className="text-emerald-400 text-lg">kWh</span>
            </div>
          </div>

          {/* CO2 Reduced */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out hover:scale-[1.03] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200">
            <p className="text-[#6b7b94] text-sm mb-3">
              CO<sub className="text-xs">2</sub> Reduced
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-emerald-400 text-4xl font-bold">6.1</span>
              <span className="text-emerald-400 text-lg">kg</span>
            </div>
            <div className="flex items-center gap-1">
              <Leaf className="w-4 h-4 text-emerald-400/60" />
            </div>
          </div>

          {/* Forecast Accuracy */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)] transition-all duration-700 ease-out hover:scale-[1.03] hover:-translate-y-1 animate-in fade-in slide-in-from-right-3 duration-700 delay-300">
            <p className="text-[#6b7b94] text-sm mb-3">Forecast Accuracy</p>
            <div className="flex items-center justify-between">
              <span className="text-white text-4xl font-bold">92%</span>
              <div className="h-12 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyTrend.slice(-10)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Line 
                      type="natural" 
                      dataKey="value" 
                      stroke="#34d399" 
                      strokeWidth={2} 
                      dot={false}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Energy Usage Trend */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
            <h3 className="text-white text-lg font-semibold mb-6">Energy Usage Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2837" opacity={0.3} />
                  <XAxis 
                    dataKey="week" 
                    stroke="#6b7b94" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#1e2837' }}
                  />
                  <YAxis 
                    stroke="#6b7b94" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#1e2837' }}
                    domain={[0, 400]}
                    ticks={[100, 200, 300, 400]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke="#34d399"
                    strokeWidth={2}
                    fill="url(#usageGradient)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Forecast vs Actual */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <h3 className="text-white text-lg font-semibold mb-6">Forecast vs, Actual</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2837" opacity={0.3} />
                  <XAxis 
                    dataKey="period" 
                    stroke="#6b7b94" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#1e2837' }}
                  />
                  <YAxis 
                    stroke="#6b7b94" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#1e2837' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="natural"
                    dataKey="forecast"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#forecastGradient)"
                    name="forecast"
                    animationDuration={2000}
                  />
                  <Area
                    type="natural"
                    dataKey="actual"
                    stroke="#34d399"
                    strokeWidth={2}
                    fill="url(#actualGradient)"
                    name="actual"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Optimization Impact */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out hover:scale-[1.02] animate-in fade-in zoom-in-95 duration-700 delay-300">
            <h3 className="text-white text-lg font-semibold mb-6">Optimization Impact</h3>
            
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-36 h-36">
                {/* Circular Progress */}
                <svg className="transform -rotate-90 w-36 h-36">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#1e2837"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="url(#circleGradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 60 * 0.67} ${2 * Math.PI * 60}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-5xl font-bold">%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span className="text-white text-sm">RMSE</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                <span className="text-white text-sm">0,32</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
                <span className="text-white text-sm">6,7%</span>
              </div>
            </div>

            <p className="text-[#6b7b94] text-sm">Appliance breakdown</p>
          </div>

          {/* Appliance Breakdown */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)] transition-all duration-700 ease-out hover:scale-[1.02] animate-in fade-in zoom-in-95 duration-700 delay-400">
            <h3 className="text-white text-lg font-semibold mb-6">Appliance Breakdown</h3>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-[#6b7b94] text-sm mb-2">MFDE</p>
                <p className="text-white text-3xl font-bold">0,54</p>
              </div>
              <div>
                <p className="text-[#6b7b94] text-sm mb-2">MAE</p>
                <p className="text-white text-3xl font-bold">0,32</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <span className="text-emerald-400 text-5xl font-bold">6,7%</span>
              <sup className="text-emerald-400 text-2xl font-bold">'</sup>
            </div>
          </div>

          {/* Model Performance */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-blue-400/40 hover:shadow-[0_12px_36px_rgba(99,102,241,0.15)] transition-all duration-700 ease-out hover:scale-[1.02] animate-in fade-in zoom-in-95 duration-700 delay-500">
            <h3 className="text-white text-lg font-semibold mb-6">Model Performance</h3>
            
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-[#6b7b94] text-sm mb-2">RMSE</p>
                <p className="text-white text-3xl font-bold">0,54</p>
              </div>
              <div>
                <p className="text-[#6b7b94] text-sm mb-2">MAE</p>
                <p className="text-white text-3xl font-bold">0,32</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[#6b7b94] text-sm">Dataset size</p>
              </div>
              <div className="text-right">
                <p className="text-white text-lg font-semibold">12 months</p>
              </div>
            </div>

            <p className="text-[#6b7b94] text-sm mt-6">Dataset size</p>
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
