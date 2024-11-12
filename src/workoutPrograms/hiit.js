const hiitProgram = {
  id: 'hiit',
  name: 'High-Intensity Interval Training',
  type: 'cardio',
  location: 'gym or home',
  targetMuscles: ['full body', 'cardiovascular system', 'core', 'legs', 'upper body'],
  duration: '30-45 min',
  difficulty: 'Advanced',
  calories: '500-700',
  description: 'Intense full-body workout combining cardio and strength exercises with short, high-intensity intervals. Always begin with a 5-10 minute dynamic warm-up and conclude with a 5-minute cool-down to prevent injury and support recovery.',
  exercises: [
    {
      name: 'Burpees',
      defaultSets: 5,
      defaultReps: '30 sec',
      defaultWeight: 0,
      notes: [
        'Full body explosive movement',
        'Drop to ground completely',
        'Explosive jump at end',
        'Maintain high intensity'
      ],
      muscles: ['full body', 'cardiovascular system']
    },
    {
      name: 'Mountain Climbers',
      defaultSets: 5,
      defaultReps: '45 sec',
      defaultWeight: 0,
      notes: [
        'Keep core tight',
        'Quick, alternating leg movements',
        'Maintain plank position',
        'High speed, high intensity'
      ],
      muscles: ['core', 'shoulders', 'legs']
    },
    {
      name: 'Jump Squats',
      defaultSets: 5,
      defaultReps: '30 sec',
      defaultWeight: 0,
      notes: [
        'Deep squat position',
        'Explosive jump',
        'Land softly',
        'Immediate next rep'
      ],
      muscles: ['quadriceps', 'glutes', 'calves']
    },
    {
      name: 'Kettlebell Swings',
      defaultSets: 5,
      defaultReps: '30 sec',
      defaultWeight: 24,
      notes: [
        'Hinge at hips',
        'Explosive hip thrust',
        'Swing to chest height',
        'Maintain back straight'
      ],
      muscles: ['posterior chain', 'shoulders', 'core']
    },
    {
      name: 'Box Jumps',
      defaultSets: 4,
      defaultReps: '20 sec',
      defaultWeight: 0,
      notes: [
        'Use appropriate box height',
        'Explosive jump',
        'Land softly with bent knees',
        'Quick ground contact'
      ],
      muscles: ['legs', 'cardiovascular system']
    },
    {
      name: 'Dumbbell Thrusters',
      defaultSets: 4,
      defaultReps: '30 sec',
      defaultWeight: 20,
      notes: [
        'Squat with dumbbells at shoulders',
        'Explosive press overhead',
        'Continuous movement',
        'Full body engagement'
      ],
      muscles: ['shoulders', 'legs', 'core']
    },
    {
      name: 'Battle Rope Waves',
      defaultSets: 4,
      defaultReps: '30 sec',
      defaultWeight: 0,
      notes: [
        'Alternate arm waves',
        'Maintain low squat',
        'Full arm extension',
        'Consistent intensity'
      ],
      muscles: ['arms', 'shoulders', 'core']
    },
    {
      name: 'Plyo Push-ups',
      defaultSets: 4,
      defaultReps: '20 sec',
      defaultWeight: 0,
      notes: [
        'Explosive push-up',
        'Hands leave ground',
        'Land softly',
        'Maintain core tension'
      ],
      muscles: ['chest', 'triceps', 'core']
    },
    {
      name: 'Jumping Lunges',
      defaultSets: 4,
      defaultReps: '30 sec',
      defaultWeight: 0,
      notes: [
        'Alternate legs',
        'Deep lunge position',
        'Explosive jump between lunges',
        'Maintain balance'
      ],
      muscles: ['legs', 'glutes', 'cardiovascular system']
    },
    {
      name: 'Renegade Rows',
      defaultSets: 4,
      defaultReps: '20 sec',
      defaultWeight: 20,
      notes: [
        'Plank position with dumbbells',
        'Alternate row movements',
        'Keep hips stable',
        'Engage core throughout'
      ],
      muscles: ['back', 'core', 'shoulders']
    }
  ]
};

export default hiitProgram;
