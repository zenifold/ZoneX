-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    email TEXT NOT NULL,
    username TEXT,
    avatar_url TEXT,
    last_login TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles security policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Exercises table
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    difficulty_level TEXT NOT NULL,
    target_muscles TEXT[] NOT NULL,
    equipment_needed TEXT[],
    instructions TEXT[],
    created_by UUID REFERENCES profiles(id)
);

-- Enable RLS
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Exercises security policies
CREATE POLICY "Exercises are viewable by all authenticated users"
    ON exercises FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Users can create exercises"
    ON exercises FOR INSERT
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own exercises"
    ON exercises FOR UPDATE
    USING (auth.uid() = created_by);

-- Workouts table
CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES profiles(id) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    duration INTEGER, -- in minutes
    completed BOOLEAN DEFAULT false,
    date_scheduled TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Workouts security policies
CREATE POLICY "Users can view their own workouts"
    ON workouts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workouts"
    ON workouts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workouts"
    ON workouts FOR UPDATE
    USING (auth.uid() = user_id);

-- Workout exercises junction table
CREATE TABLE workout_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises(id),
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight NUMERIC,
    order_index INTEGER NOT NULL,
    notes TEXT
);

-- Enable RLS
ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;

-- Workout exercises security policies
CREATE POLICY "Users can view their own workout exercises"
    ON workout_exercises FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM workouts
            WHERE workouts.id = workout_exercises.workout_id
            AND workouts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create their own workout exercises"
    ON workout_exercises FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM workouts
            WHERE workouts.id = workout_exercises.workout_id
            AND workouts.user_id = auth.uid()
        )
    );

-- Workout history table
CREATE TABLE workout_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES profiles(id) NOT NULL,
    workout_id UUID REFERENCES workouts(id),
    completed_at TIMESTAMPTZ NOT NULL,
    duration INTEGER, -- in minutes
    notes TEXT
);

-- Enable RLS
ALTER TABLE workout_history ENABLE ROW LEVEL SECURITY;

-- Workout history security policies
CREATE POLICY "Users can view their own workout history"
    ON workout_history FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workout history"
    ON workout_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Achievements table
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    criteria JSONB NOT NULL,
    icon_url TEXT
);

-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Achievements security policies
CREATE POLICY "Achievements are viewable by all authenticated users"
    ON achievements FOR SELECT
    USING (auth.role() = 'authenticated');

-- User achievements junction table
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) NOT NULL,
    achievement_id UUID REFERENCES achievements(id) NOT NULL,
    earned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- User achievements security policies
CREATE POLICY "Users can view their own achievements"
    ON user_achievements FOR SELECT
    USING (auth.uid() = user_id);

-- User stats table
CREATE TABLE user_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) UNIQUE NOT NULL,
    total_workouts INTEGER DEFAULT 0,
    total_exercise_time INTEGER DEFAULT 0, -- in minutes
    streak_current INTEGER DEFAULT 0,
    streak_longest INTEGER DEFAULT 0,
    last_workout_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- User stats security policies
CREATE POLICY "Users can view their own stats"
    ON user_stats FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
    ON user_stats FOR UPDATE
    USING (auth.uid() = user_id);

-- Indexes for better query performance
CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_workout_history_user_id ON workout_history(user_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_workout_exercises_workout_id ON workout_exercises(workout_id);
