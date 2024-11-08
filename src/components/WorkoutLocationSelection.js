import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Home, Globe } from 'lucide-react';

function WorkoutLocationSelection() {
  const locations = [
    { 
      id: 'gym', 
      name: 'At the Gym',
      description: 'Access to full equipment for strength and cardio training',
      icon: Building2,
      color: 'bg-sky-50 hover:bg-sky-100 border-sky-200',
      iconColor: 'text-sky-600'
    },
    { 
      id: 'home', 
      name: 'At Home',
      description: 'Workouts optimized for minimal or no equipment',
      icon: Home,
      color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    { 
      id: 'anywhere', 
      name: 'On the Go',
      description: 'Quick workouts you can do anywhere, anytime',
      icon: Globe,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      iconColor: 'text-purple-600',
      route: '/quick-pump' // Special route for "anywhere" option
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Choose Your Workout Location
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Select where you'll be working out to get a customized program
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map(location => {
          const Icon = location.icon;
          return (
            <Link
              key={location.id}
              to={location.route || `/workouts/${location.id}`}
              className={`relative group rounded-xl p-6 border-2 transition-all duration-300 ${location.color}
                transform hover:scale-102 hover:shadow-lg`}
            >
              <div className="flex flex-col h-full">
                <div className={`w-12 h-12 rounded-lg ${location.color} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${location.iconColor}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {location.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {location.description}
                </p>

                <div className={`flex items-center text-sm font-medium ${location.iconColor}`}>
                  Select location
                  <svg 
                    className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent rounded-xl transition-colors duration-300 group-hover:border-current group-hover:border-opacity-10" />
            </Link>
          );
        })}
      </div>

      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center mt-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <svg 
          className="w-4 h-4 mr-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
        Back to home
      </Link>
    </div>
  );
}

export default WorkoutLocationSelection;