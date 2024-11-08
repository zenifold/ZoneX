import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Exercise from './Exercise';
import ExerciseLibrary from './ExerciseLibrary';
import { saveWorkout } from '../utils/db';
import { ArrowLeft, Play, Clock, Dumbbell, Calendar, Plus } from 'lucide-react';

function WorkoutDetail({ workoutPrograms, onFinish }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workoutPrograms[id];
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  
  const [exerciseData, setExerciseData] = useState(
    workout ? workout.exercises.reduce((data, exercise) => {
      data[exercise.name] = {
        sets: new Array(4).fill({ weight: '', reps: '', rest: '', completed: false })
      };
      return data;
    }, {}) : {}
  );

  const [exercises, setExercises] = useState(workout ? workout.exercises : []);

  if (!workout) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Workout not found</h2>
          <button
            onClick={() => navigate('/select-location')}
            className="text-blue-500 dark:text-blue-400 hover:underline inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to workout selection
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (exerciseName, field, value) => {
    setExerciseData({
      ...exerciseData,
      [exerciseName]: {
        ...exerciseData[exerciseName],
        [field]: value
      }
    });
  };

  const handleAddSet = (exerciseName) => {
    const newSets = [...exerciseData[exerciseName].sets, { weight: '', reps: '', rest: '', completed: false }];
    handleChange(exerciseName, 'sets', newSets);
  };

  const handleRemoveSet = (exerciseName) => {
    const newSets = exerciseData[exerciseName].sets.slice(0, -1);
    handleChange(exerciseName, 'sets', newSets);
  };

  const handleFinishWorkout = () => {
    const finishedWorkout = {
      id: workout.id,
      name: workout.name,
      date: new Date().toISOString(),
      exercises: exercises.map(exercise => ({
        name: exercise.name,
        sets: exerciseData[exercise.name].sets
      }))
    };

    saveWorkout(finishedWorkout).then(() => {
      onFinish(finishedWorkout);
      navigate('/history');
    });
  };

  const handleAddExercise = (exercise) => {
    setExercises([...exercises, exercise]);
    setExerciseData({
      ...exerciseData,
      [exercise.name]: {
        sets: new Array(4).fill({ weight: '', reps: '', rest: '', completed: false })
      }
    });
    setShowExerciseLibrary(false);
  };

  const isWorkoutComplete = () => {
    return Object.values(exerciseData).every(exercise => 
      exercise.sets.some(set => set.completed)
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Workout Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {workout.name}
            </h2>
            <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">45-60 min</span>
              </div>
              <div className="flex items-center">
                <Dumbbell className="w-4 h-4 mr-1" />
                <span className="text-sm">{exercises.length} exercises</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-6">
        {exercises.map((exercise) => (
          <Exercise
            key={exercise.name}
            exercise={exercise}
            data={exerciseData[exercise.name]}
            onChange={handleChange}
            onAddSet={handleAddSet}
            onRemoveSet={handleRemoveSet}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col md:flex-row justify-end items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-3">
        <button
          onClick={() => setShowExerciseLibrary(true)}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium text-sm
            bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
            transform transition-all duration-200 ease-in-out hover:scale-105 shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Exercise
        </button>
        <button
          onClick={handleFinishWorkout}
          disabled={!isWorkoutComplete()}
          className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium text-sm
            transform transition-all duration-200 ease-in-out hover:scale-105 shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 w-full md:w-auto
            ${isWorkoutComplete()
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
              : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          <Play className="w-4 h-4 mr-1.5" />
          Complete Workout
        </button>
      </div>

      {/* Exercise Library Modal */}
      {showExerciseLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add Exercise from Library
              </h2>
              <button
                onClick={() => setShowExerciseLibrary(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            <ExerciseLibrary 
              onSelectExercise={handleAddExercise}
              isSelectionMode={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutDetail;
