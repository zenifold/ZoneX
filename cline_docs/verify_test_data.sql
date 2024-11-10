-- Check user profile and stats
SELECT 
    p.email,
    p.created_at,
    us.total_workouts,
    us.total_exercise_time,
    us.streak_current
FROM profiles p
JOIN user_stats us ON p.id = us.user_id;

-- Check exercises
SELECT 
    name,
    category,
    difficulty_level,
    target_muscles,
    equipment_needed
FROM exercises;

-- Check workouts with their exercises
SELECT 
    w.name as workout_name,
    w.duration,
    w.location,
    e.name as exercise_name,
    we.sets,
    we.reps,
    we.order_index
FROM workouts w
JOIN workout_exercises we ON w.id = we.workout_id
JOIN exercises e ON we.exercise_id = e.id
ORDER BY we.order_index;

-- Check workout history
SELECT 
    wh.completed_at,
    wh.duration,
    wh.notes,
    w.name as workout_name
FROM workout_history wh
JOIN workouts w ON wh.workout_id = w.id;

-- Check achievements
SELECT 
    a.name as achievement_name,
    a.description,
    ua.earned_at
FROM achievements a
LEFT JOIN user_achievements ua ON a.id = ua.achievement_id
ORDER BY ua.earned_at;
