import React, { useState, useMemo } from 'react';
import { 
  Search,
  Filter,
  Plus,
  Dumbbell,
  ChevronDown,
  Info,
  Tag,
  Clock,
  Flame,
  Target,
  BarChart,
  Edit,
  Trash2,
  Save,
  ArrowLeft
} from 'lucide-react';

const defaultExercises = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'compound',
    equipment: ['barbell', 'bench'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    difficulty: 'intermediate',
    mechanics: 'push',
    force: 'push',
    preparation: [
      'Lie flat on bench with feet on ground',
      'Grip bar slightly wider than shoulder width',
      'Unrack bar with straight arms'
    ],
    execution: [
      'Lower bar to mid-chest',
      'Press bar up in slight arc',
      'Lock out elbows at top'
    ],
    tips: [
      'Keep feet flat on ground',
      'Maintain natural arch in lower back',
      'Keep elbows at roughly 45-degree angle'
    ],
    commonMistakes: [
      'Bouncing bar off chest',
      'Flaring elbows too wide',
      'Lifting hips off bench'
    ],
    recommendedSets: '3-5',
    recommendedReps: '5-12',
    restPeriod: '60-180',
    tempo: '2-1-2',
    personalBest: 0
  },
  {
    id: 'squat',
    name: 'Barbell Squat',
    category: 'compound',
    equipment: ['barbell', 'rack'],
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves', 'core'],
    difficulty: 'advanced',
    mechanics: 'push',
    force: 'push',
    preparation: [
      'Position bar on upper back',
      'Feet shoulder-width apart',
      'Brace core and unrack'
    ],
    execution: [
      'Break at hips and knees',
      'Lower until thighs parallel',
      'Drive through heels to stand'
    ],
    tips: [
      'Keep chest up',
      'Track knees over toes',
      'Maintain neutral spine'
    ],
    commonMistakes: [
      'Knees caving in',
      'Rounding lower back',
      'Rising on toes'
    ],
    recommendedSets: '3-5',
    recommendedReps: '5-10',
    restPeriod: '120-180',
    tempo: '2-1-2',
    personalBest: 0
  }
];

const muscleGroups = {
  primaryMuscles: [
    'chest', 'back', 'shoulders', 'biceps', 'triceps', 
    'quadriceps', 'hamstrings', 'glutes', 'calves', 'core'
  ],
  secondaryMuscles: [
    'chest', 'back', 'shoulders', 'biceps', 'triceps', 
    'quadriceps', 'hamstrings', 'glutes', 'calves', 'core'
  ]
};

const equipment = [
  'barbell', 'dumbbell', 'kettlebell', 'machine', 
  'cable', 'bodyweight', 'bands', 'bench', 'rack'
];

const categories = ['compound', 'isolation'];
const difficulties = ['beginner', 'intermediate', 'advanced'];
const mechanics = ['push', 'pull', 'legs', 'core'];

function ExerciseLibrary({ onSelectExercise, isSelectionMode }) {
  const [exercises, setExercises] = useState(defaultExercises);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    equipment: '',
    primaryMuscles: '',
    difficulty: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !filters.category || exercise.category === filters.category;
      const matchesEquipment = !filters.equipment || exercise.equipment.includes(filters.equipment);
      const matchesMuscle = !filters.primaryMuscles || exercise.primaryMuscles.includes(filters.primaryMuscles);
      const matchesDifficulty = !filters.difficulty || exercise.difficulty === filters.difficulty;
      
      return matchesSearch && matchesCategory && matchesEquipment && matchesMuscle && matchesDifficulty;
    });
  }, [exercises, searchQuery, filters]);

  const handleAddExercise = (newExercise) => {
    setExercises([...exercises, { ...newExercise, id: Date.now().toString() }]);
    setShowAddForm(false);
  };

  const handleUpdateExercise = (updatedExercise) => {
    setExercises(exercises.map(ex => 
      ex.id === updatedExercise.id ? updatedExercise : ex
    ));
    setEditMode(false);
    setEditingExercise(null);
  };

  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
    setSelectedExercise(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      {!isSelectionMode && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Exercise Library
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Browse, search, and manage your exercise collection
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Exercise
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Equipment
              </label>
              <select
                value={filters.equipment}
                onChange={(e) => setFilters({ ...filters, equipment: e.target.value })}
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700"
              >
                <option value="">All Equipment</option>
                {equipment.map(eq => (
                  <option key={eq} value={eq}>{eq.charAt(0).toUpperCase() + eq.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Muscle
              </label>
              <select
                value={filters.primaryMuscles}
                onChange={(e) => setFilters({ ...filters, primaryMuscles: e.target.value })}
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700"
              >
                <option value="">All Muscles</option>
                {muscleGroups.primaryMuscles.map(muscle => (
                  <option key={muscle} value={muscle}>{muscle.charAt(0).toUpperCase() + muscle.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700"
              >
                <option value="">All Difficulties</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map(exercise => (
          <div
            key={exercise.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {exercise.name}
              </h3>
              {isSelectionMode ? (
                <button
                  onClick={() => onSelectExercise(exercise)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditMode(true);
                      setEditingExercise(exercise);
                    }}
                    className="p-1 text-gray-500 hover:text-blue-500"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteExercise(exercise.id)}
                    className="p-1 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {exercise.primaryMuscles.map(muscle => (
                  <span
                    key={muscle}
                    className="px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Dumbbell className="w-4 h-4" />
                {exercise.equipment.join(', ')}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Target className="w-4 h-4" />
                {exercise.recommendedSets} sets × {exercise.recommendedReps} reps
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseLibrary;
