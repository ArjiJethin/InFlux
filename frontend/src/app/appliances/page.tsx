    'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import AuthGuard from '@/components/AuthGuard'
import { Search, Monitor, Lightbulb, Wind, Droplets, Zap, Shirt, UtensilsCrossed, Laptop } from 'lucide-react'

interface Appliance {
  id: number
  name: string
  location: string
  consumption: number
  icon: any
  status: 'flexible' | 'active' | 'standby'
  iconBg: string
}

export default function AppliancesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'flexible'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const appliances: Appliance[] = [
    { id: 1, name: 'AC', location: 'Bedroom', consumption: 4.2, icon: Wind, status: 'flexible', iconBg: 'from-blue-500/20 to-cyan-500/20' },
    { id: 2, name: 'Washing Machine', location: 'Laundry Room', consumption: 3.1, icon: Shirt, status: 'flexible', iconBg: 'from-emerald-500/20 to-teal-500/20' },
    { id: 3, name: 'Lights', location: 'Living Room', consumption: 1.8, icon: Lightbulb, status: 'flexible', iconBg: 'from-yellow-500/20 to-amber-500/20' },
    { id: 4, name: 'EV Charger', location: 'Garage', consumption: 1.6, icon: Zap, status: 'flexible', iconBg: 'from-emerald-500/20 to-green-500/20' },
    { id: 5, name: 'Dishwasher', location: 'Kitchen', consumption: 1.3, icon: UtensilsCrossed, status: 'flexible', iconBg: 'from-purple-500/20 to-indigo-500/20' },
    { id: 6, name: 'Computer', location: 'Office', consumption: 0.9, icon: Monitor, status: 'flexible', iconBg: 'from-slate-500/20 to-gray-500/20' },
    { id: 7, name: 'Water Heater', location: 'Bathroom', consumption: 1.3, icon: Droplets, status: 'flexible', iconBg: 'from-blue-500/20 to-cyan-500/20' },
    { id: 8, name: 'Dishwasher', location: 'Kitchen', consumption: 0.9, icon: UtensilsCrossed, status: 'flexible', iconBg: 'from-purple-500/20 to-indigo-500/20' },
    { id: 9, name: 'Computer', location: 'Office', consumption: 0.7, icon: Laptop, status: 'flexible', iconBg: 'from-slate-500/20 to-gray-500/20' },
  ]

  const filteredAppliances = appliances.filter(appliance => {
    const matchesFilter = filter === 'all' || appliance.status === 'flexible'
    const matchesSearch = appliance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          appliance.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

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

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">Appliances</h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#6b7b94]" />
            <input
              type="text"
              placeholder="Search appliances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 bg-[#0d1221]/50 backdrop-blur-xl border border-white/10 rounded-lg text-white text-xs sm:text-sm placeholder:text-[#6b7b94] focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-500 ease-out hover:border-white/20"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-500 ease-out hover:scale-105 ${
              filter === 'all'
                ? 'bg-[#0d1221] text-white border border-white/20 shadow-[0_4px_16px_rgba(52,211,153,0.1)]'
                : 'bg-[#0d1221]/30 text-[#6b7b94] border border-white/5 hover:border-white/10 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('flexible')}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-500 ease-out hover:scale-105 ${
              filter === 'flexible'
                ? 'bg-[#0d1221] text-emerald-400 border border-emerald-400/30 shadow-[0_4px_16px_rgba(52,211,153,0.2)]'
                : 'bg-[#0d1221]/30 text-[#6b7b94] border border-white/5 hover:border-white/10 hover:text-white'
            }`}
          >
            Flexible
          </button>
        </div>

        {/* Appliances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppliances.map((appliance, index) => {
            const Icon = appliance.icon
            return (
              <div
                key={appliance.id}
                className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out hover:scale-[1.03] hover:-translate-y-2 cursor-pointer animate-in fade-in zoom-in-95"
                style={{ animationDelay: `${index * 50}ms`, animationDuration: '700ms' }}
              >
                {/* Icon and Name */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${appliance.iconBg} backdrop-blur-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out border border-white/10`}>
                      {/* Custom styled icon with decorative elements */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent"></div>
                      <Icon className="w-7 h-7 text-white relative z-10" strokeWidth={2} />
                      {/* Decorative accent based on appliance type */}
                      {appliance.name === 'AC' && (
                        <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
                          <div className="w-1 h-1 rounded-full bg-cyan-400/60"></div>
                          <div className="w-1 h-1 rounded-full bg-cyan-400/60"></div>
                          <div className="w-1 h-1 rounded-full bg-cyan-400/60"></div>
                        </div>
                      )}
                      {appliance.name === 'Washing Machine' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full border-2 border-blue-400/40"></div>
                        </div>
                      )}
                      {appliance.name === 'Lights' && (
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-yellow-400/60 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-1">{appliance.name}</h3>
                      <p className="text-[#6b7b94] text-sm">{appliance.location}</p>
                    </div>
                  </div>
                </div>

                {/* Consumption */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-3xl font-bold">{appliance.consumption.toFixed(1).replace('.', ',')}</span>
                    <span className="text-emerald-400 text-lg font-medium">kWh</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-500 ${
                    appliance.status === 'flexible'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
                      : 'bg-[#6b7b94]/20 text-[#6b7b94] border border-[#6b7b94]/30'
                  }`}>
                    {appliance.status === 'flexible' ? 'Flexible' : 'Active'}
                  </span>

                  {/* Animated Indicator */}
                  {appliance.status === 'flexible' && (
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                    </div>
                  )}
                </div>

                {/* Always Visible Details */}
                <div className="pt-4 border-t border-white/5 space-y-2 transition-all duration-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6b7b94]">Daily Usage</span>
                    <span className="text-white font-medium">{(appliance.consumption * 1.5).toFixed(1)} kWh</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6b7b94]">Monthly Cost</span>
                    <span className="text-emerald-400 font-medium">€{(appliance.consumption * 30 * 0.25).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAppliances.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-700">
            <div className="w-20 h-20 rounded-full bg-[#0d1221]/50 backdrop-blur-xl flex items-center justify-center mb-4 border border-white/10">
              <Search className="w-10 h-10 text-[#6b7b94]" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">No appliances found</h3>
            <p className="text-[#6b7b94] text-sm">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out hover:scale-[1.02]">
            <p className="text-[#6b7b94] text-sm mb-2">Total Appliances</p>
            <p className="text-white text-3xl font-bold">{appliances.length}</p>
          </div>
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)] transition-all duration-700 ease-out hover:scale-[1.02]">
            <p className="text-[#6b7b94] text-sm mb-2">Total Consumption</p>
            <p className="text-emerald-400 text-3xl font-bold">
              {appliances.reduce((sum, a) => sum + a.consumption, 0).toFixed(1)} <span className="text-lg">kWh</span>
            </p>
          </div>
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-blue-400/40 hover:shadow-[0_12px_36px_rgba(99,102,241,0.15)] transition-all duration-700 ease-out hover:scale-[1.02]">
            <p className="text-[#6b7b94] text-sm mb-2">Flexible Devices</p>
            <p className="text-white text-3xl font-bold">
              {appliances.filter(a => a.status === 'flexible').length}
            </p>
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
