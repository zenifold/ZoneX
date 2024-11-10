-- Check profiles table
SELECT * FROM profiles;

-- Check user_stats table
SELECT * FROM user_stats;

-- Check if both tables are properly linked
SELECT 
    p.id,
    p.email,
    p.created_at as profile_created,
    us.total_workouts,
    us.total_exercise_time,
    us.streak_current,
    us.streak_longest
FROM profiles p
LEFT JOIN user_stats us ON p.id = us.user_id;
