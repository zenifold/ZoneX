# Database Schema

## Tables

### profiles
- id (uuid, references auth.users.id)
- created_at (timestamp with time zone)
- email (text)
- username (text)
- avatar_url (text, nullable)
- last_login (timestamp with time zone)

### exercises
- id (uuid, primary key)
- created_at (timestamp with time zone)
- name (text)
- description (text)
- category (text)
- difficulty_level (text)
- target_muscles (text[])
- equipment_needed (text[])
- instructions (text[])
- created_by (uuid, references profiles.id)

### workouts
- id (uuid, primary key)
- created_at (timestamp with time zone)
- user_id (uuid, references profiles.id)
- name (text)
- description (text)
- location (text)
- duration (integer) // in minutes
- completed (boolean)
- date_scheduled (timestamp with time zone)

### workout_exercises
- id (uuid, primary key)
- workout_id (uuid, references workouts.id)
- exercise_id (uuid, references exercises.id)
- sets (integer)
- reps (integer)
- weight (numeric, nullable)
- order (integer)
- notes (text, nullable)

### workout_history
- id (uuid, primary key)
- created_at (timestamp with time zone)
- user_id (uuid, references profiles.id)
- workout_id (uuid, references workouts.id)
- completed_at (timestamp with time zone)
- duration (integer)
- notes (text, nullable)

### achievements
- id (uuid, primary key)
- created_at (timestamp with time zone)
- name (text)
- description (text)
- criteria (jsonb)
- icon_url (text)

### user_achievements
- id (uuid, primary key)
- user_id (uuid, references profiles.id)
- achievement_id (uuid, references achievements.id)
- earned_at (timestamp with time zone)

### user_stats
- id (uuid, primary key)
- user_id (uuid, references profiles.id)
- total_workouts (integer)
- total_exercise_time (integer) // in minutes
- streak_current (integer)
- streak_longest (integer)
- last_workout_date (timestamp with time zone)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

## Row Level Security (RLS) Policies

Each table will have RLS policies to ensure users can only:
1. Read their own data
2. Create data for themselves
3. Update their own data
4. Delete their own data

Exceptions:
- Exercises table will allow read access to all authenticated users
- Achievements table will allow read access to all authenticated users
