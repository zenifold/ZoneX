import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Exercise from './Exercise';
import { saveWorkout } from '../utils/db';
import { ArrowLeft, Play, Clock, Dumbbell, Calendar } from 'lucide-react';

function WorkoutDetail({ workoutPrograms, onFinish }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workoutPrograms[id];
  
  const [exerciseData, setExerciseData] = useState(
    workout ? workout.exercises.reduce((data, exercise) => {
      data[exercise.name] = {
        sets: new Array(4).fill({ weight: '', reps: '', rest: '', completed: false })
      };
      return data;
    }, {}) : {}
  );

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
      exercises: workout.exercises.map(exercise => ({
        name: exercise.name,
        sets: exerciseData[exercise.name].sets
      }))
    };

    saveWorkout(finishedWorkout).then(() => {
      onFinish(finishedWorkout);
      navigate('/history');
    });
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
                <span className="text-sm">{workout.exercises.length} exercises</span>
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
        {workout.exercises.map((exercise) => (
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

      {/* Complete Workout Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleFinishWorkout}
          disabled={!isWorkoutComplete()}
          className={`inline-flex items-center px-6 py-3 rounded-lg text-white font-semibold
            ${isWorkoutComplete()
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-gray-300 cursor-not-allowed'
            } transition-colors`}
        >
          <Play className="w-5 h-5 mr-2" />
          Complete Workout
        </button>
      </div>
    </div>
  );
}

export default WorkoutDetail;
