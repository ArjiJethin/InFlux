'use client'

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'AC', value: 40, color: '#22c55e' },
  { name: 'Fridge', value: 20, color: '#34d399' },
  { name: 'Lights', value: 16, color: '#a78bfa' },
  { name: 'Other', value: 24, color: '#1e2837' },
]

export default function ApplianceBreakdown() {
  return (
    <div className="group bg-[#141b2e]/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/5 hover:border-purple-400/40 hover:shadow-[0_8px_24px_rgba(167,139,250,0.15)] transition-all duration-500 hover:scale-[1.01]">
      <h3 className="text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 text-center">Appliance Breakdown</h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Pie Chart */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">%</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full sm:w-auto sm:pl-8 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-white text-xs sm:text-sm">{item.name}</span>
              </div>
              <span className="text-white font-medium text-xs sm:text-sm">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 pt-4 border-t border-white/5">
        <p className="text-[#6b7b94] text-xs">Based on last 24 hours</p>
      </div>
    </div>
  )
}
