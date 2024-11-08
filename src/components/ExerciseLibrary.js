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
  Save
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

function ExerciseLibrary() {
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

  const ExerciseForm = ({ exercise, onSubmit, isEditing }) => (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        // Handle form submission
        // Collect all form data and call onSubmit
      }}
      className="space-y-6"
    >
      {/* Form fields would go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue={exercise?.name || ''}
          />
        </div>
        {/* Add more form fields */}
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => {
            setShowAddForm(false);
            setEditMode(false);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {isEditing ? 'Update' : 'Add'} Exercise
        </button>
      </div>
    </form>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
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
            {/* Add more filter selects */}
          </div>
        )}
      </div>

      {/* Exercise List and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Exercise List */}
        <div className="lg:col-span-1 space-y-4">
          {filteredExercises.map(exercise => (
            <div
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className={`p-4 bg-white dark:bg-gray-800 rounded-lg border cursor-pointer transition-colors ${
                selectedExercise?.id === exercise.id
                  ? 'border-blue-500'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {exercise.name}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {exercise.primaryMuscles.map(muscle => (
                      <span
                        key={muscle}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {exercise.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Exercise Detail */}
        {selectedExercise && (
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedExercise.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {selectedExercise.category.charAt(0).toUpperCase() + selectedExercise.category.slice(1)} Exercise
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditMode(true);
                    setEditingExercise(selectedExercise);
                  }}
                  className="p-2 text-gray-500 hover:text-blue-500"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteExercise(selectedExercise.id)}
                  className="p-2 text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Equipment Needed
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedExercise.equipment.map(item => (
                      <span
                        key={item}
                        className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Primary Muscles
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                  {selectedExercise.primaryMuscles.map(muscle => (
                      <span
                        key={muscle}
                        className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Secondary Muscles
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedExercise.secondaryMuscles.map(muscle => (
                      <span
                        key={muscle}
                        className="inline-flex items-center px-2 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Rest Period
                    </h3>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {selectedExercise.restPeriod} seconds
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      Difficulty
                    </h3>
                    <p className="mt-1 text-gray-900 dark:text-white capitalize">
                      {selectedExercise.difficulty}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Sets
                    </h3>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {selectedExercise.recommendedSets}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <BarChart className="w-4 h-4" />
                      Reps
                    </h3>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {selectedExercise.recommendedReps}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Personal Best
                  </h3>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedExercise.personalBest || 'Not set'} lbs
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Preparation
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedExercise.preparation.map((step, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Execution
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedExercise.execution.map((step, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Tips
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedExercise.tips.map((tip, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Common Mistakes
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-red-600 dark:text-red-400">
                  {selectedExercise.commonMistakes.map((mistake, index) => (
                    <li key={index}>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {(showAddForm || editMode) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {editMode ? 'Edit Exercise' : 'Add New Exercise'}
              </h2>
              <ExerciseForm
                exercise={editingExercise}
                onSubmit={editMode ? handleUpdateExercise : handleAddExercise}
                isEditing={editMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseLibrary;