import { useState, useEffect } from 'react'
import { supabase, getCurrentUser } from '../lib/supabase'
import type { User } from '../types'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    getCurrentUser().then((user) => {
      if (user) {
        setUser({
          id: user.id,
          email: user.email || '',
          role: user.user_metadata?.role || 'guest',
          metadata: user.user_metadata,
        })
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: session.user.user_metadata?.role || 'guest',
            metadata: session.user.user_metadata,
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
