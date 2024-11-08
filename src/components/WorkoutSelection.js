import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { 
  Dumbbell, 
  Timer, 
  Zap,
  ArrowLeft,
  ChevronRight,
  Clock,
  Flame,
  Activity
} from 'lucide-react';

function WorkoutSelection() {
  const { location } = useParams();
  
  const workoutDetails = {
    arms: {
      id: 'arms',
      name: 'Arms & Upper Body',
      icon: Dumbbell,
      color: 'bg-rose-50 hover:bg-rose-100 border-rose-200',
      iconColor: 'text-rose-600',
      duration: '45-60 min',
      difficulty: 'Intermediate',
      calories: '300-400',
      description: 'Complete upper body workout focusing on arms and auxiliary muscle groups'
    },
    abs: {
      id: 'abs',
      name: 'Core & Abs',
      icon: Activity,
      color: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
      iconColor: 'text-amber-600',
      duration: '30-40 min',
      difficulty: 'Intermediate',
      calories: '200-300',
      description: 'Core-focused workout to build strength and definition'
    },
    legs: {
      id: 'legs',
      name: 'Legs & Lower Body',
      icon: Timer,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600',
      duration: '50-60 min',
      difficulty: 'Advanced',
      calories: '400-500',
      description: 'Lower body strength training for building muscle and power'
    },
    hiit: {
      id: 'hiit',
      name: 'HIIT Workout',
      icon: Zap,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      iconColor: 'text-purple-600',
      duration: '20-30 min',
      difficulty: 'Advanced',
      calories: '250-350',
      description: 'High-intensity intervals to boost metabolism and improve cardiovascular fitness'
    },
    cardio: {
      id: 'cardio',
      name: 'Cardio Blast',
      icon: Flame,
      color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      iconColor: 'text-emerald-600',
      duration: '30-45 min',
      difficulty: 'Beginner',
      calories: '200-300',
      description: 'Endurance-focused workout to improve stamina and heart health'
    }
  };

  const workoutsByLocation = {
    gym: ['arms', 'abs', 'legs'],
    home: ['hiit', 'cardio'],
    anywhere: ['hiit', 'cardio']
  };

  // If location is not valid, redirect to location selection
  if (!location || !workoutsByLocation[location]) {
    return <Navigate to="/select-location" replace />;
  }

  const availableWorkouts = workoutsByLocation[location];
  const locationDisplayName = location.charAt(0).toUpperCase() + location.slice(1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {locationDisplayName} Workouts
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Choose a workout program tailored for {locationDisplayName.toLowerCase()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableWorkouts.map(workoutId => {
          const details = workoutDetails[workoutId];
          const Icon = details.icon;
          
          return (
            <Link 
              key={workoutId}
              to={`/workout/${workoutId}`}
              className={`relative group rounded-xl p-6 border-2 transition-all duration-300 ${details.color}
                transform hover:scale-102 hover:shadow-lg`}
            >
              <div className="flex flex-col h-full">
                <div className={`w-12 h-12 rounded-lg ${details.color} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${details.iconColor}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {details.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {details.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{details.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{details.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{details.calories}</span>
                  </div>
                </div>

                <div className={`flex items-center text-sm font-medium ${details.iconColor}`}>
                  Start workout
                  <ChevronRight className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent rounded-xl transition-colors duration-300 group-hover:border-current group-hover:border-opacity-10" />
            </Link>
          );
        })}
      </div>

      <Link
        to="/select-location"
        className="inline-flex items-center mt-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Choose different location
      </Link>
    </div>
  );
}

export default WorkoutSelection;
