import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle, Info } from 'lucide-react';
import { CheckIcon } from '@heroicons/react/24/solid';

function Exercise({ exercise, data, onChange, onAddSet, onRemoveSet }) {
  const [showNotes, setShowNotes] = useState(false);
  
  useEffect(() => {
    if (!data?.sets) {
      const initialSets = new Array(exercise.defaultSets).fill().map((_, index) => ({
        reps: Array.isArray(exercise.defaultReps) ? exercise.defaultReps[index] : exercise.defaultReps,
        weight: Array.isArray(exercise.defaultWeight) ? exercise.defaultWeight[index] : exercise.defaultWeight,
        rest: '60',
        completed: false
      }));
      onChange(exercise.name, 'sets', initialSets);
    }
  }, [exercise, data, onChange]);

  const sets = data?.sets || [];

  const handleSetChange = (setIndex, field, value) => {
    const newSets = [...sets];
    newSets[setIndex] = {
      ...newSets[setIndex],
      [field]: value
    };

    const currentSet = newSets[setIndex];
    const isCompleted = 
      currentSet.weight && 
      currentSet.weight.toString().trim() !== '' &&
      currentSet.reps && 
      currentSet.reps.toString().trim() !== '';

    newSets[setIndex].completed = isCompleted;
    onChange(exercise.name, 'sets', newSets);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            {exercise.name}
          </h3>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Show notes"
          >
            <Info className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onAddSet(exercise.name)}
            className="p-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            title="Add set"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
          {sets.length > 1 && (
            <button
              onClick={() => onRemoveSet(exercise.name)}
              className="p-2 text-rose-600 hover:text-rose-700 transition-colors"
              title="Remove set"
            >
              <MinusCircle className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {showNotes && exercise.notes && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Notes:</h4>
          <ul className="list-disc list-inside space-y-1">
            {exercise.notes.map((note, index) => (
              <li key={index} className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                {note}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            {exercise.muscles.map((muscle) => (
              <span 
                key={muscle}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-100 rounded-full"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="hidden md:grid md:grid-cols-5 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 px-2">
          <div>Set</div>
          <div>Weight (lbs)</div>
          <div>Reps</div>
          <div>Rest (sec)</div>
          <div>Completed</div>
        </div>

        {sets.map((set, index) => (
          <div 
            key={index}
            className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3 md:mb-0">
              <div className="text-base font-medium text-gray-700 dark:text-gray-300">
                Set {index + 1}
              </div>
              <div className="md:hidden">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  set.completed 
                    ? 'bg-emerald-500' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="md:grid md:grid-cols-5 md:gap-4 md:items-center space-y-3 md:space-y-0">
              <div className="hidden md:block"></div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 md:hidden">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={set.weight || ''}
                  onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
                  className="block w-full px-4 py-2.5 md:py-1.5 text-base md:text-sm border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Weight"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 md:hidden">
                  Reps
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={set.reps || ''}
                  onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
                  className="block w-full px-4 py-2.5 md:py-1.5 text-base md:text-sm border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Reps"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 md:hidden">
                  Rest (sec)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={set.rest || '60'}
                  onChange={(e) => handleSetChange(index, 'rest', e.target.value)}
                  className="block w-full px-4 py-2.5 md:py-1.5 text-base md:text-sm border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Rest"
                />
              </div>

              <div className="hidden md:flex md:justify-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  set.completed 
                    ? 'bg-emerald-500' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exercise;
