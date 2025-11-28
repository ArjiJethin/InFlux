'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import AuthGuard from '@/components/AuthGuard'
import { ChevronRight, Menu } from 'lucide-react'

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [energyAlerts, setEnergyAlerts] = useState(true)
  const [optimizationSuggestions, setOptimizationSuggestions] = useState(true)

  const ToggleButton = ({ enabled, onChange, name }: { enabled: boolean; onChange: () => void; name: string }) => (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={enabled}
      aria-label={name}
      className={`relative w-14 h-7 rounded-full overflow-hidden ${
        enabled ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]' : 'bg-[#1e2837]'
      }`}
      style={{
        transition: 'background 700ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'background, box-shadow',
      }}
    >
      {/* Toggle Knob */}
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-lg z-10 ${
          enabled ? 'translate-x-7' : 'translate-x-0.5'
        }`}
        style={{
          transition: 'transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          willChange: 'transform',
        }}
      >
        {/* Inner Glow when Active */}
        {enabled && (
          <div className="absolute inset-1 rounded-full bg-emerald-400/30 animate-pulse"></div>
        )}
      </div>
      
      {/* Pulse Ring when Active */}
      {enabled && (
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping"></div>
        </div>
      )}
    </button>
  )

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
        <div className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-700 text-center sm:text-left">
          <h1 className="text-white text-2xl sm:text-3xl font-bold">Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* General Section */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-white/20 hover:shadow-[0_12px_36px_rgba(255,255,255,0.1)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-left-4 duration-700">
            <h2 className="text-white text-xl font-semibold mb-6">General</h2>
            
            <div className="space-y-4">
              {/* Household Name */}
              <button className="w-full flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
                <div className="flex-1 text-left">
                  <p className="text-[#6b7b94] text-sm mb-1">Household Name</p>
                  <p className="text-white text-base font-medium">Household 1</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
              </button>

              {/* Theme */}
              <button className="w-full flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
                <div className="flex-1 text-left">
                  <p className="text-[#6b7b94] text-sm mb-1">Theme</p>
                  <p className="text-white text-base font-medium">Dark</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
            <h2 className="text-white text-xl font-semibold mb-6">Notifications</h2>
            
            <div className="space-y-4">
              {/* Energy Alerts */}
              <div className="flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 transition-all duration-500">
                <p className="text-white text-base font-medium">Energy alerts</p>
                <ToggleButton 
                  enabled={energyAlerts} 
                  onChange={() => setEnergyAlerts(!energyAlerts)}
                  name="energyAlerts"
                />
              </div>

              {/* Optimization Suggestions */}
              <div className="flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 transition-all duration-500">
                <p className="text-white text-base font-medium">Optimization suggestions</p>
                <ToggleButton 
                  enabled={optimizationSuggestions} 
                  onChange={() => setOptimizationSuggestions(!optimizationSuggestions)}
                  name="optimizationSuggestions"
                />
              </div>
            </div>
          </div>

          {/* Energy Preferences Section */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
            <h2 className="text-white text-xl font-semibold mb-6">Energy Preferences</h2>
            
            <div className="space-y-4">
              {/* Cost per kWh */}
              <button className="w-full flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
                <div className="flex-1 text-left">
                  <p className="text-[#6b7b94] text-sm mb-1">Cost per kWh</p>
                  <p className="text-white text-base font-medium">₹ 5.30</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
              </button>

              {/* CO2 Limit */}
              <button className="w-full flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
                <div className="flex-1 text-left">
                  <p className="text-[#6b7b94] text-sm mb-1">
                    CO<sub className="text-xs">2</sub> limit
                  </p>
                  <p className="text-white text-base font-medium">12,5 kg/week</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
              </button>
            </div>
          </div>

          {/* Model Settings Section */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-blue-400/40 hover:shadow-[0_12px_36px_rgba(99,102,241,0.15)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
            <h2 className="text-white text-xl font-semibold mb-6">Model Settings</h2>
            
            <div className="space-y-4">
              {/* Forecast Model */}
              <button className="w-full flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
                <div className="flex-1 text-left">
                  <p className="text-[#6b7b94] text-sm mb-1">Forecast model</p>
                  <p className="text-white text-base font-medium">LSTM</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
              </button>

              {/* Re-training Frequency */}
              <button className="w-full flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
                <div className="flex-1 text-left">
                  <p className="text-[#6b7b94] text-sm mb-1">Re-training frequency</p>
                  <p className="text-white text-base font-medium">Weekly</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
              </button>
            </div>
          </div>

          {/* Account Section - Spanning 2 columns */}
          <div className="lg:col-span-2 group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-white/20 hover:shadow-[0_12px_36px_rgba(255,255,255,0.1)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <h2 className="text-white text-xl font-semibold mb-6">Account</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Email */}
              <button className="w-full flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
                <div className="flex-1 text-left">
                  <p className="text-[#6b7b94] text-sm mb-1">Email</p>
                  <p className="text-white text-base font-medium">email@example.com</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
              </button>

              {/* Change Password */}
              <button className="w-full flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
                <p className="text-white text-base font-medium">Change password</p>
                <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
              </button>
            </div>
          </div>

          {/* Export Section */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-emerald-400/40 hover:shadow-[0_12px_36px_rgba(52,211,153,0.15)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-left-4 duration-700 delay-500">
            <h2 className="text-white text-xl font-semibold mb-6">Export</h2>
            
            <button className="w-full flex items-center justify-between p-4 bg-[#0d1221]/30 backdrop-blur-xl rounded-xl border border-white/5 hover:border-emerald-400/30 hover:bg-[#0d1221]/50 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
              <p className="text-white text-base font-medium">Generate report</p>
              <ChevronRight className="w-5 h-5 text-[#6b7b94] group-hover/item:text-emerald-400 group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
            </button>
          </div>

          {/* Danger Zone Section */}
          <div className="group bg-gradient-to-br from-[#141b2e]/50 to-[#0d1221]/50 backdrop-blur-3xl rounded-2xl p-6 border border-red-500/20 shadow-[0_8px_32px_rgba(239,68,68,0.2)] hover:border-red-500/40 hover:shadow-[0_12px_36px_rgba(239,68,68,0.3)] transition-all duration-700 ease-out hover:scale-[1.01] animate-in fade-in slide-in-from-right-4 duration-700 delay-600">
            <h2 className="text-red-400 text-xl font-semibold mb-6">Danger Zone</h2>
            
            <button className="w-full flex items-center justify-between p-4 bg-red-500/10 backdrop-blur-xl rounded-xl border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20 transition-all duration-500 ease-out hover:scale-[1.02] group/item">
              <p className="text-red-400 text-base font-medium">Delete household</p>
              <ChevronRight className="w-5 h-5 text-red-400/60 group-hover/item:text-red-400 group-hover/item:translate-x-1 transition-all duration-500 ease-out" />
            </button>
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
