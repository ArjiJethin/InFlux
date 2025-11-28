'use client'

import { TrendingUp } from 'lucide-react'

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {/* Today's Consumption */}
      <div className="group bg-[#141b2e]/50 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-white/5 hover:border-emerald-400/40 hover:shadow-[0_8px_24px_rgba(52,211,153,0.15)] transition-all duration-500 hover:scale-[1.01]">
        <h3 className="text-[#6b7b94] text-xs sm:text-sm mb-3">Today's Consumption</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-white">12.4</span>
          <span className="text-xs sm:text-sm text-[#6b7b94]">kWh</span>
        </div>
        <div className="text-[#22c55e] text-xs sm:text-sm font-medium">
          + 4.3% vs yesterday
        </div>
        <div className="mt-3 h-8 sm:h-10">
          <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path
              d="M 0,25 Q 25,20 50,22 T 100,24 T 150,18 T 200,22"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Predicted 24h Usage */}
      <div className="group bg-[#141b2e]/50 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-white/5 hover:border-purple-400/40 hover:shadow-[0_8px_24px_rgba(167,139,250,0.15)] transition-all duration-500 hover:scale-[1.01]">
        <h3 className="text-[#6b7b94] text-xs sm:text-sm mb-3">Predicted 24h Usage</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-xs sm:text-sm text-[#6b7b94]">~</span>
          <span className="text-2xl sm:text-3xl font-bold text-[#a78bfa]">28.7</span>
          <span className="text-xs sm:text-sm text-[#6b7b94]">kWh</span>
        </div>
        <div className="text-[#6b7b94] text-xs sm:text-sm">Model: LSTM</div>
      </div>

      {/* Energy Saved This Week */}
      <div className="group bg-[#141b2e]/50 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-white/5 hover:border-emerald-400/40 hover:shadow-[0_8px_24px_rgba(52,211,153,0.15)] transition-all duration-500 hover:scale-[1.01]">
        <h3 className="text-[#6b7b94] text-xs sm:text-sm mb-3">Energy Saved This Week</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-[#22c55e]">3.4</span>
          <span className="text-xs sm:text-sm text-[#6b7b94]">kWh</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Key Insights Quick */}
      <div className="group bg-[#141b2e]/50 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-white/5 hover:border-white/20 hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)] transition-all duration-500 hover:scale-[1.01]">
        <h3 className="text-[#6b7b94] text-xs sm:text-sm mb-3">Key Insights</h3>
        <div className="space-y-2.5">
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-[#22c55e] mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-white leading-relaxed">
              Peak expected at 8-10 PM • 4.3 kWh
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-[#22c55e] mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-white leading-relaxed">
              Running washing machine at 2.4 PM could save 0.7 kWh
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
