-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS user_stats CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS workout_history CASCADE;
DROP TABLE IF EXISTS workout_exercises CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Remove any existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Exercises are viewable by all authenticated users" ON exercises;
DROP POLICY IF EXISTS "Users can create exercises" ON exercises;
DROP POLICY IF EXISTS "Users can update their own exercises" ON exercises;
DROP POLICY IF EXISTS "Users can view their own workouts" ON workouts;
DROP POLICY IF EXISTS "Users can create their own workouts" ON workouts;
DROP POLICY IF EXISTS "Users can update their own workouts" ON workouts;
DROP POLICY IF EXISTS "Users can view their own workout exercises" ON workout_exercises;
DROP POLICY IF EXISTS "Users can create their own workout exercises" ON workout_exercises;
DROP POLICY IF EXISTS "Users can view their own workout history" ON workout_history;
DROP POLICY IF EXISTS "Users can create their own workout history" ON workout_history;
DROP POLICY IF EXISTS "Achievements are viewable by all authenticated users" ON achievements;
DROP POLICY IF EXISTS "Users can view their own achievements" ON user_achievements;
DROP POLICY IF EXISTS "Users can view their own stats" ON user_stats;
DROP POLICY IF EXISTS "Users can update their own stats" ON user_stats;

-- Remove indexes
DROP INDEX IF EXISTS idx_workouts_user_id;
DROP INDEX IF EXISTS idx_workout_history_user_id;
DROP INDEX IF EXISTS idx_user_achievements_user_id;
DROP INDEX IF EXISTS idx_workout_exercises_workout_id;
