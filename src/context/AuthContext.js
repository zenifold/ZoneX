import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, getCurrentUser, getProfile, getUserStats } from '../utils/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check for initial session
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user)
        console.log('User logged in:', session.user); // Log user info
        // Fetch profile and stats when user is authenticated
        try {
          const [userProfile, stats] = await Promise.all([
            getProfile(session.user.id),
            getUserStats(session.user.id)
          ])
          setProfile(userProfile)
          setUserStats(stats)
        } catch (error) {
          console.error('Error fetching user data:', error.message)
          setError(error.message)
        }
      } else {
        setUser(null)
        setProfile(null)
        setUserStats(null)
        console.log('User logged out'); // Log user logout
      }
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      const user = await getCurrentUser()
      setUser(user)
      console.log('Current user:', user); // Log current user info
      if (user) {
        // Fetch profile and stats when checking initial user
        const [userProfile, stats] = await Promise.all([
          getProfile(user.id),
          getUserStats(user.id)
        ])
        setProfile(userProfile)
        setUserStats(stats)
      }
    } catch (error) {
      console.error('Error checking user:', error.message)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Function to refresh user stats
  const refreshUserStats = async () => {
    if (user) {
      try {
        const stats = await getUserStats(user.id)
        setUserStats(stats)
      } catch (error) {
        console.error('Error refreshing user stats:', error.message)
      }
    }
  }

  const value = {
    user,
    profile,
    userStats,
    loading,
    error,
    isAuthenticated: !!user,
    refreshUserStats
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
