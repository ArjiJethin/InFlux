'use client'

import { Leaf } from 'lucide-react'

export default function OptimizationSchedule() {
  const schedule = [
    { start: 3, end: 11, type: 'optimal', label: 'Best time for heavy loads' },
    { start: 17, end: 20, type: 'warning', label: 'High carbon intensity window' },
  ]

  return (
    <div className="group bg-[#141b2e]/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/5 hover:border-emerald-400/40 hover:shadow-[0_8px_24px_rgba(52,211,153,0.15)] transition-all duration-500 hover:scale-[1.01]">
      <h3 className="text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 text-center">Optimization Schedule</h3>

      {/* Timeline */}
      <div className="mb-4 sm:mb-6">
        <div className="relative h-10 sm:h-12">
          {/* Hour markers */}
          <div className="flex justify-between text-[#6b7b94] text-[10px] sm:text-xs mb-2">
            {['0', '3', '6', '9', '12', '15', '18', '21', '24'].map((hour, index) => (
              <span key={index}>{hour}</span>
            ))}
          </div>

          {/* Timeline bar */}
          <div className="relative h-5 sm:h-6 bg-[#0d1221]/40 rounded-lg overflow-hidden">
            {schedule.map((slot, index) => (
              <div
                key={index}
                className={`absolute h-full ${
                  slot.type === 'optimal' 
                    ? 'bg-[#22c55e]' 
                    : 'bg-[#dc2626]/40'
                }`}
                style={{
                  left: `${(slot.start / 24) * 100}%`,
                  width: `${((slot.end - slot.start) / 24) * 100}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule items */}
      <div className="space-y-3">
        {schedule.map((slot, index) => (
          <div 
            key={index}
            className={`bg-[#0d1221]/40 flex items-center gap-3 p-2.5 sm:p-3 rounded-lg border hover:bg-[#0d1221]/60 transition-all duration-300 ${
              slot.type === 'optimal'
                ? 'border-[#22c55e]/20 hover:border-[#22c55e]/40'
                : 'border-[#dc2626]/20 hover:border-[#dc2626]/40'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              slot.type === 'optimal' ? 'bg-[#22c55e]' : 'bg-[#dc2626]'
            }`}></div>
            <span className="text-white text-xs sm:text-sm flex-1">
              {slot.label}
            </span>
          </div>
        ))}
      </div>

      {/* Apply Schedule Button */}
      <div className="mt-4 sm:mt-6 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 text-[#6b7b94]">
            <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs">€53 saved · 0.1 kg CO₂</span>
          </div>
        </div>
        
        <button className="w-full bg-[#22c55e] hover:bg-[#1ea84e] text-white font-medium py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_4px_16px_rgba(34,197,94,0.3)]">
          Apply Schedule
        </button>
      </div>
    </div>
  )
}
