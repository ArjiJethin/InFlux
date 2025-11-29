'use client'

import { Home, TrendingUp, Sliders, Zap, FileText, Settings, Leaf, LogOut, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoBgless from '@/assets/Logo bgless.png'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export default function Sidebar({ collapsed, onToggle, mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    window.location.href = '/login'
  }
  
  const menuItems = [
    { icon: Home, label: 'Overview', href: '/' },
    { icon: TrendingUp, label: 'Forecast', href: '/forecast' },
    { icon: Sliders, label: 'Optimization', href: '/optimization' },
    { icon: Zap, label: 'Appliances', href: '/appliances' },
    { icon: FileText, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden transition-opacity duration-300"
          onClick={onMobileClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-[#0d1221]/95 backdrop-blur-2xl border-r border-emerald-500/8 z-50 
        ${collapsed ? 'w-20' : 'w-64'} 
        sm:block
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
        transition-transform duration-300 ease-out
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Close Button */}
          <button
            onClick={onMobileClose}
            className="absolute top-4 right-4 sm:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Logo with InFlux Title */}
          <div className="px-9 lg:px-5 py-6 lg:py-8 flex items-center justify-start border-b border-[#1a2332]">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <Image 
                src={LogoBgless} 
                alt="InFlux" 
                width={60} 
                height={60}
                className="object-contain lg:w-[70px] lg:h-[70px]"
                priority
              />
              <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#34d399] via-[#5eead4] to-[#3b82f6] bg-clip-text text-transparent">
                InFlux
              </span>
            </div>
          ) : (
            <Image 
              src={LogoBgless} 
              alt="InFlux" 
              width={40} 
              height={40}
              className="object-contain lg:w-[50px] lg:h-[50px]"
              priority
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`w-full flex items-center gap-4 px-6 py-3.5 text-left transition-all duration-200 relative ${
                  isActive
                    ? 'text-[#34d399]'
                    : 'text-[#6b7b94] hover:text-white hover:bg-[#141b2e]/50'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#34d399] rounded-r-full"></div>
                )}
                <div className={`flex items-center justify-center w-6 ${isActive ? 'text-[#34d399]' : ''}`}>
                  <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                {!collapsed && (
                  <span className={`text-sm font-medium ${isActive ? 'text-[#34d399]' : ''}`}>
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Today's Tip */}
        {!collapsed && (
          <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-[#141b2e]/70 to-[#0d1221]/70 backdrop-blur-xl rounded-2xl border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400/20 hover:shadow-lg">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#34d399]/10 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-4 h-4 text-[#34d399]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">Today&apos;s Tip</h3>
                <p className="text-[#6b7b94] text-xs leading-relaxed">
                  Unplug devices when not un use to save energy
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="mx-4 mb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-[#6b7b94] hover:text-red-400 hover:bg-red-500/10 rounded-xl border border-white/5 hover:border-red-500/30 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
    </>
  )
}
