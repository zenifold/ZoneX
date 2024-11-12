import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Shuffle,
  Timer,
  Dumbbell,
  Flame,
  Volume2,
  VolumeX,
  CheckCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Music,
  Music2
} from 'lucide-react';

const exercises = [
  { 
    id: 1,
    name: 'Jumping Jacks',
    duration: 30,
    intensity: 'medium',
    targetMuscles: ['full-body', 'cardio'],
    instructions: [
      'Stand upright with feet together and arms at sides',
      'Jump while raising arms and separating legs to sides',
      'Jump again to return to starting position',
      'Keep a steady rhythm'
    ],
    caloriesPerMinute: 8
  },
  {
    id: 2,
    name: 'Push-ups',
    duration: 30,
    intensity: 'high',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    instructions: [
      'Start in plank position with hands shoulder-width apart',
      'Lower body until chest nearly touches ground',
      'Push back up to starting position',
      'Keep core tight throughout movement'
    ],
    caloriesPerMinute: 7
  },
  {
    id: 3,
    name: 'Mountain Climbers',
    duration: 30,
    intensity: 'high',
    targetMuscles: ['core', 'cardio', 'shoulders'],
    instructions: [
      'Start in plank position',
      'Drive knees alternately to chest',
      'Keep hips level and core engaged',
      'Maintain quick, controlled pace'
    ],
    caloriesPerMinute: 10
  },
  {
    id: 4,
    name: 'Squats',
    duration: 30,
    intensity: 'medium',
    targetMuscles: ['quads', 'glutes', 'core'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower hips back and down',
      'Keep chest up and back straight',
      'Push through heels to stand'
    ],
    caloriesPerMinute: 6
  },
  {
    id: 5,
    name: 'Plank',
    duration: 30,
    intensity: 'medium',
    targetMuscles: ['core', 'shoulders', 'back'],
    instructions: [
      'Forearms on ground, elbows under shoulders',
      'Form straight line from head to heels',
      'Engage core and glutes',
      'Keep position stable'
    ],
    caloriesPerMinute: 4
  },
  {
    id: 6,
    name: 'High Knees',
    duration: 30,
    intensity: 'high',
    targetMuscles: ['cardio', 'core', 'legs'],
    instructions: [
      'Stand in place with feet hip-width apart',
      'Run in place, driving knees high',
      'Pump arms in running motion',
      'Keep landing light and quick'
    ],
    caloriesPerMinute: 9
  },
  {
    id: 7,
    name: 'Burpees',
    duration: 30,
    intensity: 'high',
    targetMuscles: ['full-body', 'cardio'],
    instructions: [
      'Start standing, drop to squat position',
      'Kick feet back to plank',
      'Perform a push-up',
      'Jump feet forward and explosively jump up'
    ],
    caloriesPerMinute: 12
  }
];

function QuickPump() {
  const [duration, setDuration] = useState(180);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workoutExercises, setWorkoutExercises] = useState(exercises);
  const [sound, setSound] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [totalCalories, setTotalCalories] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const audioRef = useRef(null);

  const workoutMusic = {
    title: "Workout Energy Mix",
    artist: "Fitness Beats",
    url: "/audio/workout-music.mp3"
  };

  useEffect(() => {
    audioRef.current = new Audio(workoutMusic.url);
    audioRef.current.volume = musicVolume;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time - 1 <= 0) {
            handleExerciseComplete();
          }
          return time - 1;
        });

        setTotalCalories(prev => 
          prev + (workoutExercises[currentExerciseIndex].caloriesPerMinute / 60)
        );

      }, 1000);

      if (sound && timeRemaining <= 3 && timeRemaining > 0) {
        playCountdownSound();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, currentExerciseIndex, sound]);

  const playCountdownSound = () => {
    const audio = new Audio('/beep.mp3');
    audio.play().catch(e => console.log('Sound play failed:', e));
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.log('Music play failed:', e);
          setMusicPlaying(false);
        });
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  const handleExerciseComplete = () => {
    setCompletedExercises(prev => new Set([...prev, currentExerciseIndex]));
    if (currentExerciseIndex < workoutExercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setTimeRemaining(duration);
    } else {
      handleWorkoutComplete();
    }
  };

  const handleWorkoutComplete = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    if (audioRef.current) {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    if (timeRemaining === 0) {
      setTimeRemaining(duration);
    }
    if (audioRef.current && !musicPlaying) {
      audioRef.current.play().catch(e => {
        console.log('Music play failed:', e);
        setMusicPlaying(false);
      });
      setMusicPlaying(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    if (audioRef.current && musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentExerciseIndex(0);
    setTimeRemaining(duration);
    setCompletedExercises(new Set());
    setTotalCalories(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setMusicPlaying(false);
    }
  };

  const handleSkip = () => {
    handleExerciseComplete();
  };

  const handleShuffle = () => {
    const shuffledExercises = [...workoutExercises];
    for (let i = shuffledExercises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledExercises[i], shuffledExercises[j]] = [shuffledExercises[j], shuffledExercises[i]];
    }
    setWorkoutExercises(shuffledExercises);
    handleReset();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const currentExercise = workoutExercises[currentExerciseIndex];
  const progress = ((duration - timeRemaining) / duration) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
<div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quick Pump Workout
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            High-intensity interval training you can do anywhere
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-current text-gray-200 dark:text-gray-700"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-current text-blue-500"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={553}
                  strokeDashoffset={553 - (553 * progress) / 100}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {formatTime(timeRemaining)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  remaining
                </span>
              </div>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentExercise.name}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`text-sm font-medium ${getIntensityColor(currentExercise.intensity)}`}>
                  {currentExercise.intensity.toUpperCase()} INTENSITY
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  •
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(totalCalories)} cal burned
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleReset}
              className="p-3 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <button
              onClick={isRunning ? handlePause : handleStart}
              className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={handleSkip}
              className="p-3 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SkipForward className="w-6 h-6" />
            </button>
            <button
              onClick={handleShuffle}
              className="p-3 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Shuffle className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSound(!sound)}
              className="p-3 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sound ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Workout Duration
            </label>
            <select
              value={duration}
              onChange={(e) => {
                setDuration(Number(e.target.value));
                setTimeRemaining(Number(e.target.value));
              }}
              className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isRunning}
            >
              <option value={180}>3 minutes</option>
              <option value={300}>5 minutes</option>
              <option value={420}>7 minutes</option>
            </select>
          </div>

          <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleMusic}
                  className={`p-3 rounded-full transition-colors ${
                    musicPlaying 
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                >
                  {musicPlaying ? <Music2 className="w-6 h-6" /> : <Music className="w-6 h-6" />}
                </button>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {workoutMusic.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {workoutMusic.artist}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white">
              Exercise Details
            </h4>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              {showInstructions ? "Hide" : "Show"} Instructions
              {showInstructions ? (
                <ChevronUp className="w-4 h-4 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </button>
          </div>

          {showInstructions && (
            <div className="mb-6 space-y-4">
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Muscles
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentExercise.targetMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instructions
                </h5>
                <ol className="list-decimal list-inside space-y-2">
                  {currentExercise.instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-400">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Workout Sequence
            </h4>
            <div className="space-y-2">
              {workoutExercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className={`flex items-center p-3 rounded-lg ${
                    index === currentExerciseIndex
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'bg-gray-50 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {exercise.name}
                      </span>
                      {completedExercises.has(index) && (
                        <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(exercise.duration)} • {exercise.intensity} intensity
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${getIntensityColor(exercise.intensity)}`}>
                      {exercise.caloriesPerMinute} cal/min
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickPump;