import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, 
  BarChart, Bar, 
  XAxis, YAxis, 
  CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  Calendar,
  TrendingUp,
  Clock,
  Dumbbell,
  ChevronDown,
  Flame,
  Activity,
  ChevronRight,
  ArrowUpDown,
  Filter
} from 'lucide-react';

// Custom Tooltip for enhanced aesthetics
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
        <p className="font-bold text-gray-700 dark:text-gray-200 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {entry.name}: <span className="font-semibold text-gray-800 dark:text-gray-100">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function ProgressDashboard({ workouts }) {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedWorkoutType, setSelectedWorkoutType] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique workout types
  const workoutTypes = useMemo(() => {
    return [...new Set(workouts.map(w => w.name))];
  }, [workouts]);

  // Get exercises for selected workout type
  const exercises = useMemo(() => {
    if (!selectedWorkoutType) return [];
    return [...new Set(workouts
      .filter(w => w.name === selectedWorkoutType)
      .flatMap(w => w.exercises.map(e => e.name)))];
  }, [workouts, selectedWorkoutType]);

  // Process workout data based on filters
  const processedData = useMemo(() => {
    const now = new Date();
    const timeRanges = {
      week: 7,
      month: 30,
      year: 365,
      all: Infinity
    };
    
    const cutoffDate = new Date(now.getTime() - timeRanges[timeRange] * 24 * 60 * 60 * 1000);
    
    let filteredWorkouts = workouts.filter(workout => new Date(workout.date) >= cutoffDate);
    
    if (selectedWorkoutType) {
      filteredWorkouts = filteredWorkouts.filter(w => w.name === selectedWorkoutType);
    }

    return filteredWorkouts.map(workout => {
      const exerciseData = {};
      workout.exercises.forEach(exercise => {
        if (!exercise.sets || !Array.isArray(exercise.sets)) return;
        
        const totalVolume = exercise.sets.reduce((sum, set) => {
          return sum + (Number(set.weight) * Number(set.reps) || 0);
        }, 0);

        const maxWeight = Math.max(...exercise.sets.map(set => Number(set.weight) || 0));
        
        exerciseData[exercise.name] = {
          volume: totalVolume,
          maxWeight,
          sets: exercise.sets.length
        };
      });

      return {
        date: new Date(workout.date).toLocaleDateString(),
        type: workout.name,
        exercises: exerciseData,
        totalVolume: Object.values(exerciseData).reduce((sum, e) => sum + e.volume, 0),
        totalSets: Object.values(exerciseData).reduce((sum, e) => sum + e.sets, 0)
      };
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [workouts, timeRange, selectedWorkoutType]);

  // Get exercise progress data
  const exerciseProgress = useMemo(() => {
    if (!selectedExercise) return [];
    
    return processedData
      .filter(workout => workout.exercises[selectedExercise])
      .map(workout => ({
        date: workout.date,
        volume: workout.exercises[selectedExercise].volume,
        maxWeight: workout.exercises[selectedExercise].maxWeight,
        sets: workout.exercises[selectedExercise].sets || []
      }));
  }, [processedData, selectedExercise]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    if (!processedData.length) return null;

    const totalVolume = processedData.reduce((sum, day) => sum + day.totalVolume, 0);
    const totalSets = processedData.reduce((sum, day) => sum + day.totalSets, 0);
    
    return {
      totalWorkouts: processedData.length,
      totalVolume: Math.round(totalVolume),
      totalSets,
      avgVolumePerWorkout: Math.round(totalVolume / processedData.length),
      avgSetsPerWorkout: Math.round(totalSets / processedData.length),
      workoutsPerWeek: Math.round((processedData.length / (timeRange === 'week' ? 1 : timeRange === 'month' ? 4 : 52)) * 10) / 10
    };
  }, [processedData, timeRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Progress Dashboard
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your fitness journey and exercise progress
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showDatePicker && (
              <div className="absolute top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                {['week', 'month', 'year', 'all'].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setTimeRange(range);
                      setShowDatePicker(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Workout Type
              </label>
              <div className="flex flex-wrap gap-2">
                {workoutTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedWorkoutType(selectedWorkoutType === type ? null : type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedWorkoutType === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {selectedWorkoutType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Exercise
                </label>
                <div className="flex flex-wrap gap-2">
                  {exercises.map((exercise) => (
                    <button
                      key={exercise}
                      onClick={() => setSelectedExercise(selectedExercise === exercise ? null : exercise)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedExercise === exercise
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {exercise}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-100">Workouts</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalWorkouts}
                </p>
                <p className="text-sm text-blue-100">
                  {stats.workoutsPerWeek}/week
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-emerald-100">Total Volume</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalVolume.toLocaleString()} lbs
                </p>
                <p className="text-sm text-emerald-100">
                  {stats.avgVolumePerWorkout.toLocaleString()}/workout
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-100">Progress Rate</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round((stats.totalVolume / stats.totalWorkouts) / 100) * 100}
                </p>
                <p className="text-sm text-purple-100">
                  lbs/workout
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-rose-100">Total Sets</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalSets}
                </p>
                <p className="text-sm text-rose-100">
                  {stats.avgSetsPerWorkout} sets/workout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      {selectedExercise ? (
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-6">
              Progress for {selectedExercise}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={exerciseProgress}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#e5e7eb" 
                    strokeOpacity={0.5} 
                  />
                  <XAxis 
                    dataKey="date" 
                    axisLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                    tickLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                  />
                  <YAxis 
                    yAxisId="left" 
                    axisLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                    tickLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    axisLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                    tickLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#3b82f6" 
                    strokeWidth={2.5}
                    name="Volume (lbs)"
                    dot={{ strokeWidth: 2, r: 5 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="maxWeight" 
                    stroke="#ef4444" 
                    strokeWidth={2.5}
                    name="Max Weight (lbs)"
                    dot={{ strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-6">
              Sets per Workout
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={exerciseProgress}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#e5e7eb" 
                    strokeOpacity={0.5} 
                  />
                  <XAxis 
                    dataKey="date" 
                    axisLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                    tickLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                  />
                  <YAxis 
                    axisLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                    tickLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="sets" 
                    fill="#8b5cf6" 
                    name="Number of Sets"
                    barSize={30}
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-6">
            Overall Volume Progress
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processedData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb" 
                  strokeOpacity={0.5} 
                />
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                  tickLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                />
                <YAxis 
                  axisLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                  tickLine={{ stroke: '#9ca3af', strokeOpacity: 0.7 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="totalVolume" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2}
                  name="Total Volume (lbs)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressDashboard;
