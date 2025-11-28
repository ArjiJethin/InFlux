'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Forecast from '@/components/Forecast'
import AuthGuard from '@/components/AuthGuard'

export default function ForecastPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <AuthGuard>
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
            <Forecast />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
