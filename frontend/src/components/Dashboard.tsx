'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import MetricCards from './MetricCards'
import EnergyChart from './EnergyChart'
import ApplianceBreakdown from './ApplianceBreakdown'
import OptimizationSchedule from './OptimizationSchedule'
import KeyInsights from './KeyInsights'

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#050911]">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-0 sm:ml-20' : 'ml-0 sm:ml-64'}`}>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="sm:hidden fixed top-4 left-4 z-30 p-3 bg-[#141b2e]/80 backdrop-blur-xl border border-emerald-500/20 rounded-xl hover:bg-[#141b2e] hover:border-emerald-500/40 hover:scale-110 transition-all duration-300 shadow-[0_4px_16px_rgba(52,211,153,0.2)]"
        >
          <Menu className="w-6 h-6 text-emerald-400" />
        </button>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-1">Overview</h1>
            <p className="text-[#6b7b94] text-xs sm:text-sm flex items-center justify-center gap-2">
              <span>Household</span>
              <span>•</span>
              <span>November 16, 2025</span>
            </p>
          </div>

          {/* Metric Cards - Responsive grid */}
          <MetricCards />

          {/* Main Content Grid - Responsive 1 or 2 columns */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mt-6">
            {/* Left Column - Energy Chart and Appliance Breakdown */}
            <div className="space-y-4 sm:space-y-6">
              <EnergyChart />
              <ApplianceBreakdown />
            </div>

            {/* Right Column - Key Insights and Optimization Schedule */}
            <div className="space-y-4 sm:space-y-6">
              <KeyInsights />
              <OptimizationSchedule />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
