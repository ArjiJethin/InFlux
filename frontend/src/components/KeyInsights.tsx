'use client'

export default function KeyInsights() {
  const insights = [
    {
      text: 'Peak expected at 8-10 PM',
      value: '4.3 kWh',
    },
    {
      text: 'Running washing machine at 2.4 PM could save',
      value: '0.7 kWh',
    }
  ]

  return (
    <div className="group bg-[#141b2e]/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/5 hover:border-emerald-400/40 hover:shadow-[0_8px_24px_rgba(52,211,153,0.15)] transition-all duration-500 hover:scale-[1.01]">
      <h3 className="text-white text-sm sm:text-base font-semibold mb-4 sm:mb-5 text-center">Key Insights</h3>
      
      <div className="space-y-3 sm:space-y-4">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className="bg-[#0d1221]/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/5 hover:border-emerald-400/20 hover:bg-[#0d1221]/60 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-[#22c55e] flex-shrink-0 mt-2"></div>
              <div className="flex-1">
                <p className="text-white text-xs sm:text-sm leading-relaxed mb-1">
                  {insight.text}
                </p>
                <p className="text-white font-medium text-xs sm:text-sm">
                  {insight.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
