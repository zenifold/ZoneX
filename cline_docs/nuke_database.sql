-- Disable row level security temporarily to allow cleanup
ALTER TABLE IF EXISTS user_stats DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS workout_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS workout_exercises DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS workouts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS exercises DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;

-- Drop all tables with CASCADE to force removal of dependencies
DROP TABLE IF EXISTS user_stats CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS workout_history CASCADE;
DROP TABLE IF EXISTS workout_exercises CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop any custom types that might exist
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS exercise_category CASCADE;
DROP TYPE IF EXISTS difficulty_level CASCADE;

-- Drop any existing functions
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop any existing triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS set_updated_at ON user_stats;

-- Clean up any remaining policies
DO $$ 
DECLARE 
    _tbl text;
    _pol text;
BEGIN 
    FOR _tbl IN 
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        FOR _pol IN 
            SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = _tbl
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I', _pol, _tbl);
        END LOOP;
    END LOOP;
END $$;

-- Remove all indexes
DO $$ 
DECLARE 
    _idx text;
BEGIN 
    FOR _idx IN 
        SELECT indexname FROM pg_indexes WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP INDEX IF EXISTS %I CASCADE', _idx);
    END LOOP;
END $$;

-- Vacuum the database to clean up any remaining debris
VACUUM FULL;
