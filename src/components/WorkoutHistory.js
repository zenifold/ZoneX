import React, { useState } from 'react';
import { 
  Calendar,
  Clock,
  Dumbbell,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Flame
} from 'lucide-react';

function WorkoutHistory({ workouts }) {
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Calculate total workout stats with safety checks
  const stats = workouts.reduce((acc, workout) => {
    // Total workouts
    acc.totalWorkouts += 1;

    // Total weight lifted
    const workoutWeight = workout.exercises.reduce((sum, exercise) => {
      if (exercise.sets && Array.isArray(exercise.sets)) {
        return sum + exercise.sets.reduce((setSum, set) => {
          return setSum + (Number(set.weight) * Number(set.reps) || 0);
        }, 0);
      }
      return sum;
    }, 0);
    acc.totalWeight += workoutWeight;

    // Total duration (assuming we have duration data)
    const workoutDuration = workout.exercises.reduce((sum, exercise) => {
      if (exercise.sets && Array.isArray(exercise.sets)) {
        return sum + (exercise.sets.length * (Number(exercise.sets[0]?.rest) || 60));
      }
      return sum + 60; // default to 60 seconds if no data
    }, 0);
    acc.totalDuration += workoutDuration;

    return acc;
  }, { totalWorkouts: 0, totalWeight: 0, totalDuration: 0 });

  // Sort workouts
  const sortedWorkouts = [...workouts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Filter workouts
  const filteredWorkouts = sortedWorkouts.filter(workout => {
    if (filterType === 'all') return true;
    return workout.name.toLowerCase().includes(filterType.toLowerCase());
  });

  // Get unique workout types for filter
  const workoutTypes = ['all', ...new Set(workouts.map(w => w.name))];

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const calculateTotalVolume = (exercises) => {
    return exercises.reduce((sum, exercise) => {
      if (exercise.sets && Array.isArray(exercise.sets)) {
        return sum + exercise.sets.reduce((setSum, set) => {
          return setSum + (Number(set.weight) * Number(set.reps) || 0);
        }, 0);
      }
      return sum;
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Workouts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalWorkouts}</p>
            </div>
            <Dumbbell className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Weight Lifted</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(stats.totalWeight).toLocaleString()} lbs
              </p>
            </div>
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Duration</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatDuration(stats.totalDuration)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
            </button>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredWorkouts.length} of {workouts.length} workouts
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {workoutTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Workout List */}
      {filteredWorkouts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No workouts found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWorkouts.map((workout, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {workout.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(workout.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Dumbbell className="w-4 h-4" />
                      {Math.round(calculateTotalVolume(workout.exercises)).toLocaleString()} lbs
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Exercises
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workout.exercises.map((exercise, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="font-medium text-gray-900 dark:text-white mb-1">
                        {exercise.name}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {exercise.sets && Array.isArray(exercise.sets) && exercise.sets.map((set, j) => (
                          <span key={j} className="inline-block mr-3">
                            Set {j + 1}: {set.weight}lbs × {set.reps}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutHistory;