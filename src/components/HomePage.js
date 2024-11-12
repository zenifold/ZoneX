import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Trophy, 
  History, 
  BarChart2,
  Flame,
  Clock,
  Calendar,
  TrendingUp,
  BookOpenText,
  Settings as Cog  // Added Cog icon
} from 'lucide-react';

function HomePage({ workouts = [] }) {
  // Calculate stats from workout history
  const totalWorkouts = workouts.length;
  const thisWeekWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return workoutDate >= weekAgo;
  }).length;

  const latestStreak = workouts.reduce((streak, workout, index) => {
    if (index === 0) return 1;
    const currentDate = new Date(workout.date);
    const prevDate = new Date(workouts[index - 1].date);
    const dayDiff = (currentDate - prevDate) / (1000 * 60 * 60 * 24);
    return dayDiff <= 1 ? streak + 1 : 1;
  }, 0);

  const totalMinutes = workouts.reduce((total, workout) => {
    return total + workout.exercises.reduce((exerciseTotal, exercise) => {
      return exerciseTotal + (exercise.duration || 0);
    }, 0);
  }, 0);

  const stats = [
    { 
      title: 'Total Workouts',
      value: totalWorkouts,
      icon: Flame,
      color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400'
    },
    {
      title: 'This Week',
      value: thisWeekWorkouts,
      icon: Calendar,
      color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-500 dark:text-sky-400'
    },
    {
      title: 'Current Streak',
      value: `${latestStreak} days`,
      icon: TrendingUp,
      color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400'
    },
    {
      title: 'Total Minutes',
      value: totalMinutes,
      icon: Clock,
      color: 'bg-violet-100 dark:bg-violet-900/30 text-violet-500 dark:text-violet-400'
    }
  ];

  const quickActions = [
    { 
      title: 'Start Workout',
      description: 'Begin your fitness journey',
      icon: Dumbbell,
      to: '/select-location',
      color: 'bg-gradient-to-r from-purple-200/80 to-pink-200/80 hover:from-purple-300/80 hover:to-pink-300/80 dark:from-purple-500/30 dark:to-pink-500/30 dark:hover:from-purple-500/40 dark:hover:to-pink-500/40 text-gray-800 dark:text-white'
    },
    {
      title: 'Exercise Library',
      description: 'Browse available exercises',
      icon: BookOpenText,
      to: '/exercise-library',
      color: 'bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 dark:hover:bg-teal-900/50 text-teal-600 dark:text-teal-400'
    },
    {
      title: 'View Progress',
      description: 'Track your metrics',
      icon: BarChart2,
      to: '/progress',
      color: 'bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Workout History',
      description: 'Review past workouts',
      icon: History,
      to: '/history',
      color: 'bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Achievements',
      description: 'Check your milestones',
      icon: Trophy,
      to: '/achievements',
      color: 'bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-600 dark:text-amber-400'
    },
    {
      title: 'Settings',
      description: 'Customize your experience',
      icon: Cog,
      to: '/settings',
      color: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className={`group flex items-start p-6 rounded-xl transition-all border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm ${action.color}`}
          >
            <div className="flex-shrink-0">
              <action.icon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                {action.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
