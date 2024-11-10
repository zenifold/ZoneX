import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async ({ email, password }) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })
  if (authError) throw authError

  // Create initial profile and stats for the user
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        created_at: new Date().toISOString(),
      })
    if (profileError) throw profileError

    const { error: statsError } = await supabase
      .from('user_stats')
      .insert({
        user_id: authData.user.id,
        total_workouts: 0,
        total_exercise_time: 0,
        streak_current: 0,
        streak_longest: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    if (statsError) throw statsError
  }

  return authData
}

export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error

  // Update last_login in profile
  if (data.user) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id)
    if (updateError) throw updateError
  }

  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const resetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

// User session helper
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Profile helpers
export const upsertProfile = async (profile) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

// Exercise helpers
export const createExercise = async (exercise) => {
  const { data, error } = await supabase
    .from('exercises')
    .insert(exercise)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getExercises = async () => {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

// Workout helpers
export const createWorkout = async (workout) => {
  const { data, error } = await supabase
    .from('workouts')
    .insert(workout)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getWorkouts = async (userId) => {
  const { data, error } = await supabase
    .from('workouts')
    .select(`
      *,
      workout_exercises (
        *,
        exercise:exercises (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const completeWorkout = async (workoutId, userId, duration, notes = '') => {
  const { data, error } = await supabase
    .from('workout_history')
    .insert({
      workout_id: workoutId,
      user_id: userId,
      completed_at: new Date().toISOString(),
      duration,
      notes
    })
    .select()
    .single()
  
  if (error) throw error

  // Update user stats
  const { data: stats, error: statsError } = await supabase
    .from('user_stats')
    .select()
    .eq('user_id', userId)
    .single()
  
  if (statsError) throw statsError

  const { error: updateError } = await supabase
    .from('user_stats')
    .update({
      total_workouts: stats.total_workouts + 1,
      total_exercise_time: stats.total_exercise_time + duration,
      last_workout_date: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
  
  if (updateError) throw updateError

  return data
}

// Achievement helpers
export const getAchievements = async () => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
  
  if (error) throw error
  return data
}

export const getUserAchievements = async (userId) => {
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievement:achievements (*)
    `)
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

// Stats helpers
export const getUserStats = async (userId) => {
  const { data, error } = await supabase
    .from('user_stats')
    .select()
    .eq('user_id', userId)
    .single()
  
  if (error) throw error
  return data
}
