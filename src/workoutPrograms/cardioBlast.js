const cardioBlastProgram = {
  id: 'cardioBlast',
  name: 'Cardio Blast Endurance',
  type: 'cardio',
  location: 'gym or outdoor',
  targetMuscles: ['cardiovascular system', 'legs', 'core', 'full body'],
  duration: '45-60 min',
  difficulty: 'Intermediate to Advanced',
  calories: '450-600',
  description: 'Comprehensive cardio workout designed to improve endurance, burn calories, and enhance overall cardiovascular fitness',
  exercises: [
    {
      name: 'Running Intervals',
      defaultSets: 6,
      defaultReps: '400m sprint / 200m recovery',
      defaultWeight: 0,
      notes: [
        'Alternate between high-intensity sprints',
        'Full recovery between intervals',
        'Maintain proper running form',
        'Adjust speed to fitness level'
      ],
      muscles: ['legs', 'cardiovascular system']
    },
    {
      name: 'Rowing Machine',
      defaultSets: 5,
      defaultReps: '500m',
      defaultWeight: 0,
      notes: [
        'Full body engagement',
        'Maintain consistent stroke rate',
        'Drive with legs first',
        'Keep back straight'
      ],
      muscles: ['legs', 'back', 'arms', 'core']
    },
    {
      name: 'Stair Climber',
      defaultSets: 4,
      defaultReps: '5 min',
      defaultWeight: 0,
      notes: [
        'Maintain steady pace',
        'Use handrails for balance only',
        'Keep upright posture',
        'Vary speed and resistance'
      ],
      muscles: ['quadriceps', 'glutes', 'calves']
    },
    {
      name: 'Jump Rope',
      defaultSets: 5,
      defaultReps: '2 min',
      defaultWeight: 0,
      notes: [
        'Maintain consistent rhythm',
        'Light on feet',
        'Use speed rope',
        'Vary jump styles (single leg, high knees)'
      ],
      muscles: ['calves', 'shoulders', 'cardiovascular system']
    },
    {
      name: 'Cycling Intervals',
      defaultSets: 4,
      defaultReps: '10 min (alternating resistance)',
      defaultWeight: 0,
      notes: [
        'Alternate between high and low resistance',
        'Maintain proper seat height',
        'Keep upper body relaxed',
        'Engage core'
      ],
      muscles: ['quadriceps', 'hamstrings', 'calves']
    },
    {
      name: 'Swimming Laps',
      defaultSets: 3,
      defaultReps: '400m',
      defaultWeight: 0,
      notes: [
        'Alternate swimming styles',
        'Maintain proper breathing technique',
        'Focus on form',
        'Use different strokes for variety'
      ],
      muscles: ['full body', 'cardiovascular system']
    },
    {
      name: 'Elliptical Cross-Training',
      defaultSets: 4,
      defaultReps: '15 min',
      defaultWeight: 0,
      notes: [
        'Vary resistance and incline',
        'Use forward and backward motions',
        'Engage arms',
        'Maintain steady pace'
      ],
      muscles: ['legs', 'arms', 'core']
    },
    {
      name: 'Box Step-Ups',
      defaultSets: 3,
      defaultReps: '20 per leg',
      defaultWeight: 10,
      notes: [
        'Use stable box or platform',
        'Alternate legs',
        'Drive through heel',
        'Maintain upright posture'
      ],
      muscles: ['quadriceps', 'glutes', 'calves']
    },
    {
      name: 'Battle Rope Cardio',
      defaultSets: 4,
      defaultReps: '45 sec',
      defaultWeight: 0,
      notes: [
        'Alternate wave patterns',
        'Maintain low squat',
        'Full arm extension',
        'Vary wave styles'
      ],
      muscles: ['arms', 'shoulders', 'core']
    },
    {
      name: 'Burpee Variations',
      defaultSets: 3,
      defaultReps: '15',
      defaultWeight: 0,
      notes: [
        'Full body movement',
        'Explosive jump',
        'Modify for fitness level',
        'Maintain high intensity'
      ],
      muscles: ['full body', 'cardiovascular system']
    }
  ]
};

