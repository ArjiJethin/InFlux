'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import AuthGuard from '@/components/AuthGuard'
import { Settings, ChevronDown, Droplets, Shirt, UtensilsCrossed, Zap, ChevronRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { fetchDashboardData, fetchAppliancesData } from '@/lib/api'
import { AIInsightsGenerator } from '@/lib/aiInsights'

// Generate optimization data (fallback)
const generateOptimizationData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  return hours.map(hour => ({
    hour,
    current: 1 + Math.sin(hour / 3.5) * 1.2 + Math.random() * 0.3,
    optimized: 0.8 + Math.cos(hour / 4) * 1.5 + Math.random() * 0.2,
  }))
}

const scenarioData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  value: 1 + Math.sin(i / 3.5) * 1.2 + Math.random() * 0.3,
}))

export default function OptimizationPage() {
  const [household, setHousehold] = useState('Household')
  const [schedule, setSchedule] = useState('Schedule: Custom')
  const [autoApply, setAutoApply] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [data, setData] = useState(generateOptimizationData())
  const [recommendations, setRecommendations] = useState([
    { id: 1, icon: Droplets, name: 'Water Heater', shift: 'Shift to 5 - 6 AM', color: 'emerald' },
    { id: 2, icon: Shirt, name: 'Washing Machine', shift: 'Shift to 4 - 6 PM', color: 'emerald' },
    { id: 3, icon: UtensilsCrossed, name: 'Dishwasher', shift: 'Shift to 4 - 6 PM', color: 'emerald' },
    { id: 4, icon: Zap, name: 'EV Charger', shift: 'Shift to 5 - 7 PM', color: 'emerald' },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOptimizationData = async () => {
      try {
        setLoading(true)
        const dashboardData = await fetchDashboardData()
        const appliancesData = await fetchAppliancesData()
        
        // Update optimization chart from hourly forecast
        if (dashboardData.hourly_forecast) {
          const optimizationChart = dashboardData.hourly_forecast.map((item: any) => ({
            hour: parseInt(item.hour) || 0,
            current: item.value || 0,
            optimized: (item.value || 0) * 0.85, // 15% reduction through optimization
          }))
          setData(optimizationChart)
        }
        
        // Generate AI-powered recommendations
        const aiRecommendations = AIInsightsGenerator.generateDeviceRecommendations(appliancesData)
        
        // Convert to component format
        const getIcon = (name: string) => {
          const lower = name.toLowerCase()
          if (lower.includes('water') || lower.includes('wh_')) return Droplets
          if (lower.includes('wash') || lower.includes('wm_')) return Shirt
          if (lower.includes('dish')) return UtensilsCrossed
          return Zap
        }
        
        const newRecommendations = aiRecommendations.slice(0, 4).map((rec: string, index: number) => ({
          id: index + 1,
          icon: getIcon(rec),
          name: rec.split(' ').slice(0, 2).join(' '), // First 2 words as name
          shift: rec, // Full recommendation as shift text
          color: 'emerald'
        }))
        setRecommendations(newRecommendations)
        
        setError(null)
      } catch (err: any) {
        console.error('Failed to fetch optimization data:', err)
        setError(err.message || 'Failed to load optimization data')
      } finally {
        setLoading(false)
      }
    }

    loadOptimizationData()
    // Refresh every 5 minutes
    const interval = setInterval(loadOptimizationData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0d1221]/80 backdrop-blur-2xl border border-white/20 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          <p className="text-[#6b7b94] text-xs mb-2">Hour {payload[0].payload.hour}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: entry.color }}></div>
              <span className="text-white text-sm font-medium capitalize">{entry.name}</span>
              <span className="text-white text-sm ml-auto">{entry.value.toFixed(1)} kWh</span>
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2 justify-center sm:justify-start">
              Optimization 
              {!loading && !error && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 flex-wrap">
              {/* Household Dropdown */}
              <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0d1221]/50 backdrop-blur-xl border border-white/10 rounded-lg hover:border-emerald-400/30 hover:scale-105 transition-all duration-500 ease-out">
                <span className="text-white text-xs sm:text-sm">{household}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#6b7b94]" />
              </button>

              {/* Schedule Dropdown */}
              <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0d1221]/50 backdrop-blur-xl border border-white/10 rounded-lg hover:border-emerald-400/30 hover:scale-105 transition-all duration-500 ease-out">
                <span className="text-white text-xs sm:text-sm">{schedule}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#6b7b94]" />
              </button>
            </div>
          </div>

          <button className="p-3 bg-[#0d1221]/50 backdrop-blur-xl border border-white/10 rounded-lg hover:border-purple-400/30 hover:scale-110 hover:rotate-90 transition-all duration-700 ease-out">
            <Settings className="w-5 h-5 text-[#6b7b94]" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Optimization Schedule */}
            <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="text-white text-lg font-semibold mb-6">Optimization Schedule</h3>

              {/* Timeline Visualization */}
              <div className="mb-8">
                <div className="relative">
                  {/* Hour markers */}
                  <div className="flex justify-between text-[#6b7b94] text-xs mb-3">
                    {[0, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((hour) => (
                      <span key={hour}>{hour}</span>
                    ))}
                  </div>

                  {/* Timeline bar */}
                  <div className="relative h-3 bg-[#0d1221]/50 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      style={{ left: '12.5%', width: '33.33%' }}
                    ></div>
                    <div 
                      className="absolute h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      style={{ left: '66.67%', width: '12.5%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#0d1221]/30 backdrop-blur-xl rounded-xl p-4 border border-white/5 hover:border-white/10 hover:scale-105 transition-all duration-500 ease-out animate-in fade-in slide-in-from-left-3 delay-100">
                  <p className="text-[#6b7b94] text-xs mb-1">Cost Saved</p>
                  <p className="text-white text-2xl font-bold">€12.40</p>
                </div>
                <div className="bg-[#0d1221]/30 backdrop-blur-xl rounded-xl p-4 border border-white/5 hover:border-emerald-400/20 hover:scale-105 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-3 delay-200">
                  <p className="text-[#6b7b94] text-xs mb-1">Energy Saved</p>
                  <p className="text-emerald-400 text-2xl font-bold">9,4 <span className="text-sm font-normal">kWh</span></p>
                </div>
                <div className="bg-[#0d1221]/30 backdrop-blur-xl rounded-xl p-4 border border-white/5 hover:border-emerald-400/20 hover:scale-105 transition-all duration-500 ease-out animate-in fade-in slide-in-from-right-3 delay-300">
                  <p className="text-[#6b7b94] text-xs mb-1">CO₂ Saved</p>
                  <p className="text-emerald-400 text-2xl font-bold">2,9 <span className="text-sm font-normal">kg</span></p>
                </div>
              </div>

              {/* Auto-Apply Toggle */}
              <div className="flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-emerald-400/20 transition-all duration-500 ease-out hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 delay-500">
                <span className="text-white text-sm font-medium">Auto-Apply Suggestions</span>
                <button
                  onClick={() => setAutoApply(!autoApply)}
                  className={`relative w-14 h-7 rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden ${
                    autoApply ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]' : 'bg-[#1e2837]'
                  }`}
                >
                  {/* Toggle Knob */}
                  <div
                    className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 ${
                      autoApply ? 'translate-x-7' : 'translate-x-0.5'
                    }`}
                  >
                    {/* Inner Glow when Active */}
                    {autoApply && (
                      <div className="absolute inset-1 rounded-full bg-emerald-400/30 animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Pulse Ring when Active */}
                  {autoApply && (
                    <div className="absolute inset-0 rounded-full">
                      <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping"></div>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="optimizedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2837" opacity={0.3} />
                    <XAxis 
                      dataKey="hour" 
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
                      domain={[0, 3]}
                      ticks={[0, 1, 2, 3]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="top" 
                      height={40}
                      iconType="line"
                      wrapperStyle={{ 
                        paddingBottom: '20px',
                        fontSize: '14px',
                      }}
                      formatter={(value) => <span className="text-white capitalize">{value}</span>}
                    />
                    <Area
                      type="natural"
                      dataKey="current"
                      stroke="#34d399"
                      strokeWidth={2}
                      fill="url(#currentGradient)"
                      name="current"
                      animationDuration={2000}
                    />
                    <Area
                      type="natural"
                      dataKey="optimized"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#optimizedGradient)"
                      name="optimized"
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recommendations */}
            <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out animate-in fade-in slide-in-from-right-4 duration-700">
              <h3 className="text-white text-lg font-semibold mb-6">Recommendation</h3>

              <div className="space-y-3">
                {recommendations.map((rec, index) => {
                  const Icon = rec.icon
                  return (
                    <div
                      key={rec.id}
                      className="group/item bg-[#0d1221]/30 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-emerald-400/30 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out cursor-pointer hover:scale-[1.03] hover:-translate-x-1 animate-in fade-in slide-in-from-right-3"
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover/item:scale-110 group-hover/item:bg-emerald-500/30 transition-all duration-500 ease-out">
                          <Icon className="w-5 h-5 text-emerald-400 group-hover/item:rotate-12 transition-all duration-500 ease-out" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-medium mb-1">{rec.name}</h4>
                          <p className="text-[#6b7b94] text-xs">{rec.shift}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-emerald-400 group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Scenario Comparison */}
            <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)] transition-all duration-700 ease-out animate-in fade-in slide-in-from-right-6 duration-700 delay-300">
              <h3 className="text-white text-lg font-semibold mb-6">Scenario Comparison</h3>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scenarioData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scenarioGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2837" opacity={0.2} />
                    <XAxis 
                      dataKey="hour" 
                      stroke="#6b7b94" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={{ stroke: '#1e2837' }}
                      ticks={[0, 3, 6, 9, 12, 15, 18, 21, 24]}
                    />
                    <YAxis 
                      stroke="#6b7b94" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={{ stroke: '#1e2837' }}
                      domain={[0, 3]}
                    />
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke="#34d399"
                      strokeWidth={2}
                      fill="url(#scenarioGradient)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
