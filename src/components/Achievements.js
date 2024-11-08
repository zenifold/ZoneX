import React from 'react';
import { 
  Trophy,
  Dumbbell,
  Flame,
  Target,
  Timer,
  Crown,
  Medal,
  HeartPulse,
  Zap,
  Swords,
  Gem,
  Lock,
  Warehouse
} from 'lucide-react';

function Achievements({ workouts }) {
  const calculateTotalVolume = (workout) => {
    return workout.exercises.reduce((sum, exercise) => {
      if (!exercise.sets) return sum;
      return sum + exercise.sets.reduce((setSum, set) => {
        return setSum + (Number(set.weight) * Number(set.reps) || 0);
      }, 0);
    }, 0);
  };

  const getConsecutiveDays = () => {
    if (!workouts.length) return 0;
    let maxStreak = 1;
    let currentStreak = 1;
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    for (let i = 1; i < sortedWorkouts.length; i++) {
      const prevDate = new Date(sortedWorkouts[i-1].date);
      const currDate = new Date(sortedWorkouts[i].date);
      const diffTime = Math.abs(currDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }
    return maxStreak;
  };

  const achievementCriteria = [
    // Beginner Achievements
    {
      id: 'first-workout',
      name: 'First Step',
      description: 'Complete your first workout',
      icon: Dumbbell,
      tier: 'bronze',
      isEarned: workouts.length > 0
    },
    {
      id: 'volume-warrior',
      name: 'Volume Warrior',
      description: 'Lift 20,000 lbs in a single workout',
      icon: Warehouse,
      tier: 'bronze',
      isEarned: workouts.some(w => calculateTotalVolume(w) >= 20000)
    },
    {
      id: 'consistency',
      name: 'Consistency',
      description: 'Complete 10 workouts',
      icon: Target,
      tier: 'bronze',
      isEarned: workouts.length >= 10
    },

    // Intermediate Achievements
    {
      id: 'dedication',
      name: 'Dedication',
      description: 'Work out 5 days in a row',
      icon: Timer,
      tier: 'silver',
      isEarned: getConsecutiveDays() >= 5
    },
    {
      id: 'heavy-lifter',
      name: 'Heavy Lifter',
      description: 'Lift 40,000 lbs in a single workout',
      icon: Swords,
      tier: 'silver',
      isEarned: workouts.some(w => calculateTotalVolume(w) >= 40000)
    },
    {
      id: 'workout-master',
      name: 'Workout Master',
      description: 'Complete 50 workouts',
      icon: Medal,
      tier: 'silver',
      isEarned: workouts.length >= 50
    },

    // Advanced Achievements
    {
      id: 'elite-volume',
      name: 'Elite Volume',
      description: 'Lift 60,000 lbs in a single workout',
      icon: Crown,
      tier: 'gold',
      isEarned: workouts.some(w => calculateTotalVolume(w) >= 60000)
    },
    {
      id: 'iron-warrior',
      name: 'Iron Warrior',
      description: 'Work out 10 days in a row',
      icon: Flame,
      tier: 'gold',
      isEarned: getConsecutiveDays() >= 10
    },
    {
      id: 'century-club',
      name: 'Century Club',
      description: 'Complete 100 workouts',
      icon: Trophy,
      tier: 'gold',
      isEarned: workouts.length >= 100
    },

    // Expert Achievements
    {
      id: 'legendary-lifter',
      name: 'Legendary Lifter',
      description: 'Lift 100,000 lbs in a single workout',
      icon: Gem,
      tier: 'diamond',
      isEarned: workouts.some(w => calculateTotalVolume(w) >= 100000)
    },
    {
      id: 'ultimate-warrior',
      name: 'Ultimate Warrior',
      description: 'Work out 15 days in a row',
      icon: HeartPulse,
      tier: 'diamond',
      isEarned: getConsecutiveDays() >= 15
    },
    {
      id: 'gym-legend',
      name: 'Gym Legend',
      description: 'Complete 200 workouts',
      icon: Zap,
      tier: 'diamond',
      isEarned: workouts.length >= 200
    }
  ];

  const getTierColor = (tier) => {
    switch (tier) {
      case 'bronze':
        return 'from-amber-600 to-amber-700';
      case 'silver':
        return 'from-slate-400 to-slate-500';
      case 'gold':
        return 'from-yellow-400 to-yellow-500';
      case 'diamond':
        return 'from-blue-400 to-blue-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const tiers = ['bronze', 'silver', 'gold', 'diamond'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Achievements
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track your fitness milestones and unlock achievements
        </p>
      </div>

      {tiers.map(tier => (
        <div key={tier} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize mb-4">
            {tier} Tier
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievementCriteria
              .filter(achievement => achievement.tier === tier)
              .map(achievement => (
                <div
                  key={achievement.id}
                  className={`relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ${
                    achievement.isEarned ? 'bg-opacity-100' : 'bg-opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getTierColor(achievement.tier)}`}>
                      {achievement.isEarned ? (
                        <achievement.icon className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-white opacity-50" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {achievement.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {achievement.description}
                      </p>
                      {achievement.isEarned && (
                        <span className="mt-2 inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                          Achieved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Achievements;