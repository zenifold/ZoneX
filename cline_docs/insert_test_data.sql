-- First, let's get the user's ID from the profiles table
WITH user_profile AS (
    SELECT id FROM profiles LIMIT 1
)

-- Insert some sample exercises
INSERT INTO exercises (name, description, category, difficulty_level, target_muscles, equipment_needed, instructions, created_by)
SELECT
    'Push-ups',
    'A classic bodyweight exercise that targets multiple muscle groups',
    'Bodyweight',
    'Beginner',
    ARRAY['Chest', 'Shoulders', 'Triceps'],
    ARRAY['None'],
    ARRAY['Start in a plank position', 'Lower your body until your chest nearly touches the ground', 'Push back up to the starting position'],
    id
FROM user_profile
UNION ALL
SELECT
    'Squats',
    'Fundamental lower body exercise',
    'Bodyweight',
    'Beginner',
    ARRAY['Quadriceps', 'Hamstrings', 'Glutes'],
    ARRAY['None'],
    ARRAY['Stand with feet shoulder-width apart', 'Lower your body as if sitting back into a chair', 'Return to standing position'],
    id
FROM user_profile
UNION ALL
SELECT
    'Dumbbell Rows',
    'Upper body pulling exercise',
    'Strength',
    'Intermediate',
    ARRAY['Back', 'Biceps'],
    ARRAY['Dumbbells', 'Bench'],
    ARRAY['Place one knee and hand on bench', 'Pull dumbbell to hip level', 'Lower with control'],
    id
FROM user_profile;

-- Create a sample workout
WITH user_profile AS (
    SELECT id FROM profiles LIMIT 1
),
new_workout AS (
    INSERT INTO workouts (user_id, name, description, location, duration, date_scheduled)
    SELECT 
        id,
        'Full Body Workout',
        'Complete beginner-friendly full body workout',
        'Home',
        45,
        NOW()
    FROM user_profile
    RETURNING id
),
exercise_ids AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY name) as row_num
    FROM exercises
)

-- Add exercises to the workout
INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, order_index)
SELECT 
    (SELECT id FROM new_workout),
    exercise_ids.id,
    3,  -- sets
    CASE 
        WHEN exercise_ids.row_num = 1 THEN 10  -- push-ups
        WHEN exercise_ids.row_num = 2 THEN 12  -- squats
        ELSE 8                                 -- rows
    END,
    exercise_ids.row_num
FROM exercise_ids;

-- Add a completed workout to workout_history
WITH user_profile AS (
    SELECT id FROM profiles LIMIT 1
),
latest_workout AS (
    SELECT id FROM workouts ORDER BY created_at DESC LIMIT 1
)
INSERT INTO workout_history (user_id, workout_id, completed_at, duration, notes)
SELECT 
    user_profile.id,
    latest_workout.id,
    NOW(),
    40,
    'Completed full workout, feeling great!'
FROM user_profile, latest_workout;

-- Update user stats
WITH user_profile AS (
    SELECT id FROM profiles LIMIT 1
)
UPDATE user_stats
SET 
    total_workouts = 1,
    total_exercise_time = 40,
    streak_current = 1,
    streak_longest = 1,
    last_workout_date = NOW(),
    updated_at = NOW()
WHERE user_id = (SELECT id FROM user_profile);

-- Create some achievements
INSERT INTO achievements (name, description, criteria, icon_url)
VALUES
    ('First Workout', 'Complete your first workout', '{"type": "workout_count", "count": 1}', NULL),
    ('Workout Warrior', 'Complete 10 workouts', '{"type": "workout_count", "count": 10}', NULL),
    ('Consistency King', 'Maintain a 7-day streak', '{"type": "streak_days", "count": 7}', NULL);

-- Award the "First Workout" achievement
WITH user_profile AS (
    SELECT id FROM profiles LIMIT 1
),
first_achievement AS (
    SELECT id FROM achievements WHERE name = 'First Workout'
)
INSERT INTO user_achievements (user_id, achievement_id)
SELECT 
    user_profile.id,
    first_achievement.id
FROM user_profile, first_achievement;
