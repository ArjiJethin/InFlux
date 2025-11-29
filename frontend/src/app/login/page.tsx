'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoBgless from '@/assets/Logo bgless.png'
import { Leaf, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSuccess(true)
    
    // Set auth in localStorage
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userEmail', email)
    
    // Redirect after success animation
    setTimeout(() => {
      window.location.href = '/'
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-teal-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-green-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse delay-500"></div>
      </div>

      {/* Animated SVG Energy Waves */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        <path
          className="animate-energyFlow"
          d="M0,150 Q400,50 800,150 T1600,150 T2400,150"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="animate-energyFlow delay-500"
          d="M0,250 Q400,350 800,250 T1600,250 T2400,250"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="animate-energyFlow delay-1000"
          d="M0,450 Q400,550 800,450 T1600,450 T2400,450"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Hidden on mobile, 65% on desktop */}
        <div className="hidden lg:flex lg:w-[65%] flex-col justify-center px-8 xl:px-16 py-12">
          {/* Logo & Title */}
          <div className="mb-12 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src={LogoBgless} 
                alt="InFlux" 
                width={60} 
                height={60}
                className="object-contain"
                priority
              />
              <span className="text-3xl xl:text-4xl font-bold text-white">
                InFlux
              </span>
            </div>
            <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4 leading-tight">
              Forecast. Optimize. <span className="text-[#22c55e]">Save.</span>
            </h1>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-3 gap-4 xl:gap-6 mb-12">
            <div className="bg-[#0d1221]/50 backdrop-blur-xl rounded-2xl p-4 xl:p-6 border border-white/5 hover:border-[#22c55e]/30 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] animate-fadeSlideUp">
              <p className="text-[#6b7b94] text-xs xl:text-sm mb-2">Today&apos;s Forecast</p>
              <p className="text-white text-2xl xl:text-3xl font-bold">32,4 <span className="text-sm xl:text-lg font-normal">kWh</span></p>
            </div>
            <div className="bg-[#0d1221]/50 backdrop-blur-xl rounded-2xl p-4 xl:p-6 border border-white/5 hover:border-[#22c55e]/30 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] animate-fadeSlideUp delay-100">
              <p className="text-[#6b7b94] text-xs xl:text-sm mb-2">Cost Saved</p>
              <p className="text-[#22c55e] text-2xl xl:text-3xl font-bold">€18,20</p>
            </div>
            <div className="bg-[#0d1221]/50 backdrop-blur-xl rounded-2xl p-4 xl:p-6 border border-white/5 hover:border-[#22c55e]/30 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] animate-fadeSlideUp delay-200">
              <p className="text-[#6b7b94] text-xs xl:text-sm mb-2">CO₂ Reduced</p>
              <p className="text-white text-2xl xl:text-3xl font-bold">4,5 <span className="text-sm xl:text-lg font-normal">kg</span></p>
            </div>
          </div>

          {/* Tip Card */}
          <div className="bg-[#0d1221]/50 backdrop-blur-xl rounded-2xl p-6 border border-white/5 max-w-lg hover:border-[#22c55e]/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] animate-fadeSlideUp delay-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Tip:</h3>
                <p className="text-[#6b7b94] text-sm leading-relaxed">
                  Shift heavy loads to off-peak hours to save up to 18%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Full width on mobile, 35% on desktop */}
        <div className="w-full lg:w-[35%] flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12">
          {/* Mobile Logo & Title - Only visible on mobile */}
          <div className="lg:hidden absolute top-6 left-4 right-4">
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src={LogoBgless} 
                alt="InFlux" 
                width={40} 
                height={40}
                className="object-contain"
                priority
              />
              <span className="text-2xl font-bold text-white">
                InFlux
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Forecast. Optimize. <span className="text-[#22c55e]">Save.</span>
            </h1>
          </div>

          <div className="w-full max-w-md mt-32 lg:mt-0">

            {/* Auth Card */}
            <div
              className="w-full max-w-md bg-[#0d1221]/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_8px_64px_rgba(0,0,0,0.5)] lg:hover:shadow-[0_8px_64px_rgba(34,197,94,0.3)] transition-all duration-500 lg:hover:-translate-y-1 p-6 sm:p-8 animate-fadeIn"
            >
            {/* Tabs */}
            <div className="flex mb-6 sm:mb-8 bg-[#020617]/50 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'login'
                    ? 'bg-[#22c55e] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                    : 'text-[#6b7b94] hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'signup'
                    ? 'bg-[#22c55e] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                    : 'text-[#6b7b94] hover:text-white'
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email Input */}
              <div className="group">
                <label className="block text-[#6b7b94] text-xs sm:text-sm mb-2">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#6b7b94] group-focus-within:text-[#22c55e] transition-colors duration-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#020617]/50 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-white focus:outline-none focus:border-[#22c55e] focus:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 text-sm sm:text-base"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-[#6b7b94] text-xs sm:text-sm mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#6b7b94] group-focus-within:text-[#22c55e] transition-colors duration-300" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#020617]/50 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-white focus:outline-none focus:border-[#22c55e] focus:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 text-sm sm:text-base"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-300 transform active:scale-95 text-sm sm:text-base ${
                  isSuccess
                    ? 'bg-[#22c55e] shadow-[0_0_40px_rgba(34,197,94,0.6)] animate-successPulse'
                    : isLoading
                    ? 'bg-[#22c55e]/70 cursor-wait'
                    : 'bg-[#22c55e] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-[1.02]'
                }`}
              >
                {isSuccess ? '✓ Success!' : isLoading ? 'Loading...' : 'Log in'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5 sm:my-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-[#6b7b94] text-xs sm:text-sm">or</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Social Auth */}
            <div className="space-y-2.5 sm:space-y-3">
              <button className="w-full bg-[#020617]/50 border border-white/10 rounded-xl py-2.5 sm:py-3 text-white hover:border-[#22c55e]/50 hover:bg-[#020617]/70 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
              
              <button className="w-full bg-[#020617]/50 border border-white/10 rounded-xl py-2.5 sm:py-3 text-white hover:border-[#22c55e]/50 hover:bg-[#020617]/70 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Terms */}
            <p className="text-[#6b7b94] text-[10px] sm:text-xs text-center mt-5 sm:mt-6">
              By continuing you agree to the{' '}
              <Link href="#" className="text-[#22c55e] hover:underline">
                Terms
              </Link>
              {' & '}
              <Link href="#" className="text-[#22c55e] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes energyFlow {
          0%, 100% {
            transform: translateX(0) translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-100px) translateY(-20px);
            opacity: 0.6;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes successPulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.6);
          }
          50% {
            box-shadow: 0 0 60px rgba(34, 197, 94, 0.8);
          }
        }

        .animate-energyFlow {
          animation: energyFlow 8s ease-in-out infinite;
        }

        .animate-energyFlow.delay-500 {
          animation-delay: 0.5s;
        }

        .animate-energyFlow.delay-1000 {
          animation-delay: 1s;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.8s ease-out;
        }

        .animate-fadeSlideUp.delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-fadeSlideUp.delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-fadeSlideUp.delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-successPulse {
          animation: successPulse 1.5s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  )
}
