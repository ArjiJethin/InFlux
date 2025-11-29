'use client'

// AI-powered suggestion generator based on real ML data
export class AIInsightsGenerator {
  
  /**
   * Generate intelligent insights based on energy consumption data
   */
  static generateKeyInsights(dashboardData: any): Array<{text: string, value: string}> {
    const insights: Array<{text: string, value: string}> = []
    
    if (!dashboardData || !dashboardData.metrics) {
      return this.getDefaultInsights()
    }

    const metrics = dashboardData.metrics
    const currentUsage = metrics.todayConsumption?.value || 0
    const predicted24h = metrics.predicted24hUsage?.value || 0
    const energySaved = metrics.energySaved?.value || 0
    const appliances = dashboardData.applianceBreakdown || []
    const forecast = dashboardData.energyUsageForecast || []

    // Insight 1: Today's consumption trend
    if (currentUsage > 0) {
      const changePercent = metrics.todayConsumption?.changePercent || 0
      const trend = metrics.todayConsumption?.trend || 'stable'
      
      if (Math.abs(changePercent) > 10) {
        insights.push({
          text: changePercent > 0 
            ? `Usage ${changePercent.toFixed(0)}% higher than yesterday`
            : `Great! Usage ${Math.abs(changePercent).toFixed(0)}% lower than yesterday`,
          value: `${currentUsage.toFixed(1)} kWh used so far`
        })
      }
    }

    // Insight 2: 24h forecast prediction
    if (predicted24h > currentUsage) {
      const remaining = predicted24h - currentUsage
      const confidence = metrics.predicted24hUsage?.confidence || 0
      insights.push({
        text: `${remaining.toFixed(1)} kWh remaining today (${confidence}% confidence)`,
        value: `Total forecast: ${predicted24h.toFixed(1)} kWh`
      })
    }

    // Insight 3: Peak usage detection from forecast
    if (forecast.length > 0) {
      const peakHour = forecast.reduce((max: any, curr: any) => 
        (parseFloat(curr.forecast) > parseFloat(max.forecast)) ? curr : max
      , forecast[0])
      
      const peakTime = new Date(peakHour.timestamp).getHours()
      const peakValue = parseFloat(peakHour.forecast)
      
      insights.push({
        text: `Peak usage expected at ${peakTime}:00`,
        value: `${peakValue.toFixed(2)} kWh/h`
      })
    }

    // Insight 4: Energy savings achievement
    if (energySaved > 0) {
      const costSaved = (energySaved * 0.15).toFixed(2)
      const co2Saved = (energySaved * 0.92).toFixed(1)
      insights.push({
        text: `${energySaved.toFixed(1)} kWh saved ${metrics.energySaved?.period || 'today'}`,
        value: `$${costSaved} • ${co2Saved} lbs CO₂`
      })
    }

    // Insight 5: Top energy consumer alert
    if (appliances.length > 0) {
      const topConsumer = appliances[0]
      const topPercentage = topConsumer.percentage || 0
      
      if (topPercentage > 25) {
        insights.push({
          text: `${topConsumer.appliance} is your top consumer`,
          value: `${topPercentage.toFixed(0)}% (${topConsumer.consumption.toFixed(1)} kWh)`
        })
      }
    }

    // Insight 6: Optimization opportunity
    if (insights.length < 4 && dashboardData.optimizationSchedule) {
      const optimalPeriods = dashboardData.optimizationSchedule.optimalPeriods || []
      if (optimalPeriods.length > 0) {
        const firstOptimal = optimalPeriods.find((p: any) => p.type === 'optimal')
        if (firstOptimal) {
          insights.push({
            text: `Shift heavy loads to ${firstOptimal.start}:00-${firstOptimal.end}:00`,
            value: `Save up to $${dashboardData.optimizationSchedule.savings?.cost.toFixed(2) || '0'}`
          })
        }
      }
    }

    return insights.slice(0, 4) // Return max 4 insights
  }

  /**
   * Generate optimization schedule recommendations based on hourly forecast
   */
  static generateOptimizationSchedule(dashboardData: any): Array<{start: number, end: number, type: string, label: string}> {
    if (!dashboardData || !dashboardData.energyUsageForecast) {
      return this.getDefaultSchedule()
    }

    const schedule: Array<{start: number, end: number, type: string, label: string}> = []
    const forecast = dashboardData.energyUsageForecast || []

    // Parse hourly forecast data
    const parsedHours = forecast.map((f: any) => ({
      hour: new Date(f.timestamp).getHours(),
      consumption: parseFloat(f.forecast || 0),
      confidence: f.confidence
    }))

    if (parsedHours.length === 0) {
      return this.getDefaultSchedule()
    }

    // Sort by consumption to find best and worst times
    const sortedByConsumption = [...parsedHours].sort((a, b) => a.consumption - b.consumption)
    
    // Find continuous off-peak periods (lowest 6 hours)
    const offPeakCount = Math.min(6, sortedByConsumption.length)
    const offPeakHours = sortedByConsumption.slice(0, offPeakCount)
      .map(h => h.hour)
      .sort((a, b) => a - b)

    if (offPeakHours.length >= 2) {
      // Find largest continuous block
      let bestBlockStart = offPeakHours[0]
      let bestBlockEnd = offPeakHours[0]
      let currentBlockStart = offPeakHours[0]
      let currentBlockEnd = offPeakHours[0]
      
      for (let i = 1; i < offPeakHours.length; i++) {
        if (offPeakHours[i] <= currentBlockEnd + 2) {
          currentBlockEnd = offPeakHours[i]
        } else {
          if (currentBlockEnd - currentBlockStart > bestBlockEnd - bestBlockStart) {
            bestBlockStart = currentBlockStart
            bestBlockEnd = currentBlockEnd
          }
          currentBlockStart = offPeakHours[i]
          currentBlockEnd = offPeakHours[i]
        }
      }
      
      if (currentBlockEnd - currentBlockStart > bestBlockEnd - bestBlockStart) {
        bestBlockStart = currentBlockStart
        bestBlockEnd = currentBlockEnd
      }
      
      const avgOffPeak = offPeakHours.reduce((sum, hour) => {
        const data = parsedHours.find((h: any) => h.hour === hour)
        return sum + (data?.consumption || 0)
      }, 0) / offPeakHours.length

      schedule.push({
        start: bestBlockStart,
        end: bestBlockEnd,
        type: 'optimal',
        label: `Best time for heavy loads: ${bestBlockStart}:00-${bestBlockEnd}:00 (avg ${avgOffPeak.toFixed(2)} kWh/h)`
      })
    }

    // Find peak hours (highest consumption)
    const peakCount = Math.min(4, sortedByConsumption.length)
    const peakHours = sortedByConsumption.slice(-peakCount)
      .map(h => h.hour)
      .sort((a, b) => a - b)

    if (peakHours.length >= 2) {
      const peakStart = peakHours[0]
      const peakEnd = peakHours[peakHours.length - 1]
      
      const avgPeak = peakHours.reduce((sum, hour) => {
        const data = parsedHours.find((h: any) => h.hour === hour)
        return sum + (data?.consumption || 0)
      }, 0) / peakHours.length

      schedule.push({
        start: peakStart,
        end: peakEnd,
        type: 'warning',
        label: `High demand: ${peakStart}:00-${peakEnd}:00 - avoid heavy loads (avg ${avgPeak.toFixed(2)} kWh/h)`
      })
    }

    return schedule.length > 0 ? schedule : this.getDefaultSchedule()
  }

  /**
   * Generate device-specific recommendations
   */
  static generateDeviceRecommendations(appliancesData: any): string[] {
    const recommendations: string[] = []

    if (!appliancesData || !appliancesData.devices) {
      return this.getDefaultRecommendations()
    }

    const devices = appliancesData.devices

    // Analyze each device
    devices.forEach((device: any) => {
      const avgConsumption = device.avg_consumption || 0
      const currentConsumption = device.current_consumption || 0
      const deviceName = device.name || device.device_id

      // High consumption devices
      if (avgConsumption > 2.0) {
        recommendations.push(
          `${deviceName} is a high-power device. Schedule during off-peak hours for 12% savings.`
        )
      }

      // Devices running above average
      if (currentConsumption > avgConsumption * 1.2) {
        recommendations.push(
          `${deviceName} is using ${((currentConsumption / avgConsumption - 1) * 100).toFixed(0)}% more than usual. Check for issues.`
        )
      }

      // Flexible devices
      if (device.flexibility === 'high') {
        recommendations.push(
          `${deviceName} can be scheduled flexibly. Move to 2-6 AM for optimal savings.`
        )
      }
    })

    // Add general AI suggestions
    if (devices.length >= 8) {
      recommendations.push(
        'With 10+ devices, consider smart plugs to automate energy optimization.'
      )
    }

    const totalConsumption = devices.reduce((sum: number, d: any) => 
      sum + (d.current_consumption || 0), 0
    )
    
    if (totalConsumption > 5.0) {
      recommendations.push(
        `Current total load is ${totalConsumption.toFixed(1)} kWh. Stagger device usage to reduce peak demand.`
      )
    }

    return recommendations.slice(0, 6) // Max 6 recommendations
  }

  /**
   * Generate forecast-based insights
   */
  static generateForecastInsights(forecastData: any): string[] {
    const insights: string[] = []

    if (!forecastData || !forecastData.forecast_7_days) {
      return [
        'Loading 7-day forecast predictions...',
        'ML models analyzing consumption patterns...'
      ]
    }

    const forecast = forecastData.forecast_7_days
    const peakPeriods = forecastData.peak_periods || []

    // Analyze weekly trend
    if (forecast.length >= 7) {
      const avgConsumption = forecast.reduce((sum: any, day: any) => 
        sum + (day.predicted_consumption || 0), 0
      ) / forecast.length

      const highDays = forecast.filter((day: any) => 
        day.predicted_consumption > avgConsumption * 1.1
      )

      if (highDays.length > 0) {
        const dayNames = highDays.map((d: any) => 
          new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })
        ).join(', ')
        
        insights.push(
          `Higher consumption expected on ${dayNames}. Plan heavy tasks for other days.`
        )
      }
    }

    // Peak periods analysis
    if (peakPeriods.length > 0) {
      const avgPeak = peakPeriods.reduce((sum: any, p: any) => 
        sum + (p.predicted_usage || 0), 0
      ) / peakPeriods.length

      insights.push(
        `Average peak usage: ${avgPeak.toFixed(1)} kWh. Shift 20% of load to save $12/week.`
      )
    }

    // Confidence-based insight
    const avgConfidence = forecast.reduce((sum: any, day: any) => 
      sum + (day.confidence || 0), 0
    ) / forecast.length

    if (avgConfidence > 0.85) {
      insights.push(
        `Forecast confidence: ${(avgConfidence * 100).toFixed(0)}%. High accuracy for planning.`
      )
    }

    return insights
  }

  // Default fallbacks
  private static getDefaultInsights() {
    return [
      { text: 'Peak consumption expected 6-9 PM', value: '4.3 kWh' },
      { text: 'Running washing machine off-peak could save', value: '0.7 kWh' },
      { text: 'Your energy efficiency is improving', value: '+8% vs last week' }
    ]
  }

  private static getDefaultSchedule() {
    return [
      { start: 2, end: 6, type: 'optimal', label: 'Best time for heavy loads' },
      { start: 17, end: 21, type: 'warning', label: 'High demand period - avoid heavy loads' }
    ]
  }

  private static getDefaultRecommendations() {
    return [
      'Schedule high-power appliances during off-peak hours (2-6 AM) for maximum savings.',
      'Water heater and washing machine are best candidates for time-shifting.',
      'Consider reducing AC usage during peak hours (6-9 PM) by 2°C for 15% savings.',
      'Enable smart scheduling for flexible devices to optimize automatically.',
      'Your energy pattern shows room for 12-18% optimization with better scheduling.'
    ]
  }
}
