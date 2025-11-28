'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('isAuthenticated')
    
    if (auth === 'true') {
      setIsAuthenticated(true)
      setIsLoading(false)
    } else {
      // Redirect to login
      router.push('/login')
    }
  }, [router])

  // Show loading or nothing while checking auth
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050911] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#22c55e] border-t-transparent"></div>
      </div>
    )
  }

  return <>{children}</>
}
